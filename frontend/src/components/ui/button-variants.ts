import { cva } from "class-variance-authority";

export const heroButton = cva(
  "inline-flex items-center justify-center rounded-3xl transition-all font-black shadow-[6px_6px_0px_0px_#1e293b] hover:shadow-[3px_3px_0px_0px_#1e293b] hover:translate-x-[3px] hover:translate-y-[3px] border-4 border-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      size: {
        default: "h-12 px-8 py-2 text-lg",
        lg: "h-20 px-12 text-2xl",
      },
      color: {
        cyan: "bg-cyan-400 text-slate-900 hover:bg-cyan-300",
        pink: "bg-pink-500 text-white hover:bg-pink-400",
      },
    },
    defaultVariants: {
      size: "default",
      color: "cyan",
    },
  },
);

export const navbarButton = cva(
  "inline-flex items-center justify-center rounded-2xl transition-all font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-pink-500 text-white hover:bg-pink-400 shadow-[4px_4px_0px_0px_#1e293b] hover:shadow-[2px_2px_0px_0px_#1e293b] hover:translate-x-[2px] hover:translate-y-[2px] border-2 border-slate-900",
        ghost: "text-slate-700 hover:text-slate-900 hover:bg-transparent",
      },
      size: {
        default: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export const ctaButton = cva(
  "inline-flex items-center justify-center rounded-3xl transition-all font-black border-4 border-slate-900 shadow-[6px_6px_0px_0px_#1e293b] hover:shadow-[3px_3px_0px_0px_#1e293b] hover:translate-x-[3px] hover:translate-y-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      size: {
        default: "h-16 px-10 text-xl",
        lg: "h-20 px-12 text-2xl",
      },
      color: {
        yellow: "bg-yellow-300 text-slate-900 hover:bg-yellow-200",
        purple: "bg-purple-400 text-slate-900 hover:bg-purple-300",
      },
    },
    defaultVariants: {
      size: "default",
      color: "yellow",
    },
  },
);
