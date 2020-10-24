//登录 注册
const express = require("express");
const yuedu_users = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var uuid = require('uuid');
const yueduUser = require("../models/yuedu_User");
process.env.SECRET_KEY = "secret"



yuedu_users.get("/test", (req, res) => {
    console.log(req.query.u_name);
    console.log(req.query.u_openid);
    // res.send(req.query);
    res.send({ msg: "test is working", 'u_name': req.query.u_name, 'u_openid': req.query.u_openid });
});

yuedu_users.get("/openid", (req, res) => {
    code = req.query.code;
    console.log('code : ' + code);
    AppID = process.env.AppID;
    AppSecret = process.env.AppSecret;
    // console.log('AppID : ' + process.env.AppID);
    // console.log('AppSecret :  ' + process.env.AppSecret);
    var request = require("request");

    var url = "https://api.weixin.qq.com/sns/jscode2session?appid=" + AppID + "&secret=" + AppSecret + "&js_code=" + code + "&grant_type=authorization_code";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            //   console.log('body');
            //   console.log(body);
            res.send(body);
        }
    });


    // res.send(req.query);
    // res.send({ 'Appid': process.env.Appid, 'AppSecret': process.env.AppSecret });
});



yuedu_users.post('/login', (req, res) => {

    //  console.log(req.body)
    yueduUser.findOne({ where: { u_openid: req.body.u_openid } }).then((user) => {
        if (user) {
            //密码匹配
            //  if (bcrypt.compareSync(req.body.u_random, user.u_random)) {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });
            res.send({ status: 'ok', token: token, userinfo: user });

            // res.send('登录成功') 
            //  } else {
            //    res.send("password is incorrect")
            //  }
        } else {

            register(req, res, user);
            // res.status(400).json({ error: "user dose not exist" })
        }
    }).catch((err) => {
        res.status(400).json({ error: err });
    })


})


//  注册函数 
function register(req, res, user) {
    const now = new Date();
    const userData = {

        u_openid: req.body.u_openid,
        u_name: req.body.u_name,
        u_face: req.body.u_face,
        u_random: uuid.v1(),
        u_integer: req.body.u_integer,
        u_remainder: req.body.u_remainder,
        u_regtime: now
    }
    yueduUser.create(userData)
        .then((user) => {
            let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 1440 });

            res.json({ status: 'ok', token: token, userinfo: user });

        })
        .catch((err) => res.send("error: " + err));

}








//注册界面
yuedu_users.post("/register", (req, res) => {
    const now = new Date();
    const userData = {

            u_openid: req.body.u_openid,
            u_name: req.body.u_name,
            u_face: req.body.u_face,
            u_random: uuid.v1(),
            u_integer: req.body.u_integer,
            u_remainder: req.body.u_remainder,
            u_regtime: now
        }
        // 存之前先找数据库有没有
    yueduUser.findOne({ where: { u_openid: req.body.u_openid } }).then((user) => {
            if (!user) {
                //加密密码
                // bcrypt.hash(req.body.u_openid, 10, (err, hash) => {
                //   userData.u_openid = hash;
                yueduUser.create(userData)
                    .then((user) => {
                        res.json({ status: user.u_name + "   registered" });

                    })
                    .catch((err) => res.send("error: " + err));
            } else {
                //数据库存在
                res.json({ error: "User already exists" });
            }

        })
        .catch((err) => {
            res.send("error:" + err);
        });

})


module.exports = yuedu_users;