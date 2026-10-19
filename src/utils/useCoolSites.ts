import { useFetch } from "@raycast/utils";
import { useMemo } from "react";
import { CoolSiteType, coolSiteSchema } from "./coolSiteTypesAndSchemas";

export function useCoolSites() {
  const { data, error, isLoading, revalidate } = useFetch<CoolSiteType[]>(
    "https://lucasvogel.click/api/cool-sites.json",
    {
      headers: { "content-type": "application/json" },
      parseResponse: async (response) => coolSiteSchema.array().parse(await response.json()),
      keepPreviousData: true,
    },
  );
  const coolSites = useMemo(
    () => Array.from(new Map<string, CoolSiteType>((data ?? []).map((site) => [site.id, site])).values()),
    [data],
  );
  const tags = useMemo(() => Array.from(new Set(coolSites.flatMap((site) => site.tags))).sort(), [coolSites]);

  return { coolSites, tags, isLoading, error, revalidate };
}
