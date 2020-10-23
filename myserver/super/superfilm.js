const express = require("express");
const superfilm = express.Router();
const path = require("path");

// var request = require("request");
const comingfilm = require("./filmjson");
const fs = require("fs");
var bodyParser = require("body-parser");
superfilm.use(bodyParser.urlencoded({ extended: false }));
superfilm.use(bodyParser.json());
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });

superfilm.get("/index", (req, res) => {
  res.send("欢迎来到数据处理页面！");
});

superfilm.get("/movie", function (req, res) {
  var filename = __dirname + "/movie.json";
  res.sendFile(filename);
});

superfilm.get("/upcomingfilm", function (req, res) {
  comingfilm.getupcomingjson(res);
});
superfilm.get("/hotfilm", function (req, res) {
  comingfilm.gethotjson(res);
});
superfilm.get("/top250film", function (req, res) {
  comingfilm.gettopjson(res);
});

module.exports = superfilm;
