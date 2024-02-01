
# Spending Record App

This is a sample app to demostrate my learning progress of node.js.

# Tech
- Node.js (with typedscipt)
- Mongo DB

# Prerequsite
1. create a `.env` file
2. Add the connection string and password
```
DATABASE="mongodb+srv://xxxxxxxxxxx"
DATABASE_PASSWORD="YYYYYYYYYY"
```

# Shortcut
`node dist/server.js` to start the node.js project (from server.js)

`npm run build:watch` or `tsc --watch` will help to watch the changed file and auto-compile from ts to js.

`npm run build:run` or `nodemon dist/server.js` will auto-restart the node.js server when server.js is changed (recompiled).

# Progress
Jan 30
- Clone project from `https://github.com/AkeelLashley/todo-backend`
- Build API
  - GET: find transaction
  - POST: add new transaction 
  - DELETE: delete transaction by id





