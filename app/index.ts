import { GitHubService } from "./github-service";
import { VersionResponseItem } from "./model/version";
import * as fs from "fs";
import { exit } from "process";
import * as rls from 'readline-sync';

const configFileName = "./config.json"

let config:any = undefined;

if( !fs.existsSync(configFileName)) {
  console.error("You need to copy the config-template.js to config.js and update it to match you environment");
  exit(1);
}
const t = fs.readFileSync(configFileName);
config = JSON.parse(t.toString());

const token = config.token;
const ORG = config.ORG;
const removeUntagged = config.removeUntagged !== undefined ? config.removeUntagged : true;
const keepVersions = config.keepVersions !== undefined ? config.keepVersions : true;
const removeOlderItems = config.removeOlderItems !== undefined ? config.removeOlderItems : true;
console.log(`Starting packet search using settings: `)
console.log(`ORG:              ${ORG}`)
console.log(`removeUntagged:   ${removeUntagged}`)
console.log(`keepVersions:     ${keepVersions}`)
console.log(`removeOlderItems: ${removeOlderItems}`)

const r = rls.question("Are you sure you want to proceed? (Y/n)")
if( r !== "Y" ) {
  exit(0);
}
function filterOld( f: VersionResponseItem, date:Date) : boolean {
  if( new Date(f.updated_at) >= date ) {
    return false;
  }
  if( keepVersions ) {
    if( f.metadata.container?.tags.find( t => { return t.startsWith("v")})) {
      return false;
    }
  }
  return true;
}

const github = new GitHubService(token, ORG);
const del = async(packet:string) => {  
  let packets = await github.getPacketVersions(packet, 10000);
  if( removeUntagged ) {
    const untagged = packets.filter( f => { return f.metadata.container?.tags.length === 0 })    
    for( const p of untagged) {
      await github.deletePacketVersion(packet, p.id);
      console.log(`Deleted untagged version ${packet} ${p.name}`)
    }
    packets = packets.filter( f => { return f.metadata.container?.tags.length !== 0 });
  }
  if( removeOlderItems ) {
    if ( packets.find( o => { return o.metadata.container?.tags.find( o2 => { return o2.startsWith("v")})}) === undefined ) {
      console.error("Can not delete old items as we have no tagged version?")
      return;
    }
    const date = new Date();
    date.setDate(date.getDate() - 30);
    const oldPackets = packets.filter( f => { return filterOld(f, date) })
    for( const p of oldPackets) {
      await github.deletePacketVersion(packet, p.id);
      console.log(`Deleted old version ${packet} ${p.name}`)
    }
  }
  //console.log(packets);
}
const start = async() => {
  const packets = await github.getPackets(1000);  
  for( const p of packets ) {
    console.log(`Scanning ${p.name}`);
    await del(p.name);
  }
}
//del(p);
start();
