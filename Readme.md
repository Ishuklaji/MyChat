
# La-Charla

La-Charla is a Full Stack Chatting App.
Uses Socket.io for real time communication and stores user details in encrypted format in Mongo DB Database.
## Tech Stack

**Client:** React JS, Chakra UI

**Server:** Node JS, Express JS, Socket.io

**Database:** Mongo DB

**Deployment:** Frontend on Vercel, backend on Render

## Demo

https://lacharla.vercel.app

## Getting Started Locally

```bash
# install deps
npm install
cd frontend && npm install && cd ..

# backend .env (repo root) - see .env.example
PORT=5000
MONGO_URI=<your mongodb connection string>
JWT_SECRET=<random secret>
CLIENT_URL=http://localhost:3000

# frontend env (frontend/.env) - see frontend/.env.example
REACT_APP_API_URL=http://localhost:5000

# run backend
npm run dev

# run frontend (separate terminal)
cd frontend && npm start
```

# Features

### Authenticaton
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/login.png?raw=true)
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/signup.png?raw=true)
### One to One chat
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/chat.png?raw=true)
### Search Users
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/searchuser.png?raw=true)
### Create Group Chats
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/create%20group.png?raw=true)
### Notifications 
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/notification.png?raw=true)
### Add or Remove users from group
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/edit%20group.png?raw=true)
### View Other user Profile
![](https://github.com/Ishuklaji/MyChat/blob/master/screenshots/user%20profile.png?raw=true)
### Dark Mode
Toggle light/dark theme from the top bar.
### Message Reactions
Hover a message to react with an emoji; reactions sync live to everyone in the chat.
## Made By

- [ishuklaji](https://github.com/ishuklaji)
