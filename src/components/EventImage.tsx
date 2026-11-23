"use client";
import { useState } from "react";
import { CalendarDays } from "lucide-react";
export default function EventImage({src,alt,className=""}:{src:string;alt:string;className?:string}){
 const [bad,setBad]=useState(!src);
 return bad?<div role="img" aria-label={alt} className={`flex items-center justify-center bg-gradient-to-br from-brand to-[#0a3d35] text-accent ${className}`}><CalendarDays size={40}/></div>
 :<img src={src} alt={alt} loading="lazy" onError={()=>setBad(true)} className={`object-cover ${className}`}/>;
}
