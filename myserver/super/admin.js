const express = require("express");
const admin = express.Router();
admin.get("/index", (req, res) => {
  res.send("欢迎来到博客管理员页面！");
});
admin.use("/login", (req, res, next) => {
  let isLogin = true;
  if (isLogin) {
    next();
  } else {
    res.send("您未登录，404");
  }
});

module.exports = admin;
