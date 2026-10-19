import { runAppleScript } from "@raycast/utils";

export async function getArcTabUrlAndTitle(): Promise<{ tabURL: string; tabTitle: string }> {
  const output = await runAppleScript(`
    if application "Arc" is not running then return ""

    tell application "Arc"
      set activeTab to active tab of front window
      return (URL of activeTab) & linefeed & (title of activeTab)
    end tell
  `);
  const [tabURL = "", ...titleParts] = output.trim().split("\n");

  return { tabURL: tabURL.trim(), tabTitle: titleParts.join("\n").trim() };
}
