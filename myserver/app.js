const express = require("express");
const app = express();
const cors = require("cors");
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
//const fs = require("fs");
const home = require("./super/home.js");
const admin = require("./super/admin.js");
const superfilm = require("./super/superfilm.js");
const common = require("./super/common.js");

app.use("/public", express.static("public"));

app.use((req, res, next) => {
  let ismaintain = false;
  if (ismaintain) {
    res.send("网站正在维护");
  } else {
    next();
  }
});
app.use("/super/common", common);
app.use("/super/admin", admin);
app.use("/super/home", home);
app.use("/super/film", superfilm);

app.use((err, req, res, next) => {
  if (err) {
    res.status(500).send(err.message);
  }
});
// 放在最后
app.use((req, res, next) => {
  res.status(404).send("当前页面不存在。404");
});

app.listen(3000);
console.log("服务器已运行:http://localhost:3000");
