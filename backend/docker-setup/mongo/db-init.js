print("Mongo Init Script Started");

const dbName = process.env.MONGO_INITDB_DATABASE;
const user = process.env.MONGO_INITDB_USER;
const pwd = process.env.MONGO_INITDB_PWD;

db = db.getSiblingDB(dbName);

if (db.getUser(user) === null) {
  db.createUser({
    user,
    pwd,
    roles: [
      {
        role: 'readWrite',
        db: dbName,
      },
    ],
  });
  print(`Created user ${user}`);
} else {
  print(`User ${user} already exists, skipping`);
}
