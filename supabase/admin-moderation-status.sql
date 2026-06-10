-- Bobby Office admin moderation status.
-- Run this after supabase/admin-policies.sql if you want separate
-- pending / approved / hidden states in the admin panel.

alter table public.guestbook_messages
  add column if not exists review_status text not null default 'pending';

alter table public.guestbook_messages
  drop constraint if exists guestbook_messages_review_status_check;

alter table public.guestbook_messages
  add constraint guestbook_messages_review_status_check
  check (review_status in ('pending', 'approved', 'hidden'));

update public.guestbook_messages
set review_status = case
  when approved = true then 'approved'
  when review_status is null then 'pending'
  else review_status
end;

create or replace function public.admin_guestbook_messages()
returns table (
  id bigint,
  user_id uuid,
  email text,
  name text,
  message text,
  approved boolean,
  review_status text,
  created_at timestamptz,
  nickname text,
  avatar_url text
)
language sql
stable
security definer
set search_path = public, auth
as $$
  select
    m.id,
    m.user_id,
    u.email::text,
    m.name,
    m.message,
    coalesce(m.approved, false) as approved,
    m.review_status,
    m.created_at,
    p.nickname,
    p.avatar_url
  from public.guestbook_messages m
  left join public.profiles p on p.id = m.user_id
  left join auth.users u on u.id = m.user_id
  where public.is_bobby_admin()
  order by m.created_at desc nulls last, m.id desc;
$$;

create or replace function public.admin_set_guestbook_approved(
  message_id bigint,
  next_approved boolean
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_bobby_admin() then
    raise exception '猫老板不允许进入这里';
  end if;

  update public.guestbook_messages
  set approved = next_approved,
      review_status = case when next_approved then 'approved' else 'hidden' end,
      updated_at = now()
  where id = message_id;
end;
$$;

grant execute on function public.admin_guestbook_messages() to authenticated;
grant execute on function public.admin_set_guestbook_approved(bigint, boolean) to authenticated;
