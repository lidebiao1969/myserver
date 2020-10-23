const express = require("express");
const common = express.Router();

var bodyParser = require("body-parser");
var fs = require("fs");
var multer = require("multer");
common.use(bodyParser.urlencoded({ extended: false }));
common.use(multer({ dest: "/tmp/" }).array("image"));
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false });
common.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/" + "welcome.html");
});

common.get("/process_get", function (req, res) {
  // 输出 JSON 格式
  var response = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

common.post("/process_post", urlencodedParser, function (req, res) {
  // 输出 JSON 格式
  var response = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
  };
  console.log(response);
  res.end(JSON.stringify(response));
});

common.post("/file_upload", function (req, res) {
  console.log(req);
  // 上传的文件信息
  console.log(req.files[0].path);
  var des_file = __dirname + "/static/" + req.files[0].originalname;
  console.log("des_file" + des_file);
  fs.readFile(req.files[0].path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if (err) {
        console.log(err);
      } else {
        response = {
          message: "File uploaded successfully",
          filename: req.files[0].originalname,
        };
      }
      res.writeHead(200, {
        "Content-Type": "text/html; charset='UTF-8' ",
      });
      console.log(response);

      res.end(JSON.stringify(response));
    });
  });
});
//读取用户的信息列表
common.get("/listUsers", function (req, res) {
  fs.readFile(__dirname + "/" + "users1.json", "utf8", function (err, data) {
    // console.log(data);
    res.end(data);
  });
});

//添加的新用户数据
var user = {
  user4: {
    name: "mohit",
    password: "password4",
    profession: "teacher",
    id: 4,
  },
};

common.get("/addUser", function (req, res) {
  // 读取已存在的数据
  fs.readFile(__dirname + "/" + "users1.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    data["user4"] = user["user4"];
    //console.log(data);
    res.end(JSON.stringify(data));
  });
});

//读取指定用户的详细信息

common.get("/:id", function (req, res) {
  // 首先我们读取已存在的用户
  fs.readFile(__dirname + "/" + "users1.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    var user = data["users" + req.params.id];
    console.log(user);
    res.end(JSON.stringify(user));
  });
});

//删除指定用户的详细信息;
var id = 2;
common.get("/deleteUser", function (req, res) {
  // First read existing users.
  fs.readFile(__dirname + "/" + "users1.json", "utf8", function (err, data) {
    data = JSON.parse(data);
    delete data["users" + id];

    console.log(data);
    res.end(JSON.stringify(data));
  });
});

module.exports = common;
