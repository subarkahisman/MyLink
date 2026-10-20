export default function SectionBox({children}) {
  return (
    <section className="mb-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_2px_10px_rgba(15,23,42,0.03)] sm:p-6">
      {children}
    </section>
  );
}