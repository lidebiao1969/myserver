//操作文件
/*
  1、fs.stat 获取文件状态
  2、fs.readdir 读取文件夹数据
  3、fs.access 判断文件夹是否存在
  4、path.join 拼路径
*/
//操作文件
const fs = require('fs');
//操作路径
const path = require('path');

function dirtojson(inputPath, outputPath) {

    var Arrdata = [];
    //1.接受命令行命令
    //3.判断路径是否存在
    //2.修正路径
    //  let inputPath = './public'; // process.argv[2]; //[2]是输入的路径名
    if (!inputPath) { //判断有没有输入内容
        throw '请输入文件名！';
    }
    //转换路径格式为绝对路径
    // inputPath = path.resolve(inputPath);
    //输入的路径存在就执行递归
    try {
        //扩展：'.F_OK'==='检查目录中是否存在文件'
        //'.R_OK'==='检查文件是否可读',详细见nodejs文档
        //也可以这样写 ：判断是否存在，以及是否可读
        //fs.accessSync(inputPath,fs.constants.F_OK|fs.constants.R_OK);
        //这里的 fs.constants.F_OK 是默认值，不用写   
        fs.accessSync(inputPath);
        testReadFiles(inputPath);
        // console.log(Arrdata);
        //排序
        Arrdata.sort(function(a, b) { return a - b })
            //  Arrdata.sort();
        writejson(outputPath, JSON.stringify(Arrdata));
    } catch (err) {
        console.log(err);
    }


    function writejson(file, arr) {

        fs.writeFile(file, arr, () => {
            console.log('ok!');
        });
    }

    function testReadFiles(filePath) {
        let state = fs.statSync(filePath);
        if (state.isFile()) {
            //是文件
            //  console.log(filePath);
            if (filePath.split('.').pop() == 'jpg' || filePath.split('.').pop() == 'JPG' || filePath.split('.').pop() == 'png' || filePath.split('.').pop() == 'PNG') {

                var name = filePath.split('\\').pop();
                //  console.log(name);
                //  console.log(filePath);

                var filePath = filePath.replace(/\\/g, "/");

                Arrdata.push({ 'path': filePath });


            }

        } else if (state.isDirectory()) {
            //是文件夹
            //先读取
            let files = fs.readdirSync(filePath);
            files.forEach(file => {
                //  console.log(path.join(filePath, file) + '，file')
                testReadFiles(path.join(filePath, file));
            });
        }
    }
}
exports.dirtojson = dirtojson