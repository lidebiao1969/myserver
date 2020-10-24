common.js
功能：
#1./process_get 参数 first_name: req.query.first_name,
last_name: req.query.last_name,
#2 common.get("/") res.sendFile(process.cwd() + "/" + "welcome.html");
#3 common.post("/process_post")
参数：first_name: req.body.first_name,
last_name: req.body.last_name,
#4 common.post("/file_upload") 文件上传

restFULL 方式演示
#5 common.get("/listUsers")获得文件
#6 common.get("/addUser") json 文件添加元素 须改固定变参数
#7 common.get("/:id"） 根据用户 id 获得对象。须改固定变参数
#8 var id = 2;
common.get("/deleteUser"） 根据用户 id 删除对象 须改
