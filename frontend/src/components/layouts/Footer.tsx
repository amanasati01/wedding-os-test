export default function Footer() {
  return (
    <footer className="border-t-4 border-slate-900 py-16 bg-yellow-300 mt-auto">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-12 text-sm max-w-6xl">
        <div>
          <div className="flex items-center gap-2 font-black text-2xl text-slate-900 mb-6 drop-shadow-[2px_2px_0px_#fff]">
            💍 WeddingOS
          </div>
          <p className="text-slate-800 font-bold text-base">
            The premier aesthetic platform for modern wedding planning.
          </p>
        </div>
      </div>
    </footer>
  );
}
