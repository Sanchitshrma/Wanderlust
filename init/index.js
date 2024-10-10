const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");

const Mongo_url = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then((res) => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(Mongo_url);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "66e9ac8451e67c071974f355",
  }));
  await Listing.insertMany(initdata.data);
  console.log("data was initilised");
};

initDB();
