"use client";
import { useEffect, useState } from "react";
import { useUser, useEvents } from "@/lib/hooks";
import { supabase } from "@/lib/supabase";
export default function P(){
 const {user,role,ready}=useUser();const {events}=useEvents();const [b,setB]=useState<any[]>([]);const [f,setF]=useState({title:"",city:"",date:"",price:0,capacity:100,description:""});const [msg,setMsg]=useState("");
 useEffect(()=>{supabase?.from("bookings").select("quantity,total,status,created_at").then(({data})=>setB(data||[]));},[user]);
 if(!ready)return <div className="skel m-8 h-64"/>;
 if(supabase&&!user)return <p className="p-10">Please <a className="text-brand underline" href="/login">log in</a>.</p>;
 const ok=b.filter(x=>x.status==="confirmed"),rev=ok.reduce((s,x)=>s+Number(x.total),0),tix=ok.reduce((s,x)=>s+x.quantity,0);
 const byCat:Record<string,number>={};events.forEach(e=>byCat[e.category]=(byCat[e.category]||0)+e.sold);
 const top=Object.entries(byCat).sort((a,b)=>b[1]-a[1]).slice(0,6),mx=Math.max(1,...top.map(t=>t[1]));
 async function create(e:React.FormEvent){e.preventDefault();if(!supabase)return;
  const {error}=await supabase.from("events").insert({title:f.title,city:f.city,event_date:f.date,price:f.price,capacity:f.capacity,description:f.description,organizer_id:user.id,status:"published"});setMsg(error?error.message:"Event published.");}
 return <div className="mx-auto max-w-6xl px-4 py-10"><h1 className="font-display text-4xl font-bold">{role==="admin"?"Admin":role==="organizer"?"Organizer":"Your"} dashboard</h1>
  <div className="mt-6 grid gap-4 sm:grid-cols-3">{[["Bookings",ok.length],["Tickets sold",tix],["Revenue (PKR)",rev.toLocaleString()]].map(([l,v])=><div key={l as string} className="rounded-3xl bg-white p-6 ring-1 ring-ink/10"><p className="text-sm text-ink/60">{l}</p><p className="font-display text-3xl font-bold text-brand">{v}</p></div>)}</div>
  <h2 className="mt-10 font-display text-2xl font-bold">Tickets sold by category</h2>
  <div className="mt-4 space-y-2">{top.map(([c,n])=><div key={c} className="flex items-center gap-3"><span className="w-44 text-sm">{c}</span><div className="h-4 flex-1 rounded-full bg-ink/10"><div className="h-4 rounded-full bg-brand" style={{width:`${(n/mx)*100}%`}}/></div><span className="w-12 text-sm">{n}</span></div>)}</div>
  {(role==="organizer"||role==="admin")&&<form onSubmit={create} className="mt-10 grid gap-3 rounded-3xl bg-white p-6 ring-1 ring-ink/10 md:grid-cols-2"><h2 className="font-display text-2xl font-bold md:col-span-2">Create event</h2>
   <input required className="inp" placeholder="Title" onChange={e=>setF({...f,title:e.target.value})}/><input required className="inp" placeholder="City" onChange={e=>setF({...f,city:e.target.value})}/>
   <input required type="date" className="inp" onChange={e=>setF({...f,date:e.target.value})}/><input type="number" className="inp" placeholder="Price" onChange={e=>setF({...f,price:+e.target.value})}/>
   <input type="number" className="inp" placeholder="Capacity" onChange={e=>setF({...f,capacity:+e.target.value})}/><textarea className="inp" placeholder="Description" onChange={e=>setF({...f,description:e.target.value})}/>
   <button className="btn-p md:col-span-2">Publish event</button><p role="status" className="md:col-span-2">{msg}</p></form>}
  {role==="admin"&&<p className="mt-8 rounded-2xl bg-accent/20 p-4">Admin: manage users and roles in Supabase table <code>profiles</code> (RLS allows admins to update roles).</p>}</div>;
}
