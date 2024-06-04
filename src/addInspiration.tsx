import { Action, ActionPanel, Form, Icon, Toast, showToast } from "@raycast/api";
import dotenv from "dotenv";
import ListInspirationsCommand from "./index";
import { addInspiration } from "./utils/addInspiration";
import CommonActions from "./utils/commonActions";
import { InspirationInsertType, inspirationInsertSchema } from "./utils/inspirationTypesAndSchemas";
import { useInspirations } from "./utils/useInspirations";
dotenv.config();

export default function Command() {
  const { tags } = useInspirations();
  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm onSubmit={handleSubmit} icon={Icon.Check} />
          <Action.Push
            title="See All Inspirations"
            icon={Icon.List}
            shortcut={{ modifiers: ["cmd"], key: "l" }}
            target={<ListInspirationsCommand />}
          />
          <CommonActions />
        </ActionPanel>
      }
    >
      <Form.TextField id="name" title="Name" placeholder="Enter the inspiration name" />
      <Form.TextField id="url" title="URL" placeholder="Enter the inspiration URL" />
      <Form.TagPicker id="tags" title="Tags" placeholder="Enter the inspiration tags">
        {tags.map((tag) => (
          <Form.TagPicker.Item key={tag} value={tag} title={tag} />
        ))}
      </Form.TagPicker>
    </Form>
  );
}

async function handleSubmit(values: InspirationInsertType) {
  const parsedValues = inspirationInsertSchema.parse(values);

  const toast = await showToast({
    style: Toast.Style.Animated,
    title: `Adding inspiration: ${parsedValues.name}`,
  });
  try {
    const response = await addInspiration(parsedValues);

    if (response.status !== 204) {
      toast.style = Toast.Style.Failure;
      toast.title = `Failed to add inspiration: ${parsedValues.name}`;
      toast.message = response.statusText;
    }

    showToast({ title: `Inspiration added: ${parsedValues.name}` });
    toast.style = Toast.Style.Success;
    toast.title = `Inspiration added: ${parsedValues.name}`;
  } catch (error) {
    console.error(error);
    toast.style = Toast.Style.Failure;
    toast.title = `Failed to add inspiration: ${parsedValues.name}`;
    toast.message = (error as Error).message;
  }
}
