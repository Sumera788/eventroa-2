import Link from "next/link";
import { POSTS } from "@/lib/data";
export default function P(){return <div className="mx-auto max-w-4xl px-4 py-10"><h1 className="font-display text-4xl font-bold">Blog</h1><div className="mt-6 space-y-4">{POSTS.map(p=><Link key={p.slug} href={`/blog/${p.slug}`} className="block rounded-3xl bg-white p-6 ring-1 ring-ink/10 hover:-translate-y-1 transition"><h2 className="font-display text-2xl font-bold">{p.title}</h2><p className="text-sm text-ink/60">{p.date}</p></Link>)}</div></div>}
