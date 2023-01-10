# remove-github-packets
This project looks thru all your github packages and deletes all old and untagged packets.

In order to run you need to copy the config-template.json to config.json and update the 
config to match your need.

      cp config-template.json config.json

### Settings:
|                  |                                                                                                       |
-------------------|:------------------------------------------------------------------------------------------------------|
| token            | This is the github access token needed to access the account. Note that this need packet read and delete access.            |
| ORG              | This is your github organization or private github name (The part after https://github.com/<ORG>). |
| removeUntagged   | Set to true if you want to remove all untagged items. |
| removeOlderItems | Set to true if you want to remove all items that are older then 1 mounts. |
| keepVersions     | Set to true if you want to save all packets that have a tag starting with v e.g v1.0. 0 and so on. |

