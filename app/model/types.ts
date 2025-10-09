/**
 * Shared type definitions for GitHub Packages
 */

/**
 * Enumeration of supported GitHub package types
 */
export enum PacketType {
  npm = "npm",
  maven = "maven",
  rubygems = "rubygems",
  docker = "docker",
  nuget = "nuget",
  container = "container"
}