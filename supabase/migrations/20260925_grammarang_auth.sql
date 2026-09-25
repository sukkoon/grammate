-- Grammarang(그래머랑) 계정과 학습 기록. Supabase 프로젝트 sukkoon(nsfwfnwpioyypccgdxab)의 SQL 편집기에서 한 번 실행한다.
-- 다른 앱의 표와 겹치지 않도록 gm_ 접두어를 쓴다.
create extension if not exists pgcrypto with schema extensions;

create table if not exists public.gm_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  phone text unique check (phone is null or phone ~ '^01[016789][0-9]{7,8}$'),
  display_name text not null default '' check (char_length(display_name) <= 40),
  created_at timestamptz not null default now()
);
comment on table public.gm_profiles is 'Grammarang 사용자. phone은 전화번호로 가입한 계정(숫자만, 중복 불가).';
alter table public.gm_profiles enable row level security;
create policy "gm_profiles_self_select" on public.gm_profiles for select to authenticated using (id = auth.uid());
create policy "gm_profiles_self_update" on public.gm_profiles for update to authenticated using (id = auth.uid()) with check (id = auth.uid());

create table if not exists public.gm_records (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (char_length(kind) between 1 and 40),
  key text not null default 'all' check (char_length(key) between 1 and 80),
  payload jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, kind, key)
);
comment on table public.gm_records is 'Grammarang 학습 기록(단어장·확인 문제·읽음). 기기가 바뀌어도 이어지도록 localStorage와 동기화한다.';
alter table public.gm_records enable row level security;
create policy "gm_records_self_select" on public.gm_records for select to authenticated using (user_id = auth.uid());
create policy "gm_records_self_insert" on public.gm_records for insert to authenticated with check (user_id = auth.uid());
create policy "gm_records_self_update" on public.gm_records for update to authenticated using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "gm_records_self_delete" on public.gm_records for delete to authenticated using (user_id = auth.uid());

create table if not exists public.gm_secret (
  k text primary key,
  v text not null
);
comment on table public.gm_secret is 'Grammarang 서버 비밀 값(가입 서명). Edge Function·트리거 전용.';
alter table public.gm_secret enable row level security;
insert into public.gm_secret (k, v) values ('signup', encode(extensions.gen_random_bytes(32), 'hex')) on conflict (k) do nothing;

create table if not exists public.gm_reset_sends (
  user_id uuid primary key references auth.users(id) on delete cascade,
  last_sent timestamptz not null default now(),
  window_start timestamptz not null default now(),
  window_count integer not null default 1
);
comment on table public.gm_reset_sends is 'Grammarang 비밀번호 찾기 메일 보낸 기록(횟수 제한). Edge Function gm-phone 전용.';
alter table public.gm_reset_sends enable row level security;

-- 가입 트리거: Edge Function이 서명한 전화번호만 프로필로 만든다
create or replace function public.gm_handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  p text;
  s text;
  sec text;
begin
  p := new.raw_user_meta_data->>'gm_phone';
  s := new.raw_user_meta_data->>'gm_sig';
  if p is null or s is null then
    return new;
  end if;
  select v into sec from public.gm_secret where k = 'signup';
  if sec is null then
    return new;
  end if;
  if encode(extensions.hmac(convert_to(p, 'UTF8'), convert_to(sec, 'UTF8'), 'sha256'), 'hex') <> s then
    return new;
  end if;
  insert into public.gm_profiles (id, phone, display_name)
  values (new.id, p, coalesce(left(new.raw_user_meta_data->>'display_name', 40), ''))
  on conflict (id) do nothing;
  return new;
end
$$;

drop trigger if exists gm_on_auth_user_created on auth.users;
create trigger gm_on_auth_user_created
after insert on auth.users
for each row execute function public.gm_handle_new_user();
