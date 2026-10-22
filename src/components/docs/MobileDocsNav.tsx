"use client";

import { useRouter } from "@/i18n/navigation";

interface Group {
  label: string;
  docs: { slug: string; title: string }[];
}

/** On narrow screens the sidebar becomes a native select. */
export function MobileDocsNav({ label, current, options }: { label: string; current: string; options: Group[] }) {
  const router = useRouter();
  return (
    <select aria-label={label} value={current} onChange={(e) => router.push(`/docs/${e.target.value}`)}>
      {options.map((g) => (
        <optgroup key={g.label} label={g.label}>
          {g.docs.map((d) => (
            <option key={d.slug} value={d.slug}>
              {d.title}
            </option>
          ))}
        </optgroup>
      ))}
    </select>
  );
}
