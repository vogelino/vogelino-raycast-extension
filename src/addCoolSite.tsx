import { Action, ActionPanel, Form, Icon, Keyboard, Toast, showToast, useNavigation } from "@raycast/api";
import { useEffect, useState } from "react";
import ListCoolSitesCommand from "./index";
import { addCoolSite } from "./utils/addCoolSite";
import CommonActions from "./utils/commonActions";
import { CoolSiteInsertType, coolSiteInsertSchema } from "./utils/coolSiteTypesAndSchemas";
import { getArcTabUrlAndTitle } from "./utils/getArcTabUrlAndTitle";
import { useCoolSites } from "./utils/useCoolSites";

export default function Command() {
  const { tags } = useCoolSites();
  const { pop } = useNavigation();
  const [url, setUrl] = useState<string>("");
  const [name, setName] = useState<string>("");

  useEffect(() => {
    getArcTabUrlAndTitle()
      .then(({ tabURL, tabTitle }) => {
        if (tabURL) setUrl(tabURL);
        if (tabTitle) setName(tabTitle);
      })
      .catch(() => {
        // Arc is optional; leave the fields empty when it is unavailable.
      });
  }, []);

  async function handleSubmit(values: CoolSiteInsertType) {
    const parsedValues = coolSiteInsertSchema.safeParse(values);
    if (!parsedValues.success) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Could Not Add Cool Site",
        message: parsedValues.error.issues[0]?.message,
      });
      return;
    }

    const toast = await showToast({
      style: Toast.Style.Animated,
      title: `Adding ${parsedValues.data.name}`,
    });

    try {
      await addCoolSite(parsedValues.data);
      toast.style = Toast.Style.Success;
      toast.title = `Added ${parsedValues.data.name}`;
      pop();
    } catch (error) {
      toast.style = Toast.Style.Failure;
      toast.title = `Could Not Add ${parsedValues.data.name}`;
      toast.message = error instanceof Error ? error.message : String(error);
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Add Cool Site" onSubmit={handleSubmit} icon={Icon.Plus} />
          <Action.Push
            title="See All Cool Sites"
            icon={Icon.List}
            shortcut={Keyboard.Shortcut.Common.Open}
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
