# Quick Setup Checklist

Copy this checklist and check off items as you complete them:

## ☐ Prerequisites
- [ ] Node.js 18+ installed (`node --version`)
- [ ] npm installed (`npm --version`)
- [ ] Supabase account created (https://supabase.com)

## ☐ Supabase Configuration
- [ ] New Supabase project created
- [ ] Database provisioned (wait ~2 minutes)
- [ ] Email provider enabled (Authentication → Providers → Email)
- [ ] Email confirmation DISABLED (Authentication → Providers → Email → Confirm email OFF)
- [ ] database-schema.sql executed in SQL Editor
- [ ] No errors in SQL execution
- [ ] Project URL copied
- [ ] Anon key copied

## ☐ Local Setup
- [ ] Project files extracted/cloned
- [ ] `npm install` completed successfully
- [ ] `.env.local` created from `.env.example`
- [ ] NEXT_PUBLIC_SUPABASE_URL filled in
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY filled in

## ☐ First Master User
- [ ] User created in Supabase Dashboard (Authentication → Users)
  - Email: `admin@tmp.internal`
  - Password: (your secure password)
  - Auto Confirm User: CHECKED
- [ ] Profile SQL executed successfully:
```sql
INSERT INTO public.profiles (id, username, email, role)
SELECT id, 'admin', 'admin@tmp.internal', 'master'
FROM auth.users
WHERE email = 'admin@tmp.internal';
```
- [ ] Verify in SQL Editor: `SELECT * FROM profiles;` shows the admin user

## ☐ Development Server
- [ ] `npm run dev` runs without errors
- [ ] Open http://localhost:3000
- [ ] Page loads successfully

## ☐ First Login
- [ ] Login page displays
- [ ] Login with username `admin` and your password
- [ ] Redirects to dashboard successfully
- [ ] Dashboard shows navigation

## ☐ Testing (Optional but Recommended)
- [ ] Create a new operator user (Dashboard → Users)
- [ ] Logout
- [ ] Login as operator
- [ ] Verify operator can't delete makam
- [ ] Verify operator can't access Users page

## ☐ Deployment (Optional)
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables added in Vercel
- [ ] Deployment successful
- [ ] Supabase redirect URLs updated with Vercel URL
- [ ] Production site tested

---

## Common Issues & Solutions

### ❌ "npm install" fails
**Solution**: 
```bash
rm -rf node_modules package-lock.json
npm install
```

### ❌ "Invalid login credentials"
**Solutions**:
1. Check username is exactly `admin` (lowercase)
2. Verify user exists in Supabase Authentication → Users
3. Check profile exists: `SELECT * FROM profiles WHERE username = 'admin';`
4. Verify email is `admin@tmp.internal` (not just `admin`)

### ❌ "RLS policy violation"
**Solutions**:
1. Check all RLS policies are enabled
2. Verify user has correct role in profiles table
3. Re-run database-schema.sql if policies are missing

### ❌ Page shows "Loading..." forever
**Solutions**:
1. Check browser console for errors
2. Verify .env.local has correct Supabase URL and key
3. Check Supabase project is not paused
4. Restart dev server

### ❌ Can't create users
**Solutions**:
1. Verify logged-in user has role 'master'
2. Check SQL: `SELECT * FROM profiles WHERE id = (SELECT id FROM auth.users LIMIT 1);`
3. Ensure you're logged in as admin/master

---

## Success Criteria

You've successfully set up the system when:
1. ✅ You can login with admin credentials
2. ✅ Dashboard loads with sidebar navigation
3. ✅ You can view makam list (even if empty)
4. ✅ You can create a new operator user
5. ✅ Operator user has limited permissions

---

## Need Help?

1. Check `IMPLEMENTATION_GUIDE.md` for detailed technical docs
2. Review `README.md` for comprehensive setup guide
3. Check Supabase logs for database errors
4. Check browser console for frontend errors
5. Check terminal for server errors

## Estimated Setup Time

- Supabase setup: 10 minutes
- Local setup: 5 minutes
- First user creation: 5 minutes
- Testing: 10 minutes
- **Total: ~30 minutes**
