import { Suspense, lazy } from "react";
import { Link } from "react-router-dom";
import { heroButton } from "@/components/ui/button-variants";

// Lazy load the heavy 3D component to improve initial load time
const Hero3D = lazy(() => import("@/components/landing/Hero3D"));

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-4xl flex flex-col items-center text-center space-y-8 relative z-20">
        <div className="inline-flex items-center rounded-2xl border-2 border-slate-900 bg-yellow-300 px-6 py-2 text-sm md:text-base font-bold text-slate-900 shadow-[4px_4px_0px_0px_#1e293b] rotate-1 hover:rotate-0 transition-transform">
          🔥 The most playful way to plan a wedding
        </div>

        <h1 className="text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter text-slate-900 leading-[0.95] drop-shadow-[6px_6px_0px_#cbd5e1]">
          Plan Your <br />
          <span className="text-pink-500 underline decoration-cyan-400 decoration-8 underline-offset-8">
            Dream
          </span>{" "}
          Wedding
        </h1>

        <p className="text-xl md:text-2xl text-slate-700 font-bold max-w-2xl bg-white/50 backdrop-blur-md p-4 rounded-3xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#1e293b] -rotate-1">
          Experience the luxury of seamless organization. Guests, budgets,
          events, and family collaboration—made fun. 🍾
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-10 w-full sm:w-auto">
          <Link to="/sign-up" className="w-full sm:w-auto">
            <button className={heroButton({ size: "lg", color: "cyan" })}>
              Let's Go! 🚀
            </button>
          </Link>
        </div>
      </div>

      {/* 3D Component centered below */}
      <div className="w-full max-w-6xl mx-auto mt-20 relative h-[700px] border-4 border-slate-900 rounded-[3rem] bg-indigo-50 shadow-[12px_12px_0px_0px_#1e293b] overflow-hidden">
        {/* Grid overlay inside the 3D container for aesthetic */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
        <Suspense
          fallback={
            <div className="flex items-center justify-center h-full w-full text-slate-400 font-bold">
              Loading 3D Experience...
            </div>
          }
        >
          <Hero3D />
        </Suspense>
      </div>
    </section>
  );
}
