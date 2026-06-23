# Description:

app works with 3 containers: client, server and data

### client:

contains frontend (typescript, vue and html files)

### server:

sending information about positionts on client,
getting information about orders

### data:

contains all information of app

## If you want add new data to db:

write new data to [seed-data.json](server/seed-data.json)
and run command in terminal
`docker compose exec server node dist/seed.js`
(command in terminal writing after run containers, seed-data.json before)

## 1.Run:

docker compose up --build

## 2.Access to app:

http://localhost/

## 3.Shut down

docker compose down
