"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Ticket, Sparkles } from "lucide-react";
import { useUser } from "@/lib/hooks";
import { supabase } from "@/lib/supabase";
const L=[["/events","Explore Events"],["/categories","Categories"],["/about","About"],["/contact","Contact"]];
export default function Nav(){
 const [o,setO]=useState(false);const {user}=useUser();
 return <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b081b]/95 text-white shadow-lg shadow-black/10 backdrop-blur">
  <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5" aria-label="Main">
   <Link href="/" aria-label="Eventora home" className="flex items-center gap-2 font-display text-2xl font-extrabold tracking-tight"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600"><Ticket size={21}/></span>Event<span className="text-fuchsia-400">ora</span></Link>
   <ul className="hidden items-center gap-7 lg:flex">{L.map(([h,t])=><li key={h}><Link href={h} className="text-sm font-semibold text-white/80 transition hover:text-fuchsia-300">{t}</Link></li>)}
    <li><Link href="/dashboard" className="text-sm font-semibold text-white/80 hover:text-fuchsia-300">List Your Event</Link></li>
    {user?<><li><Link href="/my-bookings" className="text-sm">My Bookings</Link></li><li><Link href="/dashboard" className="text-sm">Dashboard</Link></li><li><button className="btn-a !px-4 !py-2" onClick={async()=>{await supabase?.auth.signOut();location.href="/"}}>Logout</button></li></>
    :<><li><Link href="/login" className="text-sm font-semibold">Login</Link></li><li><Link href="/signup" className="btn-p !px-5 !py-2.5 text-sm">Get Started <span>→</span></Link></li></>}</ul>
   <button className="lg:hidden" aria-label="Menu" aria-expanded={o} onClick={()=>setO(!o)}>{o?<X/>:<Menu/>}</button></nav>
  {o&&<div className="flex flex-col gap-4 border-t border-white/10 bg-[#0b081b] p-5 lg:hidden" onClick={()=>setO(false)}>
   {[...L,["/dashboard","List Your Event"],["/my-bookings","My Bookings"],["/login","Login"],["/signup","Sign Up"]].map(([h,t])=><Link key={h} href={h} className="font-semibold">{t}</Link>)}</div>}
 </header>;
}
