const express = require("express");
const admin = express();
const bodyparser = require("body-parser");
const Users = require("./routes/users");
const yueduUsers = require("./routes/yuedu_users");
admin.use(bodyparser.json());
admin.use(bodyparser.urlencoded({ extended: false }));
admin.get("/", (req, res) => {
    res.send({ msg: "server is works" });
});
admin.use("/api/v1", Users);
admin.use("/api/yue1", yueduUsers);
module.exports = admin;