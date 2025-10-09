/**
 * GitHub API Service
 * 
 * Provides methods for interacting with GitHub's Packages API to manage container packages.
 * Handles authentication and API communication for package listing and deletion operations.
 */

import axios, { AxiosRequestConfig } from "axios";
import { PacketResponseItem } from "./model/packet";
import { VersionResponseItem } from "./model/version";

/**
 * Service class for GitHub Packages API operations
 */
export class GitHubService {
  /**
   * Creates a new GitHubService instance
   * 
   * @param token - GitHub Personal Access Token with package permissions
   * @param ORG - GitHub organization or username
   */
  constructor(private token:string, private ORG: string) {

  }

  /**
   * Retrieves all container packages for the organization
   * 
   * @param max - Maximum number of packages to retrieve (optional)
   * @returns Promise that resolves to an array of package items
   */
  public getPackets = async(max?:number):Promise<PacketResponseItem[]> => {
    const options:AxiosRequestConfig = {
      headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${this.token}`,
          "X-GitHub-Api-Version": '2022-11-28'
      }
    }
    let url = `https://api.github.com/orgs/${this.ORG}/packages?package_type=container`;
    if( max ) {
      url += `&per_page=${max}`;
    }
    return axios.get(url, options).then(res => {
      return res.data;
    })
  }

  /**
   * Retrieves all versions of a specific package
   * 
   * @param packet - The name of the package
   * @param max - Maximum number of versions to retrieve (optional)
   * @returns Promise that resolves to an array of package version items
   */
  public getPacketVersions = async(packet:string, max?:number) : Promise<VersionResponseItem[]> => {
    const options:AxiosRequestConfig = {
      headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${this.token}`,
          "X-GitHub-Api-Version": '2022-11-28'
      }
    }
    let url = `https://api.github.com/orgs/${this.ORG}/packages/container/${packet}/versions`;
    if( max ) {
      url += `?per_page=${max}`;
    }
    return axios.get(url, options).then(res => {
      return res.data;
    })
  }

  /**
   * Deletes a specific version of a package
   * 
   * @param packet - The name of the package
   * @param versionId - The ID of the version to delete
   * @returns Promise that resolves when the deletion is complete
   */
  public deletePacketVersion = async(packet: string, versionId: number): Promise<void> => {
    const options:AxiosRequestConfig = {
      headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${this.token}`,
          "X-GitHub-Api-Version": '2022-11-28'
      }
    }
    let url = `https://api.github.com/orgs/${this.ORG}/packages/container/${packet}/versions/${versionId}`;
    return axios.delete(url, options).then((res) => {
      return;
    })
  }
}