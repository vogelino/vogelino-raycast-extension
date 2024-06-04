import { ActionPanel, Detail } from "@raycast/api";
import CommonActions from "./utils/commonActions";
import { InspirationType } from "./utils/inspirationTypesAndSchemas";
import ItemActions from "./utils/itemActions";

function ViewInspiration(item: InspirationType) {
  const url = new URL(item.url);
  return (
    <Detail
      markdown={`<img src="${item.thumbnail}" width="560" />`}
      actions={
        <ActionPanel>
          <ItemActions item={item} showViewInspirationCommand={false} />
          <CommonActions />
        </ActionPanel>
      }
      metadata={
        <Detail.Metadata>
          <Detail.Metadata.Label title="Name" text={item.title} icon={item.favicon || `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&size=24&url=${item.url}`} />
          <Detail.Metadata.Separator />
          <Detail.Metadata.Link
            title="External Link"
            text={`${url.hostname.replace(/^(www\.)?/, "")}${url.pathname.replace(/\/$/, "")}`}
            target={item.url}
          />
          <Detail.Metadata.Link
            title="Portfolio Link"
            text={`${item.id}`}
            target="https://vogelino.com/inspirations"
          />
          <Detail.Metadata.Separator />
          <Detail.Metadata.TagList title="Tags">
            {item.tags.map((tag) => (
              <Detail.Metadata.TagList.Item key={tag} text={tag} />
            ))}
          </Detail.Metadata.TagList>
        </Detail.Metadata>
      }
    />
  );
}

export default ViewInspiration;
