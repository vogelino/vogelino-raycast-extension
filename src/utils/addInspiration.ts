import { getPreferenceValues } from "@raycast/api";
import axios from "axios";
import { InspirationInsertType } from "./inspirationTypesAndSchemas";

const { githubAuthToken } = getPreferenceValues<Preferences>();

export async function addInspiration(values: InspirationInsertType) {
  return axios.post(
    "https://api.github.com/repos/vogelino/vogelino/dispatches",
    {
      event_type: "update-inspirations",
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
