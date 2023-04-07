const express = require("express");
const connectDB = require("./config/db")
const app = express();

connectDB();

app.use(express.json({ extended: false }))

const port = process.env.PORT || 8000;
app.get("/servertest", (req, res) => res.send("API RUNNING"))


app.use("/api/users", require("./routes/users"))

var server = app.listen(port, () => console.log(`Server started on port ${port}`))

module.export = server;