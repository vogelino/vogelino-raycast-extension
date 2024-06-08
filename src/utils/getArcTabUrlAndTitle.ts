import { exec } from "child_process";

export function getArcTabUrlAndTitle(): Promise<{ tabURL: string; tabTitle: string }> {
  return new Promise((resolve, reject) => {
    exec(
      "osascript -e 'tell application \"Arc\" to set {tabURL, tabTitle} to {URL, title} of active tab of front window'",
      (error, stdout) => {
        if (error) return reject(error);
        const [tabURL, tabTitle] = stdout.trim().split(",");
        return resolve({ tabURL, tabTitle });
      },
    );
  });
}
