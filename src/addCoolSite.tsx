import { Action, ActionPanel, Form, Icon, Toast, showToast } from "@raycast/api";
import dotenv from "dotenv";
import { useEffect, useState } from "react";
import ListCoolSitesCommand from "./index";
import { addCoolSite } from "./utils/addCoolSite";
import CommonActions from "./utils/commonActions";
import { CoolSiteInsertType, coolSiteInsertSchema } from "./utils/coolSiteTypesAndSchemas";
import { getArcTabUrlAndTitle } from "./utils/getArcTabUrlAndTitle";
import { useCoolSites } from "./utils/useCoolSites";
dotenv.config();

export default function Command() {
  const { tags } = useCoolSites();
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    getArcTabUrlAndTitle().then(({ tabURL, tabTitle }) => {
      if (tabURL) setUrl(tabURL);
      if (tabTitle) setName(tabTitle);
    });
  }, []);

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} icon={Icon.Check} />
          <Action.Push
            title="See All Cool Sites"
            icon={Icon.List}
            shortcut={{ modifiers: ["cmd"], key: "l" }}
            target={<ListCoolSitesCommand />}
          />
          <CommonActions />
        </ActionPanel>
      }
    >
      <Form.TextField
        id="name"
        title="Name"
        placeholder="Enter the Cool Site Name"
        value={name}
        onChange={(value) => setName(value)}
      />
      <Form.TextField
        id="url"
        title="URL"
        placeholder="Enter the Cool Site URL"
        value={url}
        onChange={(value) => setUrl(value)}
      />
      <Form.TagPicker id="tags" title="Tags" placeholder="Enter the Cool Site Tags">
        {tags.map((tag) => (
          <Form.TagPicker.Item key={tag} value={tag} title={tag} />
        ))}
      </Form.TagPicker>
    </Form>
  );
}

async function handleSubmit(values: CoolSiteInsertType) {
  const parsedValues = coolSiteInsertSchema.parse(values);

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: `Adding Cool Site: ${parsedValues.name}`,
  });
  try {
    const response = await addCoolSite(parsedValues);

    if (response.status !== 204) {
      toast.style = Toast.Style.Failure;
      toast.title = `Failed to Add Cool Site: ${parsedValues.name}`;
      toast.message = response.statusText;
    }

    showToast({ title: `Cool Site Added: ${parsedValues.name}` });
    toast.style = Toast.Style.Success;
    toast.title = `Cool Site Added: ${parsedValues.name}`;
  } catch (error) {
    console.error(error);
    toast.style = Toast.Style.Failure;
    toast.title = `Failed to Add Cool Site: ${parsedValues.name}`;
    toast.message = (error as Error).message;
  }
}
