import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="max-w-4xl text-3xl md:text-5xl font-bold tracking-tight leading-tight mb-6 text-left text-slate-900 dark:text-slate-100">
      {children}
    </h1>
  );
}
