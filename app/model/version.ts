/**
 * GitHub Package Version Data Models
 * 
 * Type definitions for GitHub package version API responses
 */

import { PacketType } from "./types";

/**
 * Represents a single version of a GitHub package
 * Based on GitHub Packages API response structure
 */
export interface VersionResponseItem {
  /** Unique identifier of the package version */
  id: number
  /** The name of the package version */
  name: string
  /** API URL for this version */
  url: string
  /** HTML URL for the package */
  package_html_url: string;
  /** HTML URL for this specific version (optional) */
  html_url?: string;
  /** License information (optional) */
  license?: string;
  /** Version description (optional) */
  description?: string;
  /** ISO timestamp when version was created */
  created_at: string; // "2011-04-10T20:09:31Z"
  /** ISO timestamp when version was last updated */
  updated_at: string;  // "2014-03-03T18:58:10Z"
  /** ISO timestamp when version was deleted (optional) */
  deleted_at?: string;
  /** Package metadata including tags and type information */
  metadata: {
    /** The type of package (container, npm, etc.) */
    package_type: PacketType;
    /** Container-specific metadata (for container packages) */
    container?: {
      /** Array of tags associated with this version */
      tags: string[];
    },
    /** Docker-specific metadata (for docker packages) */
    docker?: {
      /** Array of tags associated with this version */
      tag: string[];
    }
  }
}