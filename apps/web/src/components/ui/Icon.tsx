import type { SVGProps } from "react";

export type IconName =
  | "resolution"
  | "storage"
  | "growth"
  | "support"
  | "install"
  | "trust"
  | "check"
  | "chevron-down"
  | "chevron-right"
  | "menu"
  | "close"
  | "whatsapp"
  | "arrow-right"
  | "shield";

const PATHS: Record<IconName, string> = {
  resolution:
    "M3 7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm5 2 4 3-4 3V9Z",
  storage:
    "M6 3h9l3 3v15a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm2 9h8m-8 4h5",
  growth: "m3 17 5-5 4 4 8-9M14 7h6v6",
  support:
    "M12 3a7 7 0 0 0-7 7v3a2 2 0 0 0 2 2h1v-6H6v-1a6 6 0 0 1 12 0v1h-2v6h1a2 2 0 0 0 2-2v-3a7 7 0 0 0-7-7Zm-4 12v1a4 4 0 0 0 4 4",
  install: "m14.5 3.5 6 6-3 3-6-6 3-3ZM5 14l6-6 3 3-6 6H5v-3Zm-2 9 4-1-3-3-1 4Z",
  trust:
    "M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Zm-2 9 2 2 4-4",
  check: "m5 13 4 4L19 7",
  "chevron-down": "m6 9 6 6 6-6",
  "chevron-right": "m9 6 6 6-6 6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M18 6 6 18",
  whatsapp:
    "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3Zm4.9 12.6c-.2.6-1.2 1.1-1.8 1.2-.5.1-1.1.1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 .9-2.2.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .5.4.2.5.7 1.7.7 1.8.1.2.1.3 0 .5-.1.2-.1.3-.3.5l-.4.5c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.7-.8c.2-.3.4-.2.6-.1l1.6.8c.2.1.3.2.4.3.1.2.1.7-.1 1.2Z",
  "arrow-right": "M5 12h14m-6-6 6 6-6 6",
  shield: "M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z",
};

export function Icon({
  name,
  className,
  ...rest
}: { name: IconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      <path d={PATHS[name]} />
    </svg>
  );
}
