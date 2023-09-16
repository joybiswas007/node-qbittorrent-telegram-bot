# qBittorrent-telegram-bot

A Telegram bot created in Node.js using the qBittorrent Api to control qBittorrent from Telegram.

## Requirements

First clone the repo

Navigate to the cloned directory

Install dependencies: `npm install`

Create a `.env` file inside the directory and fill in all the details.

Example `.env` file:

```
BOT_TOKEN=123456:ABCDEFGHJIKHLF //Grab your telegram bot token from BotFather
QBIT_WEBUI_URL=http:(s)//your-qbit-webui-link //Enter the qBittorrent webui url
USERNAME=USERNAME //login username
PASSWORD=PASSWORD //login password
MONGODB_URI=ENTERMOGODBURL //Enter mongodb connection url
```

## Usage

To run the bot, use the following command: `npm run dev`

## Available commands

```
/add or /a "magnet url" - add torrent magnet(s).
/remove or /rm "torrentid" - remove torrent from client without data require torrent id.
/cancel "torrentid" - remove torrent from client with data must require torrent id
/pause or /p "torrentid" - pause torrent(s) require torrent it
/resume or /rs "torrentid" - resume torrent(s) require torrent it.
/status - this command will give you list of torrents added in your client along with other information.
/status "torrentid" - by passing id with status command it give you detailed information about a specific torrent from your client.
/stats - running this comamnd give your information about the qBittorrent Api version, build info and qBitorrent version.

```

## Functionality

Currently only adding torrents via magnet url supports. NO support for torrent file at the moment;

## Features

More features coming soon. Feel free to send pull requests.

## Credits

Based on this API [scttcper/qbittorrent](https://github.com/scttcper/qbittorrent) ❤️
