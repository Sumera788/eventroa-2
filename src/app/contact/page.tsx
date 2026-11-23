"use client";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
export default function P(){
 const [f,setF]=useState({name:"",email:"",message:""});const [m,setM]=useState("");
 async function s(e:React.FormEvent){e.preventDefault();if(supabase){const {error}=await supabase.from("contact_messages").insert(f);setM(error?"Could not send. Try again.":"Message sent. We will reply soon.");}else setM("Message received (demo mode).");}
 return <form onSubmit={s} className="mx-auto max-w-xl space-y-4 px-4 py-10"><h1 className="font-display text-4xl font-bold">Contact us</h1>
  <input required aria-label="Name" placeholder="Name" className="inp" onChange={e=>setF({...f,name:e.target.value})}/><input required type="email" aria-label="Email" placeholder="Email" className="inp" onChange={e=>setF({...f,email:e.target.value})}/>
  <textarea required rows={5} aria-label="Message" placeholder="Message" className="inp" onChange={e=>setF({...f,message:e.target.value})}/><button className="btn-p">Send message</button><p role="status">{m}</p></form>;
}
