"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { useEvents, useUser } from "@/lib/hooks";
import { supabase } from "@/lib/supabase";
const FEE=0.05;
export default function P(){
 const {id}=useParams<{id:string}>();const {events,loading}=useEvents();const {user}=useUser();
 const [qty,setQty]=useState(1);const [name,setName]=useState("");const [email,setEmail]=useState("");const [done,setDone]=useState("");const [err,setErr]=useState("");const [busy,setBusy]=useState(false);
 const e=events.find(x=>x.id===id);
 if(loading)return <div className="skel m-8 h-96"/>; if(!e)return <p className="p-10">Event not found.</p>;
 const sub=e.price*qty,fee=Math.round(sub*FEE),total=sub+fee,left=e.seats-e.sold;
 async function pay(ev:React.FormEvent){ev.preventDefault();setErr("");setBusy(true);
  const bid="EVT-"+Math.random().toString(36).slice(2,8).toUpperCase();
  try{
   if(supabase){ if(!user){setErr("Please log in to book.");setBusy(false);return;}
    const {error}=await supabase.rpc("book_event",{p_event:e!.id,p_qty:qty,p_booking_ref:bid,p_name:name,p_email:email});
    if(error)throw error;
   }else{const k="eventora_bookings";const all=JSON.parse(localStorage.getItem(k)||"[]");all.push({ref:bid,title:e!.title,qty,total,date:e!.date,name,status:"confirmed"});localStorage.setItem(k,JSON.stringify(all));}
   setDone(bid);
  }catch(x:any){setErr(x.message||"Booking failed. Try again.");}
  setBusy(false);}
 if(done)return <div className="mx-auto max-w-lg p-10 text-center"><CheckCircle2 className="mx-auto text-brand" size={64}/><h1 className="mt-4 font-display text-3xl font-bold">Booking confirmed</h1><p className="mt-2">Your booking ID</p><p className="my-3 rounded-xl bg-white p-4 font-mono text-2xl font-bold text-brand">{done}</p><Link className="btn-p" href="/my-bookings">View my bookings</Link></div>;
 return <form onSubmit={pay} className="mx-auto max-w-2xl space-y-5 px-4 py-10"><h1 className="font-display text-3xl font-bold">Checkout: {e.title}</h1>
  <label className="block">Full name<input required className="inp" value={name} onChange={x=>setName(x.target.value)}/></label>
  <label className="block">Email<input required type="email" className="inp" value={email} onChange={x=>setEmail(x.target.value)}/></label>
  <label className="block">Tickets<input type="number" min={1} max={Math.min(10,left)} className="inp" value={qty} onChange={x=>setQty(Math.max(1,Math.min(Math.min(10,left),+x.target.value||1)))}/></label>
  <div className="space-y-1 rounded-2xl bg-white p-5 ring-1 ring-ink/10"><p className="flex justify-between"><span>Tickets ({qty} × {e.price})</span><span>PKR {sub}</span></p><p className="flex justify-between"><span>Service fee (5%)</span><span>PKR {fee}</span></p><p className="flex justify-between border-t pt-2 text-xl font-bold text-brand"><span>Total</span><span>PKR {total}</span></p></div>
  {err&&<p role="alert" className="text-red-700">{err}</p>}<button disabled={busy} className="btn-p w-full">{busy?"Booking…":"Confirm booking"}</button>
  <p className="text-xs text-ink/60">Payment gateway not connected: bookings are confirmed without charge. See README to add Stripe.</p></form>;
}
