// Steam Chat Logger - Bot built by Refloow (-MajokingGames)

/* 
  Here is contact info: refloowlibrarycontact@gmail.com
  or main dev steam: https://steamcommunity.com/id/MajokingGames/

 */


// We strongly recommend not editing stuff that is in this file.

 // Checking if all modules are correctly installed

try {
    // Checking if module colors is correctly installed
    colors = require('colors');
    // Checking if module moment is correctly installed
    moment = require('moment');
} catch (ex) {
    // If modules are not installed showing an clear error message to user.
    console.log('| [Modules] |: Missing dependencies. Install a version with dependecies or use npm install.');
    console.log(ex);
    process.exit(1);
}

// Importing files
const package = require('./../package.json');
const config = require('../Settings/config.js');

// Exporting method module
t = module.exports = {

    // Method for siabling messages
    DisableUpdateNotif: function() {
        return config.UpdateNotif_enable == true;
    },

    ChatLogsForEachUserEnabled: function() {
        return config.LogsForEachUser == true;
    },

    DailyChatLogsEnabled: function() {
        return config.LogsForEachDay == true;
    },

    AutoGenerateLoginCodes: function() {
        return config.SteamGuardAuto == true;
    },

    // Method for checking updates
    check: function() {
        const request = require('request');
        var options = {
            url: 'https://raw.githubusercontent.com/Refloow/Steam-Chat-Logger/master/package.json',
            method: 'GET',
        };
        function look(error, JSONresponse, body) {
            var page = JSON.parse(body)
            const v = package.version;
            if(page.version != v)
                console.log(`| [GitHub] | VERSION |:  ${'New update available for '+package.name+ ' v'+page.version.green+'! You\'re currently only running version '+v.yellow+''}\n${`| [GitHub] | VERSION |: Go to https://github.com/Refloow/Steam-Chat-Logger to update now!`}\n\n`)
            else 
                console.log(`| [GitHub] | VERSION |: You're running the latest version of Steam-Chat-Logger (v${v.green})\n\n`)
        }
        request(options, look)
    }
}


// Steam Chat Logger - Bot built by Refloow (-MajokingGames)

/* 
  Here is contact info: refloowlibrarycontact@gmail.com
  or main dev steam: https://steamcommunity.com/id/MajokingGames/

 */
