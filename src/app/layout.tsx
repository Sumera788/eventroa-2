import "./globals.css";
import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
const d=Fraunces({subsets:["latin"],variable:"--font-display"});
const s=Manrope({subsets:["latin"],variable:"--font-sans"});
export const metadata:Metadata={title:"Eventora – Discover. Book. Enjoy.",description:"Event booking platform"};
export default function R({children}:{children:React.ReactNode}){
 return <html lang="en" className={`${d.variable} ${s.variable}`}><body className="font-sans"><a href="#main" className="sr-only focus:not-sr-only">Skip to content</a><Nav/><main id="main">{children}</main><Footer/></body></html>;
}
