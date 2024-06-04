import { Action, ActionPanel, Icon } from "@raycast/api";
import AddInspirationCommand from "../addInspiration";
import ViewInspiration from "../viewInspiration";
import { InspirationType } from "./inspirationTypesAndSchemas";

function ItemActions({
  item,
  showAddInspirationCommand = true,
  showViewInspirationCommand = true,
}: {
  item: InspirationType;
  showViewInspirationCommand?: boolean;
  showAddInspirationCommand?: boolean;
}) {
  return (
    <ActionPanel.Section title="Item Actions">
      {showViewInspirationCommand && (
        <Action.Push
          title="View Cool Site"
          icon={{ source: Icon.Eye }}
          target={<ViewInspiration {...item} />}
        />
      )}
      {showAddInspirationCommand && (
        <Action.Push
          title="Add Cool Site"
          icon={{ source: Icon.Plus }}
          shortcut={{ modifiers: ["cmd"], key: "n" }}
          target={<AddInspirationCommand />}
        />
      )}
      <Action.OpenInBrowser url={item.url} title="Open External Link" shortcut={{ modifiers: ["opt"], key: "enter" }} />
      <Action.CopyToClipboard title="Copy External Link" content={item.url} shortcut={{ modifiers: ["opt", "shift"], key: "enter" }} />
      <Action.OpenInBrowser
        url={`https://vogelino.com/inspirations/${item.id}`}
        title="Open in Portfolio"
        icon={`https://vogelino.com/favicon-32x32.png`}
        shortcut={{ modifiers: ["shift"], key: "enter" }}
      />
      <Action.CopyToClipboard
        title="Copy Portfolio Link"
        content={`https://vogelino.com/inspirations/${item.id}`}
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
