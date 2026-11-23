export type Ev={id:string;title:string;category:string;city:string;date:string;price:number;seats:number;sold:number;image:string;description:string;organizer:string};
export const CATEGORIES=["Music Concerts","Weddings","Birthday Parties","Educational Seminars","Workshops","Business Conferences","Sports Events","Cultural Festivals","Fashion Shows","University Events","Food Festivals","Exhibitions","Networking Events","Charity Events","Graduation Ceremonies"];
const u=(id:string)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=70`;
export const EVENTS:Ev[]=[
["Karachi Live: Sufi Nights","Music Concerts","Karachi","2026-12-05",3500,500,320,u("photo-1501386761578-eac5c94b800a"),"An open-air evening of qawwali and modern Sufi fusion."],
["Royal Mehndi Showcase","Weddings","Lahore","2026-12-12",1500,200,90,u("photo-1519741497674-611481863552"),"Wedding planners, decor and caterers under one roof."],
["Startup Summit 2026","Business Conferences","Islamabad","2026-12-18",6000,800,540,u("photo-1540575467063-178a50c2df87"),"Founders and investors on funding, scale and product."],
["Frontend Workshop Day","Workshops","Karachi","2026-11-28",2000,60,41,u("photo-1531482615713-2afd69097998"),"Hands-on React and Next.js with industry mentors."],
["Street Food Festival","Food Festivals","Karachi","2026-12-20",800,2000,1210,u("photo-1555939594-58d7cb561ad1"),"Fifty food stalls, live cooking, family-friendly fun."],
["Fashion Flair Show","Fashion Shows","Lahore","2026-11-27",4000,300,260,u("photo-1509631179647-0177331693ae"),"Emerging designers present winter collections."],
["Inter-University Cricket Cup","Sports Events","Islamabad","2026-12-02",500,3000,1500,u("photo-1531415074968-036ba1b575da"),"Sixteen universities compete for the trophy."],
["Hope Gala for Education","Charity Events","Karachi","2026-12-22",10000,250,120,u("photo-1511795409834-ef04bbd61622"),"Fundraising dinner to fund 500 scholarships."],
["Heritage Cultural Festival","Cultural Festivals","Multan","2026-12-28",600,1500,400,u("photo-1514525253161-7a46d19cd819"),"Folk music, crafts and dance from across Pakistan."],
["Career Networking Mixer","Networking Events","Karachi","2026-11-30",1000,150,70,u("photo-1511578314322-379afb476865"),"Meet hiring managers and peers in your field."],
["Modern Art Exhibition","Exhibitions","Lahore","2026-12-08",700,400,150,u("photo-1531058020387-3be344556be6"),"Contemporary Pakistani artists, one gallery."],
["Class of 2026 Convocation","Graduation Ceremonies","Karachi","2026-12-15",0,1000,800,u("photo-1523580846011-d3a5bc25702b"),"Celebrate the graduating class with family."],
["Science Seminar: AI Futures","Educational Seminars","Islamabad","2026-12-03",300,300,180,u("photo-1524178232363-1fb2b075b655"),"Researchers discuss AI in health and education."],
["Birthday Bash Pop-up","Birthday Parties","Karachi","2026-12-10",1200,80,30,u("photo-1530103862676-de8c9debad1d"),"Themed party packages for kids and teens."],
["UniFest Talent Hunt","University Events","Karachi","2026-11-28",400,600,350,u("photo-1492684223066-81342ee5ff30"),"Singing, dance and comedy talent competition."],
].map((a,i)=>({id:String(i+1),title:a[0] as string,category:a[1] as string,city:a[2] as string,date:a[3] as string,price:a[4] as number,seats:a[5] as number,sold:a[6] as number,image:a[7] as string,description:a[8] as string,organizer:"Eventora Partners"}));
export const POSTS=[
{slug:"plan-a-sold-out-event",title:"How to plan a sold-out event",date:"2026-11-01",body:"Start with the audience, price in tiers, open early-bird tickets six weeks out, and share the schedule early. Track sales daily and adjust promotion where interest drops."},
{slug:"wedding-budget-guide",title:"A realistic wedding budget guide",date:"2026-10-20",body:"Fix your guest count first, then allocate budget to venue, catering and photography. Keep 10% in reserve for surprises."},
{slug:"networking-that-works",title:"Networking that actually works",date:"2026-10-05",body:"Arrive early, ask one real question per conversation, and follow up within 48 hours with something useful."}];
export const FAQ=[["How do I book tickets?","Open an event, choose quantity, and confirm at checkout. You get a unique booking ID instantly."],["Can I cancel a booking?","Cancel from My Bookings before the event starts."],["How do I become an organizer?","Sign up, then ask an admin to set your role to organizer, or choose Organizer at signup."],["Is my payment data safe?","Card data is never stored. Connect a payment provider such as Stripe for live payments."]];
