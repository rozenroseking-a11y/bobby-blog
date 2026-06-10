import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  return (
    <h1 className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-tight mb-6 text-left">
      {children}
    </h1>
  );
}
