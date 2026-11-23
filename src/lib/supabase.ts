import { createClient } from "@supabase/supabase-js";
const url=process.env.NEXT_PUBLIC_SUPABASE_URL, key=process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const configured=!!(url&&key);
export const supabase=configured?createClient(url!,key!):null;
