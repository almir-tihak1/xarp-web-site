import type { ReactNode } from "react";

type Props = {
  number: string;
  label: string;
  title: ReactNode;
  children?: ReactNode;
  className?: string;
};

// "01 / about us" label on the left, heading and lead text on the right.
export default function SectionHead({ number, label, title, children, className }: Props) {
  return (
    <div className={`sec-head reveal${className ? ` ${className}` : ""}`}>
      <div className="sec-label">
        <b>{number}</b> / {label}
      </div>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}
