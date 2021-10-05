
// Copyright notice:

/*--------------------------------------------------------------------------------------------- 
* Original work: Copyright (c) 2020-2021 Refloow All rights reserved.

* Code origin: https://github.com/OSL-Works/Steam-Chat-Logger
* Developer name: Veljko Vuckovic
* Licensed under the MIT License. See LICENSE in the project root for license information.
* Published License: https://github.com/OSL-Works/Steam-Chat-Logger/master/LICENSE

* Contact information:
  Discord Support Server: https://discord.gg/D8WCtDD
  Main developer steam: https://steamcommunity.com/id/MajokingGames/ 
  Mail: refloowlibrarycontact@gmail.com
  
  * Donations:
  Crypto: https://refloow.com/cdonate
  Steam: https://steamcommunity.com/tradeoffer/new/?partner=994828078&token=XEUdbqp6
 --------------------------------------------------------------------------------------------*/

 /* 

// legal advice: PERMISSIONS AND RIGHTS

* License does not prohibit modification, distribution, private/commercial use or sale of copies as long as the original LICENSE file
 and authors copyright notice are left as they are in the project files.
* Copyright notice could be included ones or multiple times within the file.
* Copyright notice should not be removed even within the larger works (Larger modifications applied).
* Original file tags cannot be removed without creators exclusive permission.
* Adding own tags in files is possible in case of modification - even in that case original tags must be kept.
* Year on the copyright notice breakdown:
* Generally, the “year of first publication of the work” refers to the year in which the work was first distributed to the public (first year mentioned)
* Any year after represents the year of added modifications.
* Copyright cannot expire so therefore you cannot remove copyright notice if its not updated to the latest year.
* Editing existing copyright notice(s) is also prohibited.

===================================================================================
Removing copyright notice & distributing, using or selling the software without
the original license and copyright notice is licence agreement breach and its considered criminal offense and piracy.
===================================================================================

*/

// Checking if required modules are properly installed

try {
    // Checking if steam-totp module is installed
	SteamUser = require('steam-user');
    // Checking if steam-user module is installed
	SteamTotp = require('steam-totp');
    // Checking if console module is installed
        Console = require('console-master');
    // Checking if fs module is installed
	fs = require('fs');
    // Checking if module colors is correctly installed
	colors = require('colors');
} catch (ex) {
    // If modules are not installed showing an clear error message to user.
	console.log('\n\n\n| [Modules] |: Missing dependencies. Install a version with dependecies or use npm install.\n\n\n');
	console.log(ex);
	process.exit(1);
}

let info;
let users = {};
let userLogs = {};
let chatLogs = "";
let userMsgs = {}

// Importing files into project

// Importing config file
const config = require('./Settings/config.js');
// Importing methods file
const method = require('./methods');
// Client
const refloow = new SteamUser();
// Login options if 2fa code generation is enabled
const LogOnOptionsAUTO = {
	accountName: config.loginAccName,
	password: config.password,
	twoFactorCode: SteamTotp.generateAuthCode(config.shared_secret)
}
// Login options if 2fa code generation is disabled
const LogOnOptionsMANUAL = {
	accountName: config.loginAccName,
	password: config.password,
}

// Method for disabling update notifications
if(method.DisableUpdateNotif()) {
    // Checking for correct version (updates) for bot on github
    method.check();
}

// APP START

// Loging in if auto generation is enabled
if(method.AutoGenerateLoginCodes())
    {
    refloow.logOn(LogOnOptionsAUTO);
}
// Loging in if auto generation is disabled
if(!method.AutoGenerateLoginCodes())
	{
    refloow.logOn(LogOnOptionsMANUAL);
}
    

// Event when logged in
refloow.on('loggedOn', () => {
    // Geting persona
	refloow.getPersonas([refloow.steamID], (personas) => {
        // DEV console display message after login
		Console.true(`| [Refloow] | LOGIN |: Logined to Steam as ${refloow.steamID} \n\n`);


	    console.log('Everything is ready: '.cyan);
    if(method.ChatLogsForEachUserEnabled()) {
    console.log('Saving logs FOR each user. -Enabled'.cyan);
    } else {
    console.log('Saving logs FOR each USER. -Disabled')
    }
    if(method.DailyChatLogsEnabled()) {
    console.log('Saving logs FOR each DAY.  -Enabled'.cyan);
    } else {
    console.log('Saving logs FOR each DAY.  -Disabled \n')
    }

    if (!method.DailyChatLogsEnabled() && !method.ChatLogsForEachUserEnabled()) {
    console.log('Looks like both chat logs are set to false... Set at least one for each DAY or USER to true for client to save logs.')
    }
 });
});

// Loging of messages
refloow.on("friendMessage", function (steamID, message) {
  // Console display of received messages
  if(method.ReceivedMessagesDisplay()) {
    Console.new("| [SteamChat] |: " + steamID.getSteamID64() + " |: " + message);
  }
  if (userLogs[steamID.getSteamID64()]) {
        userLogs[steamID.getSteamID64()].push(message);
    } else {
        userLogs[steamID.getSteamID64()] = [];
        userLogs[steamID.getSteamID64()].push(message);
    }
    if(method.ChatLogsForEachUserEnabled()) {
        fs.writeFile("./app/Settings/ChatLogs/UserLogs/" + steamID.getSteamID64() + "-log-" + new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear() + ".json", JSON.stringify({logs: userLogs[steamID.getSteamID64()]}), (ERR) => {
            if (ERR) {
                infolog.error("| |UserData| |: An error occurred while writing UserLogs file: " + ERR);
            }
        });
    }
    if(method.DailyChatLogsEnabled()) {
        chatLogs += steamID.getSteamID64() + " : " + message + "\n";
        fs.writeFile("./app/Settings/ChatLogs/FullLogs/log-" + new Date().getDate() + "-" + new Date().getMonth() + "-" + new Date().getFullYear() + ".txt", chatLogs, (ERR) => {
            if (ERR) {
                infolog.error("| |UserData| |: An error occurred while writing FullLogs file: " + ERR);
            }
        });
    }
    if (userMsgs[steamID.getSteamID64()]) {
        userMsgs[steamID.getSteamID64()]++;
    } else {
        userMsgs[steamID.getSteamID64()] = 1;
    }
});

/* Original work: Copyright (c) 2020-2021 Refloow All rights reserved.
  Code origin (Free GitHub publish): https://github.com/OSL-Works/Steam-Chat-Logger*/

