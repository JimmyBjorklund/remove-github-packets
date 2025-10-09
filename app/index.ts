/**
 * GitHub Package Cleanup Tool
 * 
 * Main application entry point that orchestrates the cleanup of GitHub container packages.
 * This tool removes untagged and old package versions while preserving important releases.
 * 
 * @author jimmy@precisiontech.se
 */

import { GitHubService } from "./github-service";
import { VersionResponseItem } from "./model/version";
import { Config } from "./model/config";
import * as fs from "fs";
import { exit } from "process";
import * as rls from 'readline-sync';

/** Configuration file path */
const configFileName = "./config.json"

/** Configuration object loaded from config.json */


// Validate configuration file exists
if( !fs.existsSync(configFileName)) {
  console.error("You need to copy the config-template.js to config.js and update it to match you environment");
  exit(1);
}

// Load and parse configuration
const t = fs.readFileSync(configFileName);
const config: Config = JSON.parse(t.toString());

// Extract configuration values with defaults
const token = config.token;
const ORG = config.ORG;
const removeUntagged = config.removeUntagged !== undefined ? config.removeUntagged : true;
const keepVersions = config.keepVersions !== undefined ? config.keepVersions : true;
const removeOlderItems = config.removeOlderItems !== undefined ? config.removeOlderItems : true;
const prefix = config.prefix !== undefined ? config.prefix : "";
// Display configuration and get user confirmation
console.log(`Starting packet search using settings: `)
console.log(`ORG:              ${ORG}`)
console.log(`removeUntagged:   ${removeUntagged}`)
console.log(`keepVersions:     ${keepVersions}`)
console.log(`removeOlderItems: ${removeOlderItems}`)
console.log(`prefix:           ${prefix}`)

const r = rls.question("Are you sure you want to proceed? (Y/n)")
if( r !== "Y" ) {
  exit(0);
}

/**
 * Determines if a package version should be deleted based on age and version tagging
 * 
 * @param f - The package version to evaluate
 * @param date - The cutoff date (versions older than this may be deleted)
 * @returns true if the version should be deleted, false if it should be preserved
 */
function filterOld( f: VersionResponseItem, date:Date) : boolean {
  // Don't delete if updated recently
  if( new Date(f.updated_at) >= date ) {
    return false;
  }
  
  // If keepVersions is enabled, preserve versions with semantic version tags
  if( keepVersions ) {
    if( f.metadata.container?.tags.find( t => { return t.startsWith("v")})) {
      return false;
    }
  }
  return true;
}

// Initialize GitHub service
const github = new GitHubService(token, ORG);

/**
 * Deletes old and untagged versions of a specific package
 * 
 * @param packet - The name of the package to clean up
 */
const del = async(packet:string) => {  
  let packets = await github.getPacketVersions(packet, 10000);
  
  // Remove untagged versions if enabled
  if( removeUntagged ) {
    const untagged = packets.filter( f => { return f.metadata.container?.tags.length === 0 });
    packets = packets.filter( f => { return f.metadata.container?.tags.length !== 0 }); 
    
    // Safety check: don't remove all versions
    if( packets.length === 0 ) {
      console.log(`Can not remove untaged as there is no tagged version ${packet}`);
      return;
    }
    
    // Delete each untagged version
    for( const p of untagged) {
      await github.deletePacketVersion(packet, p.id);
      console.log(`Deleted untagged version ${packet} ${p.name}`)
    }
  }
  
  // Remove old versions if enabled
  if( removeOlderItems ) {
    // Safety check: ensure we have at least one version-tagged release
    if ( packets.find( o => { return o.metadata.container?.tags.find( o2 => { return o2.startsWith("v")})}) === undefined ) {
      console.error("Can not delete old items as we have no tagged version?")
      return;
    }
    
    // Set cutoff date (30 days ago)
    const date = new Date();
    date.setDate(date.getDate() - 30);
    
    // Filter old packages for deletion
    const oldPackets = packets.filter( f => { return filterOld(f, date) })
    
    // Delete each old version
    for( const p of oldPackets) {
      await github.deletePacketVersion(packet, p.id);
      console.log(`Deleted old version ${packet} ${p.name}`)
    }
  }
}

/**
 * Main execution function - scans all packages and processes matching ones
 */
const start = async() => {
  const packets = await github.getPackets(1000);  
  
  for( const p of packets ) {
    console.log(`Scanning ${p.name}`);
    
    // TODO: Customize this filter logic based on your needs
    // Currently only processes packages starting with config.prefix
    if ( p.name.startsWith(prefix) ) {
      await del(p.name);
    }    
  }
}

// Start the cleanup process
start();
