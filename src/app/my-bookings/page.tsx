"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
export default function P(){
 const [rows,setRows]=useState<any[]>([]);const [loading,setL]=useState(true);
 async function load(){
  if(supabase){const {data}=await supabase.from("bookings").select("id,booking_ref,quantity,total,status,events(title,event_date)").order("created_at",{ascending:false});setRows((data||[]).map((b:any)=>({id:b.id,ref:b.booking_ref,title:b.events?.title,date:b.events?.event_date,qty:b.quantity,total:b.total,status:b.status})));}
  else setRows(JSON.parse(localStorage.getItem("eventora_bookings")||"[]"));setL(false);}
 useEffect(()=>{load()},[]);
 async function cancel(r:any){if(supabase){await supabase.from("bookings").update({status:"cancelled"}).eq("id",r.id);}else{const a=JSON.parse(localStorage.getItem("eventora_bookings")||"[]").map((x:any)=>x.ref===r.ref?{...x,status:"cancelled"}:x);localStorage.setItem("eventora_bookings",JSON.stringify(a));}load();}
 return <div className="mx-auto max-w-4xl px-4 py-10"><h1 className="font-display text-4xl font-bold">My bookings</h1>
  {loading?<div className="skel mt-6 h-24"/>:!rows.length?<p className="mt-6">No bookings yet. Find an event to attend.</p>:
  <ul className="mt-6 space-y-3">{rows.map(r=><li key={r.ref} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-5 ring-1 ring-ink/10"><div><p className="font-bold">{r.title}</p><p className="text-sm text-ink/70">{r.date} · {r.qty} ticket(s) · PKR {r.total}</p><p className="font-mono text-sm text-brand">{r.ref}</p></div>
   <div className="flex items-center gap-3"><span className="rounded-full bg-accent/30 px-3 py-1 text-sm">{r.status}</span>{r.status==="confirmed"&&<button className="btn-o" onClick={()=>cancel(r)}>Cancel</button>}</div></li>)}</ul>}</div>;
}
