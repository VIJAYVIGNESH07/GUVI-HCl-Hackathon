create extension if not exists "uuid-ossp";

create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text unique,
  role text,
  created_at timestamp default now()
);

create table if not exists user_credentials (
  user_id uuid primary key references users(id),
  password_hash text
);

create table if not exists businesses (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id),
  industry text,
  language_pref text
);

create table if not exists financial_statements (
  business_id uuid references businesses(id),
  revenue float,
  expenses float,
  profit float,
  period date
);

create table if not exists transactions (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id),
  amount float,
  category text,
  vendor text,
  date date
);

create table if not exists loans (
  business_id uuid references businesses(id),
  principal float,
  emi float,
  interest_rate float
);

create table if not exists risk_scores (
  business_id uuid references businesses(id),
  health_score float,
  bankruptcy_prob float
);

create table if not exists fraud_flags (
  transaction_id uuid references transactions(id),
  anomaly_score float,
  flag_reason text
);
