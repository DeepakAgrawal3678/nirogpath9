// Note: This is a placeholder since Git operations are not available in WebContainer
export function pushToGithub() {
  throw new Error(
    "Git operations are not supported in this environment. To push your changes to GitHub:\n\n" +
    "1. Click the 'Fork' button at the top of the page to create your own copy\n" +
    "2. Use the GitHub interface or clone the repository locally\n" +
    "3. Make your changes locally and push them using:\n" +
    "   git add .\n" +
    "   git commit -m 'your commit message'\n" +
    "   git push origin main"
  );
}