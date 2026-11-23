"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapPin, CalendarDays, Ticket } from "lucide-react";
import { useEvents } from "@/lib/hooks";
import EventImage from "@/components/EventImage";
export default function P(){
 const {id}=useParams<{id:string}>();const {events,loading}=useEvents();const e=events.find(x=>x.id===id);
 if(loading)return <div className="skel m-8 h-96"/>;
 if(!e)return <p className="p-10">Event not found. <Link className="text-brand underline" href="/events">Browse events</Link></p>;
 const left=e.seats-e.sold;
 return <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">
  <div className="md:col-span-2"><EventImage src={e.image} alt={e.title} className="h-80 w-full rounded-3xl"/>
   <h1 className="mt-6 font-display text-4xl font-bold">{e.title}</h1>
   <p className="mt-2 flex flex-wrap gap-4 text-ink/70"><span className="flex gap-1"><CalendarDays size={18}/>{e.date}</span><span className="flex gap-1"><MapPin size={18}/>{e.city}</span><span>{e.category}</span></p>
   <p className="mt-6 text-lg leading-relaxed">{e.description}</p><p className="mt-4 text-sm text-ink/60">Organized by {e.organizer}</p></div>
  <aside className="h-fit rounded-3xl bg-white p-6 shadow ring-1 ring-ink/10"><p className="font-display text-3xl font-bold text-brand">{e.price?`PKR ${e.price.toLocaleString()}`:"Free"}</p>
   <p className="mt-1 text-sm">{left>0?`${left} of ${e.seats} tickets available`:"Sold out"}</p>
   <div className="mt-3 h-2 rounded-full bg-ink/10"><div className="h-2 rounded-full bg-accent" style={{width:`${(e.sold/e.seats)*100}%`}}/></div>
   {left>0?<Link href={`/book/${e.id}`} className="btn-p mt-5 w-full"><Ticket size={18}/>Book tickets</Link>:<button disabled className="btn mt-5 w-full bg-ink/20">Sold out</button>}</aside></div>;
}
