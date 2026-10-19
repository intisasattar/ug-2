import type { ElementType } from "react";

/** Text that brightens word by word as it enters the viewport. */
export function WordReveal({ text, as: Tag = "p", className }: { text: string; as?: ElementType; className?: string }) {
  const words = text.split(" ");
  return (
    <Tag className={className} data-reveal="words">
      {words.map((w, i) => (
        <span key={i} className="word" style={{ ["--w" as string]: i }}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
