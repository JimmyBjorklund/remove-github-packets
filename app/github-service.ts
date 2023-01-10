import axios, { AxiosRequestConfig } from "axios";
import { PacketResponseItem } from "./model/packet";
import { VersionResponseItem } from "./model/version";

export class GitHubService {
  constructor(private token:string, private ORG: string) {

  }
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