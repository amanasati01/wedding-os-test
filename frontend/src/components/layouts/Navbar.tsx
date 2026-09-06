import { Link } from "react-router-dom";
import { navbarButton } from "@/components/ui/button-variants";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b-2 border-slate-900 bg-[#fdfbf7]/80 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-2 font-black text-3xl tracking-tighter text-slate-900 drop-shadow-[2px_2px_0px_#ec4899]">
          💍 WeddingOS
        </div>
        <nav className="hidden md:flex gap-10">
          <a
            href="#features"
            className="text-base font-bold text-slate-700 hover:text-pink-500 hover:-translate-y-1 transition-all"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-base font-bold text-slate-700 hover:text-pink-500 hover:-translate-y-1 transition-all"
          >
            How it Works
          </a>
          <a
            href="#pricing"
            className="text-base font-bold text-slate-700 hover:text-pink-500 hover:-translate-y-1 transition-all"
          >
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/login" className={navbarButton({ variant: "ghost" })}>
            Log In
          </Link>
          <Link to="/sign-up" className={navbarButton({ variant: "primary" })}>
            Join the Party 🎉
          </Link>
        </div>
      </div>
    </header>
  );
}
