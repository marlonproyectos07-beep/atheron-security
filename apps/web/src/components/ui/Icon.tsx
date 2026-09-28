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
  | "shield"
  | "play"
  | "home"
  | "tree"
  | "building"
  | "factory"
  | "camera"
  | "bell"
  | "lock"
  | "flame"
  | "automation"
  | "solar";

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
  play: "M8 5.5v13l11-6.5-11-6.5Z",
  home: "m4 11 8-7 8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z",
  tree: "M12 3 8 9h2l-3.5 5.5H9L6 20h12l-3-5.5h2.5L14 9h2L12 3Zm0 14v4",
  building: "M5 21V5a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v16M13 21v-7a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v7M8 8h.01M8 12h.01M8 16h.01M5 21h14",
  factory: "M3 21V11l5 3.5V11l5 3.5V8l6 4v9H3Zm3-4h.01M11 17h.01M16 17h.01",
  camera: "M3 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Z M15 10l6-3v10l-6-3",
  bell: "M12 3a5 5 0 0 0-5 5v3.2c0 .9-.35 1.75-.98 2.38L5 15h14l-1.02-1.42c-.63-.63-.98-1.48-.98-2.38V8a5 5 0 0 0-5-5Z M10 18a2 2 0 0 0 4 0",
  lock: "M6 10V8a6 6 0 1 1 12 0v2 M5 10h14v10H5Z M12 14v3",
  flame:
    "M12 3c1.6 2.8 4 4.8 4 8.5a4 4 0 0 1-8 0c0-1.6.7-2.7 1.6-3.6-.2.9.2 1.6.9 1.9-.5-2.3.3-4.2 1.5-6.8Z",
  automation:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1",
  solar: "M4 10 7 5h10l3 5v9H4v-9Z M4 10h16 M9.5 5v14 M14.5 5v14 M4 14.5h16",
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
