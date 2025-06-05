import { getPreferenceValues } from "@raycast/api";
import axios from "axios";
import { CoolSiteInsertType } from "./coolSiteTypesAndSchemas";

const { githubAuthToken } = getPreferenceValues<Preferences>();

export async function addCoolSite(values: CoolSiteInsertType) {
  return axios.post(
    "https://api.github.com/repos/vogelino/vogelino-portfolio/dispatches",
    {
      event_type: "update-cool-site",
      client_payload: values,
    },
    {
      headers: {
        Authorization: `Bearer ${githubAuthToken}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
    },
  );
}
