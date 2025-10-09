/**
 * GitHub Package Data Models
 * 
 * Type definitions for GitHub package API responses including user and package information
 */

import { PacketType } from "./types";

/**
 * Represents GitHub user information
 * Used for package owners and repository owners
 */
export interface UserInfo {
  /** User's display name (optional) */
  name?: string,
  /** User's email address (optional) */
  email?: string;
  /** GitHub username/login */
  login: string;
  /** Unique user ID */
  id: number;
  /** Node ID for GraphQL API */
  node_id: string;
  /** Avatar image URL */
  avatar_url: string;
  /** Gravatar ID (optional, usually null) */
  gravatar_id?: string;
  /** API URL for user */
  url: string;
  /** HTML profile URL */
  html_url: string;
  /** API URL for user's followers */
  followers_url: string;
  /** API URL for users this user follows */
  following_url: string;
  /** API URL for user's gists */
  gists_url: string;
  /** API URL for user's starred repositories */
  starred_url: string;
  /** API URL for user's subscriptions */
  subscriptions_url: string;
  /** API URL for user's organizations */
  organizations_url: string;
  /** API URL for user's repositories */
  repos_url: string;
  /** API URL for user's events */
  events_url: string;
  /** API URL for events received by user */
  received_events_url: string;
  /** User type (User, Organization, etc.) */
  type: string;
  /** Whether user is a site administrator */
  site_admin: boolean;
  /** ISO timestamp when starred (optional) */
  starred_at: string;

}

/**
 * Represents a GitHub package
 * Based on GitHub Packages API response structure
 */
export interface PacketResponseItem {
  /** Unique identifier of the package */
  id: number;
  /** The name of the package */
  name: string;
  /** Type of package (container, npm, etc.) */
  package_type: PacketType;
  /** API URL for this package */
  url: string;
  /** HTML URL for viewing the package */
  html_url: string;
  /** The number of versions of the package */
  version_count: number;
  /** Package visibility setting */
  visibility: "private" | "public" | "internal";
  /** Package owner information (optional) */
  owner?: UserInfo;
  /** ISO timestamp when package was created */
  created_at: string;
  /** ISO timestamp when package was last updated */
  updated_at: string;
  /** Associated repository information (optional) */
  repository?: {
    /** Repository ID */
    id: number;
    /** Node ID for GraphQL API */
    node_id: string;
    /** Repository name */
    name: string;
    /** Full repository name (owner/repo) */
    full_name: string;
    /** Repository owner information */
    owner: UserInfo;
    /** Whether repository is private */
    private: boolean;
    /** HTML URL for repository */
    html_url: string;
    /** Repository description */
    description?: string | null;
    /** Whether repository is a fork */
    fork: boolean;
    /** API URL for repository */
    url: string;
    /** Archive URL template */
    archive_url: string;
    /** Assignees URL template */
    assignees_url: string;
    /** Blobs URL template */
    blobs_url: string;
    branches_url: string;
    collaborators_url: string;
    comments_url: string;
    commits_url: string;
    compare_url: string;
    contents_url: string;
    contributors_url: string;
    deployments_url: string;
    downloads_url: string;
    events_url: string;
    forks_url: string;
    git_commits_url: string;
    git_refs_url: string;
    git_tags_url: string;
    git_url: string;
    issue_comment_url: string;
    issue_events_url: string;
    issues_url: string;
    keys_url: string;
    labels_url: string;
    languages_url: string;
    merges_url: string;
    milestones_url: string;
    notifications_url: string;
    pulls_url: string;
    releases_url: string;
    ssh_url: string;
    stargazers_url: string;
    statuses_url: string;
    subscribers_url: string;
    subscription_url: string;
    tags_url: string;
    teams_url: string;
    trees_url: string;
    clone_url: string;
    mirror_url: string | null;
    hooks_url: string;
    svn_url: string;
    homepage: string | null;
    language: string | null;
    forks_count: number;
    stargazers_count: number;
    watchers_count: number;
    size: number;
    default_branch: string;
    open_issues_count: number;
    is_template: boolean;
    topics: string[];
    has_issues: boolean;
    has_projects: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_downloads: boolean;
    has_discussions: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: string;
    pushed_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    permissions: {
      admin: boolean;
      maintain: boolean;
      push: boolean;
      triage: boolean;
      pull: boolean;
    },
    role_name: string;
    temp_clone_token: string;
    delete_branch_on_merge: boolean;
    subscribers_count: number;
    network_count: number;
    code_of_conduct: {
      key: string;
      name: string;
      url: string;
      body?: string;
      html_url: string | null;
    }
  },
  license?: {
    key: string;
    name: string;
    spdx_id: string;
    url: string;
    node_id: string;
  },
  forks?: number;
  open_issues?: number;
  watchers?: number;
  allow_forking?: boolean;
  web_commit_signoff_required?: boolean;
  security_and_analysis?: {
    advanced_security: {
      status: "enabled" | "disabled"
    }
    secret_scanning: {
      status: "enabled" | "disabled"
    },
    secret_scanning_push_protection: {
      status: "enabled" | "disabled"
    }
  }
}
    