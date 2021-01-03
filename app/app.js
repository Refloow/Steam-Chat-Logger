// Steam Chat Logger - Bot built by Refloow (-MajokingGames)
	
	    
/*

Want active support and new updates with new features all for free?

Leave an star on github repo its free ( we push updates based on the engagement )
Repo link: https://github.com/OSL-Works/Steam-Chat-Logger

  Discord Support Server: https://discord.gg/D8WCtDD     (Open an ticket)

*/
	

/* 
  Here is contact info: refloowlibrarycontact@gmail.com
  main dev steam: https://steamcommunity.com/id/MajokingGames/
  
  Donate: https://ko-fi.com/refloow

 */


// Checking if required modules are properly installed

try {
    // Checking if steam-totp module is installed
	SteamUser = require('steam-user');
    // Checking if steam-user module is installed
	SteamTotp = require('steam-totp');
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
// Importing infolog (file with colors for logs)
const infolog = require('./infolog.js');
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
		infolog.correct(`| [Refloow] | LOGIN |: Logined to Steam as ${refloow.steamID} \n\n`);


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

// Steam Chat Logger - Bot built by Refloow (-MajokingGames)
	
	    
/*

Want active support and new updates with new features all for free?

Leave an star on github repo its free ( we push updates based on the engagement )
Repo link: https://github.com/OSL-Works/Steam-Chat-Logger

  Discord Support Server: https://discord.gg/D8WCtDD     (Open an ticket)

*/
	

/* 
  Here is contact info: refloowlibrarycontact@gmail.com
  main dev steam: https://steamcommunity.com/id/MajokingGames/
  
  Donate: https://ko-fi.com/refloow

 */


