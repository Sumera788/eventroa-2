"use client";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Heart } from "lucide-react";
import { POSTS } from "@/lib/data";
export default function P(){
 const {slug}=useParams<{slug:string}>();const p=POSTS.find(x=>x.slug===slug);
 const [likes,setL]=useState(0);const [liked,setLk]=useState(false);const [cs,setCs]=useState<string[]>([]);const [t,setT]=useState("");
 if(!p)return <p className="p-10">Article not found.</p>;
 return <article className="mx-auto max-w-2xl px-4 py-10"><h1 className="font-display text-4xl font-bold">{p.title}</h1><p className="mt-1 text-sm text-ink/60">{p.date}</p><p className="mt-6 text-lg leading-relaxed">{p.body}</p>
  <button className="btn-o mt-6" aria-pressed={liked} onClick={()=>{setLk(!liked);setL(l=>l+(liked?-1:1))}}><Heart size={18} fill={liked?"#D9A441":"none"}/>{likes}</button>
  <h2 className="mt-8 font-display text-2xl font-bold">Comments</h2><form className="mt-3 flex gap-2" onSubmit={e=>{e.preventDefault();if(t.trim()){setCs([...cs,t]);setT("")}}}><input aria-label="Comment" className="inp" value={t} onChange={e=>setT(e.target.value)}/><button className="btn-p">Post</button></form>
  <ul className="mt-4 space-y-2">{cs.map((c,i)=><li key={i} className="rounded-xl bg-white p-3">{c}</li>)}</ul></article>;
}
