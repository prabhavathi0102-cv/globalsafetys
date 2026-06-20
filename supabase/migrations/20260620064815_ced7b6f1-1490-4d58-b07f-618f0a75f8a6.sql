
-- Lock down user_roles: block all client writes (only service_role bypasses RLS)
CREATE POLICY "Block client inserts on user_roles" ON public.user_roles
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Block client updates on user_roles" ON public.user_roles
  FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block client deletes on user_roles" ON public.user_roles
  FOR DELETE TO anon, authenticated USING (false);

-- Lock down payments: block all client writes. Server functions use service_role.
CREATE POLICY "Block client inserts on payments" ON public.payments
  FOR INSERT TO anon, authenticated WITH CHECK (false);
CREATE POLICY "Block client updates on payments" ON public.payments
  FOR UPDATE TO anon, authenticated USING (false) WITH CHECK (false);
CREATE POLICY "Block client deletes on payments" ON public.payments
  FOR DELETE TO anon, authenticated USING (false);

-- Revoke public/anon EXECUTE on SECURITY DEFINER has_role; keep authenticated
-- (required for RLS policy evaluation by signed-in users).
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO authenticated, service_role;
