import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Chart from "@/components/Chart";
import SectionBox from "@/components/layout/SectionBox";
import { Event } from "@/models/Event";
import { Page } from "@/models/Page";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isToday } from "date-fns";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "LinkTri Clone | Analytics",
  description:
    "Share your links, social profiles, contact info and more on one page",
};
export default async function AnalyticsPage() {
  mongoose.connect(process.env.MONGO_URI);
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }
  const page = await Page.findOne({ owner: session.user.email });
  if (!page) {
    // Handle the case where the page is not found. This could be a redirect or a simple message.
    // For example, redirecting back to the homepage or to a dashboard:
    return redirect("/account");
    // Or, if you're rendering on the server and sending back HTML:
    // return {props: {error: "Page not found"}};
  }
  const groupedViews = await Event.aggregate([
    {
      $match: {
        type: "view",
        uri: page.uri,
      },
    },
    {
      $group: {
        _id: {
          $dateToString: {
            date: "$createdAt",
            format: "%Y-%m-%d",
          },
        },
        count: {
          $count: {},
        },
      },
    },
    {
      $sort: { _id: 1 },
    },
  ]);

  const clicks = await Event.find({
    type: "click",
    page: page.uri,
  });

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
          Ruang kreator
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Analitik
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Pantau kunjungan halaman dan performa setiap tautanmu.
        </p>
      </header>
      <SectionBox>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Kunjungan halaman</h2>
          <p className="mt-1 text-sm text-slate-500">Jumlah kunjungan dari waktu ke waktu</p>
        </div>
        <Chart
          data={groupedViews.map((o) => ({
            date: o._id,
            views: o.count,
          }))}
        />
      </SectionBox>
      <SectionBox>
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Klik tautan</h2>
          <p className="mt-1 text-sm text-slate-500">Lihat performa tautan hari ini dan keseluruhan</p>
        </div>
        {page.links.length > 0 ? page.links.map((link) => (
          <div
            key={link.key || link.url || link.title}
            className="grid gap-4 border-t border-slate-100 py-5 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:items-center"
          >
            <div className="flex min-w-0 items-start gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <FontAwesomeIcon icon={faLink} className="h-4 w-4" />
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-slate-800">
                  {link.title || "Tautan tanpa judul"}
                </h3>
                <p className="mt-0.5 truncate text-sm text-slate-500">
                  {link.subtitle || "Tidak ada deskripsi"}
                </p>
                <a
                  className="mt-1 block truncate text-xs text-emerald-700 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                  href={link.url}
                >
                  {link.url}
                </a>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 sm:min-w-28 sm:flex-col sm:justify-center">
                <div className="text-xl font-semibold text-slate-900">
                  {
                    clicks.filter(
                      (c) => c.uri === link.url && isToday(c.createdAt)
                    ).length
                  }
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Klik hari ini
                </div>
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 sm:min-w-28 sm:flex-col sm:justify-center">
                <div className="text-xl font-semibold text-slate-900">
                  {clicks.filter((c) => c.uri === link.url).length}
                </div>
                <div className="text-xs font-medium text-slate-500">
                  Total klik
                </div>
            </div>
          </div>
        )) : (
          <div className="rounded-xl border border-dashed border-slate-200 px-5 py-10 text-center">
            <p className="text-sm font-medium text-slate-700">Belum ada tautan</p>
            <p className="mt-1 text-sm text-slate-500">
              Tautan yang kamu tambahkan akan muncul di sini.
            </p>
          </div>
        )}
      </SectionBox>
    </div>
  );
}
