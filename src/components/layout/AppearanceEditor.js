"use client";

import { savePageSettings } from "@/actions/pageActions";
import { upload } from "@/libs/upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCloudArrowUp, faExternalLinkAlt, faPalette } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";

const backgroundPresets = [
  { name: "Sage", color: "#b9d8c8" },
  { name: "Mint", color: "#d8eee2" },
  { name: "Sky", color: "#c8ddf4" },
  { name: "Lavender", color: "#ddd3f5" },
  { name: "Peach", color: "#f5d5c7" },
  { name: "Rose", color: "#f1ccd4" },
  { name: "Sand", color: "#eadfc7" },
  { name: "Night", color: "#243044" },
];

function SaveAppearanceButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
    >
      {pending ? "Menyimpan..." : "Simpan perubahan"}
    </button>
  );
}

export default function AppearanceEditor({ page, user }) {
  const [bgType, setBgType] = useState(page.bgType || "color");
  const [bgColor, setBgColor] = useState(page.bgColor || "#d8eee2");
  const [bgImage, setBgImage] = useState(page.bgImage || "");

  async function saveAppearance(formData) {
    const saved = await savePageSettings(formData);
    if (saved) {
      toast.success("Tampilan berhasil disimpan");
    } else {
      toast.error("Sesi berakhir. Silakan masuk kembali.");
    }
  }

  async function handleBackgroundUpload(event) {
    await upload(event, (imageUrl) => {
      setBgImage(imageUrl);
      setBgType("image");
    });
  }

  const backgroundStyle = bgType === "image" && bgImage
    ? { backgroundImage: `url("${bgImage}")` }
    : { backgroundColor: bgColor };

  return (
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_350px]">
      <form action={saveAppearance} className="min-w-0 space-y-5">
        <input type="hidden" name="bgType" value={bgType} />
        <input type="hidden" name="bgColor" value={bgColor} />
        <input type="hidden" name="bgImage" value={bgImage} />

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-6">
          <div className="mb-5 flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
              <FontAwesomeIcon icon={faPalette} />
            </span>
            <div>
              <h2 className="font-semibold text-slate-900">Warna latar</h2>
              <p className="mt-1 text-sm leading-5 text-slate-500">
                Pilih warna untuk area header halaman profilmu.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {backgroundPresets.map((preset) => {
              const selected = bgType === "color" && bgColor.toLowerCase() === preset.color;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => {
                    setBgType("color");
                    setBgColor(preset.color);
                  }}
                  aria-pressed={selected}
                  className={`group overflow-hidden rounded-xl border text-left transition ${
                    selected
                      ? "border-emerald-600 ring-2 ring-emerald-100"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <span
                    className="relative block h-16"
                    style={{ backgroundColor: preset.color }}
                  >
                    {selected && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                        <FontAwesomeIcon icon={faCheck} className="h-3 w-3" />
                      </span>
                    )}
                    <span className="absolute bottom-2 left-2 right-2 flex h-4 gap-1">
                      <span className="w-4 rounded-full bg-white/90" />
                      <span className="flex-1 rounded-md bg-white/80" />
                    </span>
                  </span>
                  <span className="block px-3 py-2 text-xs font-medium text-slate-700">
                    {preset.name}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-medium text-slate-800">Warna kustom</p>
              <p className="mt-1 text-xs text-slate-500">
                Atur warna sesuai identitas brand kamu.
              </p>
            </div>
            <label className="flex cursor-pointer items-center gap-3 self-start rounded-lg border border-slate-200 bg-white p-2 pr-3 sm:self-auto">
              <input
                type="color"
                aria-label="Pilih warna latar kustom"
                value={bgColor}
                onChange={(event) => {
                  setBgType("color");
                  setBgColor(event.target.value);
                }}
                className="h-8 w-9 cursor-pointer rounded border-0 bg-transparent p-0"
              />
              <span className="font-mono text-xs uppercase text-slate-600">
                {bgColor}
              </span>
            </label>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-6">
          <div className="mb-5">
            <h2 className="font-semibold text-slate-900">Gambar latar</h2>
            <p className="mt-1 text-sm leading-5 text-slate-500">
              Gunakan gambar sendiri sebagai header profil.
            </p>
          </div>
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center transition hover:border-emerald-400 hover:bg-emerald-50/50">
            <span className="mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
              <FontAwesomeIcon icon={faCloudArrowUp} className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold text-slate-800">
              {bgImage ? "Ganti gambar latar" : "Unggah gambar latar"}
            </span>
            <span className="mt-1 text-xs text-slate-500">
              Pilih gambar dari perangkat kamu
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleBackgroundUpload}
              className="sr-only"
            />
          </label>
          {bgType === "image" && bgImage && (
            <div className="mt-3 flex items-center justify-between gap-3 rounded-lg bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
              <span className="truncate">Gambar latar aktif</span>
              <button
                type="button"
                onClick={() => {
                  setBgImage("");
                  setBgType("color");
                }}
                className="shrink-0 font-semibold hover:underline"
              >
                Hapus
              </button>
            </div>
          )}
        </section>

        <div className="flex justify-end pb-4">
          <SaveAppearanceButton />
        </div>
      </form>

      <aside className="xl:sticky xl:top-8">
        <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)]">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h2 className="font-semibold text-slate-900">Pratinjau langsung</h2>
              <p className="mt-1 text-xs text-slate-500">Perubahan terlihat sebelum disimpan</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700">
              LIVE
            </span>
          </div>

          <div className="mx-auto max-w-[270px] rounded-[2rem] border-[7px] border-slate-900 bg-slate-900 p-1 shadow-xlmx-auto h-[564px] w-[284px] rounded-[3.25rem] border-[7px] border-slate-900 bg-slate-900 p-1 shadow-xl">
            <div className="h-full overflow-y-auto rounded-[2.75rem] bg-white">
              <div className="h-24 bg-cover bg-center" style={backgroundStyle} />
              <div className="px-4 pb-5 text-center">
                <div className="mx-auto -mt-10 flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-emerald-100 text-xl font-semibold text-emerald-800 shadow-sm">
                  {user.image ? (
                    <Image
                      className="h-full w-full object-cover"
                      src={user.image}
                      width={160}
                      height={160}
                      alt={page.displayName || user.name || "Foto profil"}
                    />
                  ) : (
                    (page.displayName || user.name || "L").slice(0, 1).toUpperCase()
                  )}
                </div>
                <h3 className="mt-2 truncate text-base font-semibold text-slate-900">
                  {page.displayName || user.name || "Nama kamu"}
                </h3>
                {page.location && (
                  <p className="mt-1 truncate text-xs text-slate-500">{page.location}</p>
                )}
                <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-xs leading-5 text-slate-500">
                  {page.bio || "Bio singkatmu akan tampil di sini."}
                </p>
                {Object.keys(page.buttons).length > 0 && (
                  <div className="mt-3 flex flex-wrap justify-center gap-1.5">
                    {Object.keys(page.buttons).slice(0, 4).map((button) => (
                      <span key={button} className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] capitalize text-slate-600">
                        {button}
                      </span>
                    ))}
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  {page.links.slice(0, 4).map((link, index) => (
                    <div key={link.key || link.url || index} className="rounded-xl border border-slate-200 px-3 py-2.5 text-left">
                      <p className="truncate text-xs font-semibold text-slate-800">
                        {link.title || "Tautan baru"}
                      </p>
                      {link.subtitle && (
                        <p className="mt-0.5 truncate text-[10px] text-slate-500">
                          {link.subtitle}
                        </p>
                      )}
                    </div>
                  ))}
                  {page.links.length === 0 && (
                    <div className="rounded-xl border border-dashed border-slate-300 px-3 py-4 text-xs text-slate-400">
                      Tautanmu akan tampil di sini.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Link
            href={`/${page.uri}`}
            target="_blank"
            rel="noreferrer"
            className="mt-4 flex items-center justify-center gap-2 truncate text-xs font-medium text-emerald-700 hover:text-emerald-800 hover:underline"
          >
            linktri.vercel.app/{page.uri}
            <FontAwesomeIcon icon={faExternalLinkAlt} className="h-3 w-3 shrink-0" />
          </Link>
        </section>
      </aside>
    </div>
  );
}
