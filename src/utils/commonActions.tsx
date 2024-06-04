import { Action, ActionPanel, Icon } from '@raycast/api'

function CommonActions() {
  return (
    <ActionPanel.Section title="Common Actions">
      <Action.OpenInBrowser
        title="Show GitHub Actions"
        url="https://github.com/vogelino/vogelino/actions"
        icon={Icon.Cog}
        shortcut={{ modifiers: ["opt"], key: "a" }}
      />
      <Action.OpenInBrowser
        title="Show Vercel Deployments"
        url="https://vercel.com/vogelinos-projects/vogelino-portfolio/deployments"
        icon={Icon.Cloud}
        shortcut={{ modifiers: ["opt"], key: "v" }}
      />
    </ActionPanel.Section>
  )
}

export default CommonActions
