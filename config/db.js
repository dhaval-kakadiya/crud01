const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database successfull Connected");
  })
  .catch((err) => {
    console.log("Database connection Failed===>", err);
  });