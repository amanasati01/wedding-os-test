import { FEATURES } from "@/constants/landing";
import { FeatureCard } from "./FeatureCard";

export default function FeaturesSection() {
  return (
    <section id="features" className="container mx-auto px-4 py-32">
      <div className="mx-auto max-w-3xl text-center mb-20 relative">
        <div className="absolute -top-10 -left-10 text-6xl rotate-[-20deg]">
          💖
        </div>
        <div className="absolute -top-5 -right-5 text-6xl rotate-[15deg]">
          🥂
        </div>
        <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 mb-6 drop-shadow-[4px_4px_0px_#fbcfe8]">
          Everything you need
        </h2>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {FEATURES.map((feature, i) => (
          <FeatureCard key={i} {...feature} />
        ))}
      </div>
    </section>
  );
}
