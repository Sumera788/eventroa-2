-- Eventora schema. Run in Supabase SQL Editor.
create extension if not exists pgcrypto;
create table profiles(id uuid primary key references auth.users on delete cascade, full_name text, role text not null default 'user' check(role in('user','organizer','admin')), avatar_url text, created_at timestamptz default now());
create table categories(id serial primary key, name text unique not null);
create table events(id uuid primary key default gen_random_uuid(), organizer_id uuid references profiles(id), category_id int references categories(id), title text not null, description text, city text not null, event_date date not null, price numeric not null default 0, capacity int not null default 100, sold int not null default 0, image_url text, status text not null default 'published', created_at timestamptz default now());
create table bookings(id uuid primary key default gen_random_uuid(), booking_ref text unique not null, user_id uuid not null references profiles(id), event_id uuid not null references events(id), quantity int not null check(quantity between 1 and 10), total numeric not null, status text not null default 'confirmed', attendee_name text, attendee_email text, created_at timestamptz default now());
create table tickets(id uuid primary key default gen_random_uuid(), booking_id uuid references bookings(id) on delete cascade, code text unique not null default encode(gen_random_bytes(6),'hex'));
create table reviews(id uuid primary key default gen_random_uuid(), event_id uuid references events(id) on delete cascade, user_id uuid references profiles(id), rating int check(rating between 1 and 5), body text, created_at timestamptz default now());
create table favorites(user_id uuid references profiles(id) on delete cascade, event_id uuid references events(id) on delete cascade, primary key(user_id,event_id));
create table blog_posts(id uuid primary key default gen_random_uuid(), slug text unique, title text, body text, created_at timestamptz default now());
create table comments(id uuid primary key default gen_random_uuid(), post_id uuid references blog_posts(id) on delete cascade, user_id uuid references profiles(id), body text, created_at timestamptz default now());
create table likes(post_id uuid references blog_posts(id) on delete cascade, user_id uuid references profiles(id) on delete cascade, primary key(post_id,user_id));
create table newsletter(id serial primary key, email text unique not null, created_at timestamptz default now());
create table contact_messages(id serial primary key, name text, email text, message text, created_at timestamptz default now());

create or replace function is_admin() returns boolean language sql security definer stable as $$ select exists(select 1 from profiles where id=auth.uid() and role='admin') $$;
create or replace function handle_new_user() returns trigger language plpgsql security definer as $$ begin
 insert into profiles(id,full_name,role) values(new.id,new.raw_user_meta_data->>'full_name', case when new.raw_user_meta_data->>'role'='organizer' then 'organizer' else 'user' end); return new; end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function handle_new_user();

-- Atomic, server-side priced booking (client cannot set price)
create or replace function book_event(p_event uuid,p_qty int,p_booking_ref text,p_name text,p_email text) returns void language plpgsql security definer as $$
declare e events; bid uuid; begin
 select * into e from events where id=p_event for update;
 if e.id is null then raise exception 'Event not found'; end if;
 if e.capacity-e.sold<p_qty then raise exception 'Not enough tickets left'; end if;
 insert into bookings(booking_ref,user_id,event_id,quantity,total,attendee_name,attendee_email)
  values(p_booking_ref,auth.uid(),p_event,p_qty,round(e.price*p_qty*1.05),p_name,p_email) returning id into bid;
 insert into tickets(booking_id) select bid from generate_series(1,p_qty);
 update events set sold=sold+p_qty where id=p_event; end $$;

alter table profiles enable row level security; alter table categories enable row level security; alter table events enable row level security; alter table bookings enable row level security; alter table tickets enable row level security; alter table reviews enable row level security; alter table favorites enable row level security; alter table blog_posts enable row level security; alter table comments enable row level security; alter table likes enable row level security; alter table newsletter enable row level security; alter table contact_messages enable row level security;
create policy p_sel on profiles for select using(auth.uid()=id or is_admin());
create policy p_upd on profiles for update using(auth.uid()=id and role=(select role from profiles where id=auth.uid()) or is_admin());
create policy c_sel on categories for select using(true);
create policy e_sel on events for select using(status='published' or organizer_id=auth.uid() or is_admin());
create policy e_ins on events for insert with check(organizer_id=auth.uid() and exists(select 1 from profiles where id=auth.uid() and role in('organizer','admin')));
create policy e_upd on events for update using(organizer_id=auth.uid() or is_admin());
create policy e_del on events for delete using(organizer_id=auth.uid() or is_admin());
create policy b_sel on bookings for select using(user_id=auth.uid() or is_admin() or exists(select 1 from events where events.id=event_id and organizer_id=auth.uid()));
create policy b_upd on bookings for update using(user_id=auth.uid()) with check(status='cancelled');
create policy t_sel on tickets for select using(exists(select 1 from bookings b where b.id=booking_id and b.user_id=auth.uid()));
create policy r_sel on reviews for select using(true); create policy r_ins on reviews for insert with check(user_id=auth.uid());
create policy f_all on favorites for all using(user_id=auth.uid()) with check(user_id=auth.uid());
create policy bp_sel on blog_posts for select using(true); create policy bp_adm on blog_posts for all using(is_admin()) with check(is_admin());
create policy cm_sel on comments for select using(true); create policy cm_ins on comments for insert with check(user_id=auth.uid());
create policy l_sel on likes for select using(true); create policy l_ins on likes for insert with check(user_id=auth.uid()); create policy l_del on likes for delete using(user_id=auth.uid());
create policy n_ins on newsletter for insert with check(true); create policy n_sel on newsletter for select using(is_admin());
create policy cn_ins on contact_messages for insert with check(true); create policy cn_sel on contact_messages for select using(is_admin());

-- Seed
insert into categories(name) values('Music Concerts'),('Weddings'),('Birthday Parties'),('Educational Seminars'),('Workshops'),('Business Conferences'),('Sports Events'),('Cultural Festivals'),('Fashion Shows'),('University Events'),('Food Festivals'),('Exhibitions'),('Networking Events'),('Charity Events'),('Graduation Ceremonies');
insert into events(category_id,title,description,city,event_date,price,capacity,sold,image_url) values
((select id from categories where name='Music Concerts'),'Karachi Live: Sufi Nights','Open-air qawwali and Sufi fusion.','Karachi','2026-12-05',3500,500,320,'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=70'),
((select id from categories where name='Business Conferences'),'Startup Summit 2026','Founders and investors on funding and scale.','Islamabad','2026-12-18',6000,800,540,'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=70'),
((select id from categories where name='Food Festivals'),'Street Food Festival','Fifty stalls and live cooking.','Karachi','2026-12-20',800,2000,1210,'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=70');
-- Storage: create a public bucket named "event-images" in Supabase Storage.
-- Make yourself admin: update profiles set role='admin' where id=(select id from auth.users where email='you@email.com');
