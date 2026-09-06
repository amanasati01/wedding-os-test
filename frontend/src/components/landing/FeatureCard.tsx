import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Feature } from "@/constants/landing";

export const FeatureCard = React.memo(
  ({ icon: Icon, title, description, color }: Feature) => {
    return (
      <Card className="border-4 border-slate-900 shadow-[6px_6px_0px_0px_#1e293b] hover:shadow-[2px_2px_0px_0px_#1e293b] hover:translate-x-[4px] hover:translate-y-[4px] transition-all rounded-3xl overflow-hidden bg-white group">
        <CardHeader className="pb-4 relative overflow-hidden">
          <div
            className={`mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full border-4 border-slate-900 shadow-[4px_4px_0px_0px_#1e293b] group-hover:rotate-12 transition-transform ${color}`}
          >
            <Icon className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-black text-slate-900">
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-600 font-bold text-lg leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    );
  },
);

FeatureCard.displayName = "FeatureCard";
