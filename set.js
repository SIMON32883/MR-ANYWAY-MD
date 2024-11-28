const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYUxpMWsvUXoxQk5vN1VleENvWW9RanIrK05IK1YyOUQ1RVVWeFNNWkVuYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOUtyb3owYkQwck9Ubk9WVWNwd2Zhbi9JSWcwU2kvMk9YOXZjZlZPODAwYz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIrTzE5MjU2a2FEdE1ReXpPbmk0ZEg1K2xoNHNPODl1cDJHaTg3U1JpUlh3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI3TFRqUEdSNTY2OWIyNzVTVjhUSjk4MUFVZTJZRmtNYVFiQ1gwOTh0N21NPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZHNFBxbWtSbDFmdnFCbjhPeHNEY2tKeSs5Mks2K1NWR3dvajY2aEt0Rnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InhDRklyYTFtUlU2WVpPU0RpUklxTG14RGlhbGdQZTVYcG52bUtlbEZYUms9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic05CWHQ0NWdwMFEwM1hsbUVkaG1GMVdKd2NIc2p0bXg1REQxdVl4ei8yST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiU0lVOVpMUWN2OWR3UkZXRFJxenpRMkxtcGJvNHJKNEZ2NEs2SW4zcm9nMD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjlzRlllbUl5WkluTHZoTGIrcU5BSnhDRVl2cUJ1SlBFcVErYnF5MHpVV2YxWTRBejRrR3NxT1p4NUs5bmg2Nzg0Y2JZbUhBT25POXpxQ2V3NUl1RWd3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTM1LCJhZHZTZWNyZXRLZXkiOiJyOTFpT29YUnlsakw2VlFvbVIxM3RpdFJxZ295MUhLQkE4eFFCMHFpQ3NRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI5TXBsaXdKLVQ2S3NiaThJYW1nX09BIiwicGhvbmVJZCI6IjQ4NDRkZGRmLTUyNzEtNGNiNC1iYzM4LTRkYzEyM2Y4Mjg4NiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKdUY4NnNjbDZtQ3hyekZFS05peVpnVWh4REk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQnVIdGhJcWRFQjM0Q2NDT3JhMkFwRmluYWJvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkJDQTczR0VIIiwibWUiOnsiaWQiOiI5MjMxMjY1MDczNDE6NjhAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi6pa06pa06pa06pa0IOqUquqTn+qWtOqToOqTouqTlOqTsOqToyDqlrTqlrTqlrTqlrQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ1BmOTNia0VFTTdsbjdvR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IlNkZjRDOFpXaVlxa3ZiV3NYZzhSOUVmYk1LRy9Sa2ZnSVFiWGMxZ1RqVlE9IiwiYWNjb3VudFNpZ25hdHVyZSI6IitwMTEwbEZmc3VUeXh3NWg5QzNOVUMwWnVadnJLMHBRSG9rQUVuOTdZOC9ucmZod2RQUktMRDE5YUhWektyeVgyVG0wbkxVVVZQS2tNR0phZXNXTUF3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ3bnlGT1JuZWEyNWNvZ081SjVIb2k1cTdEQjhSTHdTQmY3UUZ3dGRYd0FNenJJLzhhZ3BLZ0c0WnBxYmZLM2I3dnh3QmJhbmU0amFuR0FOU1BWVDFnZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjkyMzEyNjUwNzM0MTo2OEBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJVblgrQXZHVm9tS3BMMjFyRjRQRWZSSDJ6Q2h2MFpINENFRzEzTllFNDFVIn19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzMyNzY4NDc2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQVA1YyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANYWAY_MD : process.env.AUTO_LIKE_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};

let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
