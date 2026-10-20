import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AppearanceEditor from "@/components/layout/AppearanceEditor";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "LinkTri | Tampilan",
  description: "Atur latar belakang dan tampilan halaman publikmu.",
};

export default async function AppearancePage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/");
  }

  await mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({ owner: session.user.email });
  if (!page) {
    return redirect("/account");
  }

  return (
    <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
          Ruang kreator
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Tampilan
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Sesuaikan latar belakang halaman publik dan lihat hasilnya secara langsung.
        </p>
      </header>
      <AppearanceEditor
        page={{
          uri: page.uri,
          bgType: page.bgType,
          bgColor: page.bgColor,
          bgImage: page.bgImage,
          displayName: page.displayName,
          location: page.location,
          bio: page.bio,
          links: (page.links || []).map((link) => ({
            key: link.key,
            title: link.title,
            subtitle: link.subtitle,
            url: link.url,
          })),
          buttons: page.buttons || {},
        }}
        user={{
          name: session.user.name,
          image: session.user.image,
        }}
      />
    </div>
  );
}
