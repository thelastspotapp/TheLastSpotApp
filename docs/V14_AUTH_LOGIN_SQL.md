# V14 Authentication Foundation SQL

```sql
alter table user_profiles add column if not exists last_login timestamptz;
alter table user_profiles add column if not exists auth_provider text default 'email';
alter table user_profiles add column if not exists account_status text default 'active';

update user_profiles
set account_status = coalesce(account_status, 'active');

grant all on user_profiles to anon;
```
