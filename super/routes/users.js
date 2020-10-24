//登录 注册
const express = require("express");
const users = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
// process.env.SECRET_KEY = "secret"

users.get("/test", (req, res) => {
    console.log(req.query.name);
    console.log(req.query.pwd);
    // res.send(req.query);
    res.send({ msg: "test is working", 'name': req.query.name, 'pwd': req.query.pwd });
});



users.post('/login', (req, res) => {

    //  console.log(req.body)
    User.findOne({ where: { name: req.body.username } }).then((user) => {
        if (user) {
            //密码匹配

            // console.log("process.env.SECRET_KEY:" + process.env.SECRET_KEY);

            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(user.dataValues, process.env.SECRET_KEY, { expiresIn: 7 * 24 * 3600 });
                // res.send(token);

                res.send({ msg: '登录成功', "token": token })
            } else {
                res.send("password is incorrect")
            }
        } else {
            res.status(400).json({ error: "user dose not exist" })
        }
    }).catch((err) => {
        res.status(400).json({ error: err });
    })


})

users.post("/register", (req, res) => {
    const now = new Date();
    const userData = {
            name: req.body.username,
            email: req.body.email,
            password: req.body.password,
            created: now
        }
        // 存之前先找数据库有没有
    User.findOne({ where: { email: req.body.email } }).then((user) => {
            if (!user) {
                //加密密码
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    userData.password = hash;
                    User.create(userData)
                        .then((user) => {
                            res.json({ status: user.email + "   registered" });

                        })
                        .catch((err) => res.send("error: " + err));
                });

            } else {
                //数据库存在
                res.json({ error: "User already exists" });
            }

        })
        .catch((err) => {
            res.send("error:" + err);
        });

})

//中间件 函数
const auth = async(req, res, next) => {

    // console.log(req.headers.postman.token);
    const raw = req.headers.authorization.split(" ").pop();
    // const raw = req.headers.token;
    const { email } = jwt.verify(raw, process.env.SECRET_KEY);
    User.findOne({ where: { email: email } }).then((user) => {
        if (user) {
            req.user = user.dataValues;
            console.log(req.user);
        }

    });

    next();
};

users.get("/profile", auth, async(req, res) => {
    setTimeout(
        foo, 1000);
    //console.log('req.user : ' + req.user);

    function foo() {
        console.log(req.user);
        return res.send(req.user);
    }

    // return res.send('hello');
});
module.exports = users;