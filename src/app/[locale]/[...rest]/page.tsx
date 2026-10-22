import { notFound } from "next/navigation";

/** Any unknown address inside a language renders that language's 404. */
export default function CatchAll() {
  notFound();
}
