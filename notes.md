openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365
openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem
mongod --auth --dbpath .
npm start
npm run-script doit
mongo -u "admin" -p "same" --authenticationDatabase "admin"
mongo -u "cookbook" -p "koobkooccookbook" --authenticationDatabase "recipes"

mongod --auth --port 27017 --dbpath /var/lib/mongodb

use admin
db.createUser(
  {
    user: "admin",
    pwd: "usual",
    roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
  }
)

use recipes
db.createUser(
  {
    user: "",
    pwd: "",
    roles: [ { role: "readWrite", db: "recipes" }]
  }
)

pm2 start npm --name cookbook -- run-script start

npm run-script buildProd seems to be failing on Linux. Just run 'NODE_ENV=production webpack -d' directly.
