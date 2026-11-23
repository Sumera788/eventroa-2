"use client";
import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
export default function AuthForm({mode}:{mode:"login"|"signup"}){
 const [em,setEm]=useState("");const [pw,setPw]=useState("");const [name,setName]=useState("");const [role,setRole]=useState("user");const [msg,setMsg]=useState("");
 async function go(e:React.FormEvent){e.preventDefault();setMsg("");
  if(!supabase)return setMsg("Supabase is not configured. Add keys to .env.local.");
  const r=mode==="login"?await supabase.auth.signInWithPassword({email:em,password:pw}):await supabase.auth.signUp({email:em,password:pw,options:{data:{full_name:name,role}}});
  if(r.error)return setMsg(r.error.message);
  if(mode==="signup"&&!r.data.session)return setMsg("Check your email to confirm your account.");
  location.href="/";}
 return <form onSubmit={go} className="mx-auto my-14 max-w-md space-y-4 rounded-3xl bg-white p-8 shadow ring-1 ring-ink/10"><h1 className="font-display text-3xl font-bold">{mode==="login"?"Welcome back":"Create your account"}</h1>
  {mode==="signup"&&<><label className="block">Full name<input required className="inp" value={name} onChange={e=>setName(e.target.value)}/></label>
   <label className="block">I am a<select className="inp" value={role} onChange={e=>setRole(e.target.value)}><option value="user">Attendee</option><option value="organizer">Organizer</option></select></label></>}
  <label className="block">Email<input required type="email" className="inp" value={em} onChange={e=>setEm(e.target.value)}/></label>
  <label className="block">Password<input required type="password" minLength={6} className="inp" value={pw} onChange={e=>setPw(e.target.value)}/></label>
  {msg&&<p role="alert" className="text-sm text-red-700">{msg}</p>}<button className="btn-p w-full">{mode==="login"?"Log in":"Sign up"}</button>
  <p className="text-sm">{mode==="login"?<>New here? <Link className="text-brand underline" href="/signup">Create an account</Link></>:<>Have an account? <Link className="text-brand underline" href="/login">Log in</Link></>}</p></form>;
}
