import { useEffect, useState } from "react";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getAdminStatus } from "@/lib/admin.functions";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const navigate = useNavigate();
  const checkAdmin = useServerFn(getAdminStatus);
  const [state, setState] = useState<"checking" | "ok">("checking");

  useEffect(() => {
    let active = true;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!active) return;
      if (error || !data.user) {
        navigate({ to: "/login", replace: true });
        return;
      }
      try {
        const { isAdmin } = await checkAdmin();
        if (!active) return;
        if (!isAdmin) {
          await supabase.auth.signOut();
          navigate({ to: "/login", replace: true });
          return;
        }
        setState("ok");
      } catch {
        if (active) navigate({ to: "/login", replace: true });
      }
    })();
    return () => {
      active = false;
    };
  }, [navigate, checkAdmin]);

  if (state === "checking") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return <Outlet />;
}
