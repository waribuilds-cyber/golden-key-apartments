import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

/**
 * Bootstrap: grants the current signed-in user the `admin` role, but only if
 * no admin exists yet. After the first admin is claimed, this refuses.
 */
export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;

    const { count, error: countError } = await supabaseAdmin
      .from("user_roles")
      .select("*", { count: "exact", head: true })
      .eq("role", "admin");

    if (countError) throw new Error(countError.message);

    if ((count ?? 0) > 0) {
      // An admin already exists — check whether it's this user.
      const { data: own } = await supabaseAdmin
        .from("user_roles")
        .select("id")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      return { isAdmin: !!own, claimed: false };
    }

    const { error: insertError } = await supabaseAdmin
      .from("user_roles")
      .insert({ user_id: userId, role: "admin" });

    if (insertError) throw new Error(insertError.message);

    return { isAdmin: true, claimed: true };
  });