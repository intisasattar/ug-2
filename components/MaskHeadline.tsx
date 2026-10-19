import type { ElementType } from "react";

/** Headline revealed line by line from behind a mask. Lines are plain text for accessibility. */
export function MaskHeadline({
  lines,
  as: Tag = "h1",
  className,
  delay = 0,
  id,
}: {
  lines: string[];
  as?: ElementType;
  className?: string;
  delay?: number;
  id?: string;
}) {
  return (
    <Tag id={id} className={className} data-reveal="mask" style={{ ["--reveal-delay" as string]: delay }}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line" style={{ ["--line" as string]: i }}>
          <span>{line}</span>
          {i < lines.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
