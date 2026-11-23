"use client";
import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Instagram, Facebook, Ticket } from "lucide-react";
export default function Footer(){
 const [em,setEm]=useState("");const [msg,setMsg]=useState("");
 async function sub(e:React.FormEvent){e.preventDefault();if(supabase){const {error}=await supabase.from("newsletter").insert({email:em});setMsg(error?"Could not subscribe. Try again.":"Subscribed. Welcome aboard!");}else setMsg("Subscribed (demo mode).");setEm("");}
 return <footer className="mt-0 bg-[#090718] text-white"><div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.2fr_.8fr_1fr]">
  <div><Link href="/" className="flex items-center gap-2 font-display text-2xl font-extrabold"><span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600"><Ticket size={20}/></span>Event<span className="text-fuchsia-400">ora</span></Link><p className="mt-4 max-w-xs text-sm leading-6 text-white/60">Discover unforgettable experiences, book your tickets and make every moment count.</p><div className="mt-5 flex gap-3"><a aria-label="Instagram" href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-2.5 hover:bg-fuchsia-600"><Instagram size={18}/></a><a aria-label="Facebook" href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="rounded-full border border-white/15 p-2.5 hover:bg-fuchsia-600"><Facebook size={18}/></a></div></div>
  <div><h3 className="font-extrabold">Quick links</h3><ul className="mt-4 space-y-3 text-sm text-white/65">{[["/events","Explore Events"],["/dashboard","List Your Event"],["/faq","FAQs"],["/contact","Contact"],["/privacy","Privacy Policy"],["/refund-policy","Refund Policy"],["/terms","Terms & Conditions"]].map(([h,t])=><li key={h}><Link href={h} className="hover:text-fuchsia-300">{t}</Link></li>)}</ul></div>
  <form onSubmit={sub} className="space-y-3"><label htmlFor="nl" className="font-extrabold">Get event updates</label><p className="text-sm text-white/60">Be first to hear about exciting events near you.</p><div className="flex gap-2"><input id="nl" type="email" required value={em} onChange={e=>setEm(e.target.value)} className="min-w-0 flex-1 rounded-xl bg-white px-4 py-3 text-sm text-ink outline-none" placeholder="you@email.com"/><button className="btn-p !rounded-xl !px-4">Join</button></div><p role="status" className="text-sm text-fuchsia-300">{msg}</p></form>
 </div><div className="border-t border-white/10 py-5 text-center text-xs text-white/40">© {new Date().getFullYear()} Eventora. Made for moments that matter.</div></footer>;
}
