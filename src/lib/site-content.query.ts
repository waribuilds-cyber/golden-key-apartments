import { queryOptions } from "@tanstack/react-query";
import { getSiteContent } from "./content.functions";

export const siteContentQueryOptions = queryOptions({
  queryKey: ["site-content"],
  queryFn: () => getSiteContent(),
  staleTime: 60_000,
});
