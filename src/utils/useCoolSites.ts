import { Toast, showToast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { CoolSiteType, coolSiteSchema } from "./coolSiteTypesAndSchemas";

export function useCoolSites() {
  const { error, data } = useFetch("https://vogelino.com/api/cool-sites.json", {
    headers: { "content-type": "application/json" },
  });
  const [tags, setTags] = useState<string[]>([]);
  const [coolSites, setCoolSites] = useState<CoolSiteType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!data) return;
    try {
      const insps = Array.from(
        coolSiteSchema
          .array()
          .parse(data)
          .reduce((acc, insp) => {
            acc.set(insp.id, insp);
            return acc;
          }, new Map<string, CoolSiteType>())
          .values(),
      );
      const tags = Array.from(new Set<string>(insps.flatMap((i) => i.tags)));
      setTags(tags);
      setCoolSites(insps);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  error && showToast({ title: error.message, style: Toast.Style.Failure });

  return { coolSites, tags, isLoading };
}
