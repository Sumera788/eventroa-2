"use client";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useEvents } from "@/lib/hooks";
import { CATEGORIES } from "@/lib/data";
import EventCard from "@/components/EventCard";
function Inner(){
 const sp=useSearchParams();const {events,loading}=useEvents();
 const [q,setQ]=useState(sp.get("q")??"");const [cat,setCat]=useState(sp.get("cat")??"");const [city,setCity]=useState(sp.get("city")??"");const [max,setMax]=useState(10000);const [from,setFrom]=useState("");
 const cities=["Karachi","Lahore","Islamabad"];
 const list=events.filter(e=>(!q||(e.title+" "+e.city).toLowerCase().includes(q.toLowerCase()))&&(!cat||e.category===cat)&&(!city||e.city===city)&&e.price<=max&&(!from||e.date>=from));
 return <div className="mx-auto max-w-7xl px-4 py-12"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-fuchsia-600">Find your next experience</p><h1 className="mt-2 font-display text-4xl font-extrabold">Explore events</h1>
  <div className="mt-6 grid gap-3 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-ink/10 md:grid-cols-5">
   <input aria-label="Search" className="inp" placeholder="Event name or city" value={q} onChange={e=>setQ(e.target.value)}/>
   <select aria-label="Category" className="inp" value={cat} onChange={e=>setCat(e.target.value)}><option value="">All categories</option>{CATEGORIES.map(c=><option key={c}>{c}</option>)}</select>
   <select aria-label="Location" className="inp" value={city} onChange={e=>setCity(e.target.value)}><option value="">All cities</option>{cities.map(c=><option key={c}>{c}</option>)}</select>
   <input aria-label="From date" type="date" className="inp" value={from} onChange={e=>setFrom(e.target.value)}/>
   <label className="text-sm font-semibold">Max price: PKR {max.toLocaleString()}<input type="range" min={0} max={10000} step={500} value={max} onChange={e=>setMax(+e.target.value)} className="mt-3 w-full accent-fuchsia-600"/></label></div>
  <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{loading?Array.from({length:6}).map((_,i)=><div key={i} className="skel h-72"/>):list.map(e=><EventCard key={e.id} e={e}/>)}</div>
  {!loading&&!list.length&&<p className="mt-10 text-center text-ink/60">No events match. Try clearing a filter.</p>}</div>;
}
export default function P(){return <Suspense><Inner/></Suspense>}
