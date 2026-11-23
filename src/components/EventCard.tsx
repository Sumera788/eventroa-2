"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, CalendarDays } from "lucide-react";
import EventImage from "./EventImage";
import { Ev } from "@/lib/data";
export default function EventCard({e}:{e:Ev}){
 const left=e.seats-e.sold;
 return <motion.div whileHover={{y:-6}} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-ink/10">
  <Link href={`/events/${e.id}`} className="block">
   <div className="relative"><EventImage src={e.image} alt={e.title} className="h-48 w-full"/>
    <span className="absolute left-3 top-3 rounded-full bg-cream px-3 py-1 text-xs font-semibold">{e.category}</span></div>
   <div className="space-y-2 p-5"><h3 className="font-display text-xl font-bold">{e.title}</h3>
    <p className="flex items-center gap-2 text-sm text-ink/70"><CalendarDays size={15}/>{e.date} <MapPin size={15}/>{e.city}</p>
    <div className="flex items-center justify-between pt-1"><b className="text-brand">{e.price?`PKR ${e.price.toLocaleString()}`:"Free"}</b>
     <span className={`text-xs ${left<50?"text-red-700":"text-ink/60"}`}>{left} left</span></div></div></Link></motion.div>;
}
