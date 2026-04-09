export type GitHubRepo = {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  updated_at: string;
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  topics?: string[];
};

export type GitHubEvent = {
  id: string;
  type: string;
  created_at: string;
  repo?: { name: string };
  payload?: {
    commits?: { message: string; sha: string }[];
    action?: string;
  };
};
