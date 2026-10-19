import { getPreferenceValues } from "@raycast/api";
import { CoolSiteInsertType } from "./coolSiteTypesAndSchemas";

export async function addCoolSite(values: CoolSiteInsertType) {
  const { githubAuthToken } = getPreferenceValues<Preferences>();
  const response = await fetch("https://api.github.com/repos/vogelino/vogelino-portfolio/dispatches", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${githubAuthToken}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json",
      "X-GitHub-Api-Version": "2022-11-28",
    },
    body: JSON.stringify({
      event_type: "update-cool-site",
      client_payload: values,
    }),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `GitHub returned ${response.status} ${response.statusText}`);
  }
}
