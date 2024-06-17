const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// ObjectiD ✅
// Object Id must to require from module mongodb
// const ObjectId = require("mongodb").ObjectId;

// Replace the placeholder with your Atlas connection string
const uri = "mongodb://127.0.0.1:27017";
const nameDB = "aris-dev";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  useNewParser: true,
  useUnifiedTopology: true,
});

client.connect((error, client) => {
  if (error) {
    return console.log("Connection Failed...");
  }
  //   console.log("Connection Success");

  // todo Choose Database

  const db = client.db(nameDB);

  // todo insert one to mahasiswa collections / table
  //   db.collection("mahasiswa").insertOne(
  //     {
  //       nama: "bimo",
  //       email: "bimo@gmail.com",
  //     },
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Failed to insert data");
  //       }
  //       console.log(result);
  //     }
  //   );

  //todo insert many data in mongo

  //   db.collection("mahasiswa").insertMany(
  //     [
  //       {
  //         name: "aris12",
  //         email: "aris12@gmail.com",
  //       },
  //       {
  //         name: "chikal",
  //         email: "chikal@gmail.com",
  //       },
  //       {
  //         name: "pras",
  //         email: "pras@gmail.com",
  //       },
  //     ],
  //     (error, result) => {
  //       if (error) {
  //         return console.log("Insert many data failed");
  //       }
  //       console.log(result);
  //     }
  //   );

  // todo Read All Data From Collection Mahasiswa / select * from mahasiswa

  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find()
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // todo Read all data from collection based on criteria, just add some object on find method
  // ! Be Careful about key value
  //   console.log(
  //     db
  //       .collection("mahasiswa")
  //       .find({ _id: ObjectId("666fcf2aaca29023bf90defe") })
  //       .toArray((error, result) => {
  //         console.log(result);
  //       })
  //   );

  // Update data on mongodb -> result is promise
  //   db.collection("mahasiswa").updateOne(
  //     {
  //       _id: ObjectId("666fd2aa4edc0c380eaaf43c"),
  //     },
  //     {
  //       $set: {
  //         nama: "Alfathan Aris Munandar, updated!!!",
  //       },
  //     }
  //   );

  // todo update data on mongo db show promise result

  //   const updatePromise = db.collection("mahasiswa").updateOne(
  //     {
  //       _id: ObjectId("666fd2aa4edc0c380eaaf43c"),
  //     },
  //     {
  //       $set: {
  //         nama: "Alfathan Aris Munandar, updated!!!",
  //       },
  //     }
  //   );

  //   updatePromise
  //     .then((result, error) => {
  //       console.log(result);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });

  //todo updateMany on mongodb

  //   db.collection("mahasiswa").updateMany(
  //     {
  //       nama: "aris",
  //     },
  //     {
  //       $set: {
  //         nama: "updated ffrom nodejs-> update many",
  //       },
  //     }
  //   );

  //todo Delete Data Collection mahasiswa

  //   db.collection("mahasiswa")
  //     .deleteOne({
  //       _id: ObjectId("66705876fdf8df54bc32c227"),
  //     })
  //     .then((result) => {
  //       console.log(result);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });

  //todo deleteMany on mongodb

  //   db.collection("mahasiswa").deleteMany({
  //     nama: "aris",
  //   });
});
