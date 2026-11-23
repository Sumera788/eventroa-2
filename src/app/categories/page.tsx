import Link from "next/link";
import { CATEGORIES } from "@/lib/data";
export default function P(){return <div className="mx-auto max-w-7xl px-4 py-10"><h1 className="font-display text-4xl font-bold">Categories</h1>
 <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{CATEGORIES.map(c=><Link key={c} href={`/events?cat=${encodeURIComponent(c)}`} className="rounded-3xl bg-white p-6 font-display text-xl font-bold ring-1 ring-ink/10 transition hover:-translate-y-1 hover:bg-brand hover:text-white">{c}</Link>)}</div></div>}
