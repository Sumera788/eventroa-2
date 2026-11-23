"use client";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { EVENTS, Ev } from "./data";
export function useEvents(){
 const [events,set]=useState<Ev[]>([]);const [loading,setL]=useState(true);
 useEffect(()=>{(async()=>{
  if(supabase){const {data}=await supabase.from("events").select("*, categories(name)").eq("status","published");
   if(data&&data.length){set(data.map((e:any)=>({id:e.id,title:e.title,category:e.categories?.name??"",city:e.city,date:e.event_date,price:Number(e.price),seats:e.capacity,sold:e.sold,image:e.image_url??"",description:e.description??"",organizer:"Organizer"})));setL(false);return;}}
  set(EVENTS);setL(false);})();},[]);
 return {events,loading};
}
export function useUser(){
 const [user,set]=useState<any>(null);const [role,setRole]=useState("user");const [ready,setR]=useState(false);
 useEffect(()=>{if(!supabase){setR(true);return;}
  supabase.auth.getUser().then(async({data})=>{set(data.user);if(data.user){const {data:p}=await supabase!.from("profiles").select("role").eq("id",data.user.id).single();if(p)setRole(p.role);}setR(true);});},[]);
 return {user,role,ready};
}
