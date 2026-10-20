import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import AccountPreview from "@/components/layout/AccountPreview";
import {Page} from "@/models/Page";
import mongoose from "mongoose";
import {getServerSession} from "next-auth";
import {redirect} from "next/navigation";
import cloneDeep from 'clone-deep';
export const metadata = {
  title: 'LinkTri Clone | Account',
  description: 'Share your links, social profiles, contact info and more on one page',
}
export default async function AccountPage({searchParams}) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;
  if (!session) {
    return redirect('/');
  }
  await mongoose.connect(process.env.MONGO_URI);
  const page = await Page.findOne({owner: session?.user?.email});

  // Check if the page exists before trying to clone it
  if (page) {
    const leanPage = cloneDeep(page.toJSON());
    leanPage._id = leanPage._id.toString();

    return (
      <div className="mx-auto max-w-[1500px] px-5 py-8 sm:px-8 lg:px-10">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
            Ruang kreator
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
            Dashboard
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola profil, tautan, dan informasi yang tampil di halaman publikmu.
          </p>
        </header>

        <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_470px]">
          <div className="min-w-0">
            <div id="appearance">
              <PageSettingsForm page={leanPage} user={session.user} />
            </div>
            <div id="contacts">
              <PageButtonsForm page={leanPage} user={session.user} />
            </div>
            <div id="links">
              <PageLinksForm page={leanPage} user={session.user} />
            </div>
          </div>
          <aside className="xl:sticky xl:top-8">
            <AccountPreview page={leanPage} user={session.user} />
          </aside>
        </div>
      </div>
    );
  }

  // Return the UsernameForm if no page is found
  return (
    <div className="mx-auto max-w-4xl px-5 py-8 sm:px-8">
      <header className="mb-8">
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">
          Ruang kreator
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
          Buat halamanmu
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          Pilih username untuk mulai membagikan semua tautanmu dari satu halaman.
        </p>
      </header>
      <UsernameForm desiredUsername={desiredUsername} />
    </div>
  );
}
