import { Action, ActionPanel, Icon } from "@raycast/api";
import AddCoolSiteCommand from "../addCoolSite";
import ViewCoolSite from "../viewCoolSite";
import { CoolSiteType } from "./coolSiteTypesAndSchemas";

function ItemActions({
  item,
  showAddCoolSiteCommand = true,
  showViewCoolSiteCommand = true,
}: {
  item: CoolSiteType;
  showViewCoolSiteCommand?: boolean;
  showAddCoolSiteCommand?: boolean;
}) {
  return (
    <ActionPanel.Section title="Item Actions">
      {showViewCoolSiteCommand && (
        <Action.Push title="View Cool Site" icon={{ source: Icon.Eye }} target={<ViewCoolSite {...item} />} />
      )}
      {showAddCoolSiteCommand && (
        <Action.Push
          title="Add Cool Site"
          icon={{ source: Icon.Plus }}
          shortcut={{ modifiers: ["cmd"], key: "n" }}
          target={<AddCoolSiteCommand />}
        />
      )}
      <Action.OpenInBrowser url={item.url} title="Open External Link" shortcut={{ modifiers: ["opt"], key: "enter" }} />
      <Action.CopyToClipboard
        title="Copy External Link"
        content={item.url}
        shortcut={{ modifiers: ["opt", "shift"], key: "enter" }}
      />
      <Action.OpenInBrowser
        url={`https://lucasvogel.click/cool-sites/${item.id}`}
        title="Open in Portfolio"
        icon={`https://lucasvogel.click/favicon-32x32.png`}
        shortcut={{ modifiers: ["shift"], key: "enter" }}
      />
      <Action.CopyToClipboard
        title="Copy Portfolio Link"
        content={`https://lucasvogel.click/cool-sites/${item.id}`}
        icon={{
          source: Icon.CopyClipboard,
          tintColor: "#E30001",
        }}
        shortcut={{ modifiers: ["cmd", "shift"], key: "enter" }}
      />
    </ActionPanel.Section>
  );
}

export default ItemActions;
