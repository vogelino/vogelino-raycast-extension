import { ActionPanel, Grid } from "@raycast/api";
import dotenv from "dotenv";
import { useState } from "react";
import CommonActions from "./utils/commonActions";
import ItemActions from "./utils/itemActions";
import { useCoolSites } from "./utils/useCoolSites";
dotenv.config();

export default function Command() {
  const { coolSites, tags, isLoading } = useCoolSites();
  const [tag, setTag] = useState<string | null>(null);
  return (
    <Grid
      isLoading={isLoading}
      navigationTitle="Cool sites"
      searchBarPlaceholder="Search for a cool site"
      aspectRatio="16/9"
      fit={Grid.Fit.Fill}
      columns={4}
      searchBarAccessory={
        <Grid.Dropdown tooltip="Filter by tag" onChange={(newValue) => setTag(newValue || null)} value={tag || ""}>
          <Grid.Dropdown.Item title="All tags" value={""} />
          {tags.map((tag) => (
            <Grid.Dropdown.Item key={tag} title={tag} value={tag} />
          ))}
        </Grid.Dropdown>
      }
    >
      {coolSites
        ?.filter((item) => (!tag ? true : item.tags.includes(tag)))
        .map((item) => (
          <Grid.Item
            key={item.id}
            // icon={item.favicon || `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=24&url=${item.url}`}
            title={item.title}
            content={{
              source:
                item.favicon ||
                `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=24&url=${item.url}`,
              value: item.thumbnail || "",
              tooltip: item.tags.join(", "),
            }}
            subtitle={new URL(item.url).hostname}
            accessory={{
              icon:
                item.favicon ||
                `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=24&url=${item.url}`,
            }}
            actions={
              <ActionPanel>
                <ItemActions item={item} />
                <CommonActions />
              </ActionPanel>
            }
            id={item.id}
            keywords={item.tags}

            // accessories={item.tags.map((tag) => ({ text: tag, tag: tag }))}
            // detail={item.url}
          />
        ))}
    </Grid>
  );
}
