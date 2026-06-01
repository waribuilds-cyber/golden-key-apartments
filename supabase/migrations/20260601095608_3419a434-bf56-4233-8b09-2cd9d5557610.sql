-- 1. Fix mutable search_path on trigger function
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- 2. Restrict has_role execution to signed-in users (used only by admin RLS policies)
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- 3. Remove broad public listing policy; public bucket still serves files via public URL
DROP POLICY IF EXISTS "Anyone can view site images" ON storage.objects;