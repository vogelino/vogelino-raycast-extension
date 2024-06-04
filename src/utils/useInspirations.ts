import { Toast, showToast } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { useEffect, useState } from "react";
import { InspirationType, inspirationSchema } from "./inspirationTypesAndSchemas";

export function useInspirations() {
  const { error, data } = useFetch("https://vogelino.com/api/inspirations.json", {
    headers: { "content-type": "application/json" },
  });
  const [tags, setTags] = useState<string[]>([]);
  const [inspirations, setInspirations] = useState<InspirationType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!data) return;
    try {
      const insps = inspirationSchema.array().parse(data);
      const tags = Array.from(new Set<string>(insps.flatMap((i) => i.tags)));
      setTags(tags);
      setInspirations(insps);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  error && showToast({ title: error.message, style: Toast.Style.Failure });

  return { inspirations, tags, isLoading };
}
