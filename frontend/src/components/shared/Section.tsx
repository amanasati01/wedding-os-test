import {type ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  className?: string;
};

const Section = ({
  children,
  className = "",
}: SectionProps) => {
  return (
    <section
      className={`rounded-lg border bg-background p-6 ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;