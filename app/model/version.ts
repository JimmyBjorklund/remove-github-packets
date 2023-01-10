import { PacketType } from "./types";

export interface VersionResponseItem {
  id: number // "Unique identifier of the package version.",
  name: string // "The name of the package version.",
  url: string
  package_html_url: string;
  html_url?: string;
  license?: string;
  description?: string;
  created_at: string; // "2011-04-10T20:09:31Z"
  updated_at: string;  // "2014-03-03T18:58:10Z"
  deleted_at?: string;
  metadata: {
    package_type: PacketType;
    container?: {
      tags: string[];
    },
    docker?: {
      tag: string[];
    }
  }
}