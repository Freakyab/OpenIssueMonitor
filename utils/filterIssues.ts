import { FormatIssue, SortedIssue } from "./../types/issues";
import convertGithubApiUrlToRegularUrl from "./utils";

const filterIssues = (
  formatIssue: FormatIssue[],
  labels: Map<String, Boolean>
) => {
  // ? go to every issue and check if the
  // ? label is in the map and if the map : true its consist then save it in a return new array

  let formattedIssues: SortedIssue[] = [];
  for (let i = 0; i < formatIssue.length; i++) {
    const issue = formatIssue[i];
    const issueLabels = issue.label;
    for (let j = 0; j < issueLabels.length; j++) {
      const indiviualLabel = issueLabels[j].name;
      if (labels.has(indiviualLabel) && labels.get(indiviualLabel) === true) {
        const githubIssueUrl = convertGithubApiUrlToRegularUrl(issue.url);

        const sortedIssue: SortedIssue = {
          url: githubIssueUrl,
          label: [indiviualLabel],
          title: issue.title,
          created_at: issue.created_at,
          updatedAt: issue.updatedAt,
        };
        formattedIssues.push(sortedIssue);
        break;
      }
    }
  }

  return formattedIssues;
};

export default filterIssues;
