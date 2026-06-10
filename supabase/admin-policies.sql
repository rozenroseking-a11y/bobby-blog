-- Bobby Office admin helpers for guestbook moderation.
-- Run this in Supabase SQL Editor after bobby-office-user-system.sql.

create or replace function public.is_bobby_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(auth.jwt() ->> 'email', '') in (
    'h981411799@126.com',
    'gg981411799@126.com'
  );
$$;

create or replace function public.admin_guestbook_messages()
returns table (
  id bigint,
  user_id uuid,
  email text,
  name text,
  message text,
  approved boolean,
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
      updated_at = now()
  where id = message_id;
end;
$$;

create or replace function public.admin_delete_guestbook_message(
  message_id bigint
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

  delete from public.guestbook_messages
  where id = message_id;
end;
$$;

grant execute on function public.is_bobby_admin() to authenticated;
grant execute on function public.admin_guestbook_messages() to authenticated;
grant execute on function public.admin_set_guestbook_approved(bigint, boolean) to authenticated;
grant execute on function public.admin_delete_guestbook_message(bigint) to authenticated;
