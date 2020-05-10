const fs = require('fs');
const url = require('url');
const path = require('path');

const server = 'localhost';
const port = 8085;
const uploadfoldername = 'public/image';
let urlArr = []

exports.upPhoto = (ctx,next) => {
    const files = ctx.request.files;
    let length = 0;
    for (item in files) {
        length++;
    }
    if (length === 0) {
        console.log('files no data');
        return;
    }
    for (item in files) {
        var file = files[item];
        // formidable 会将上传的文件存储为一个临时文件，现在获取这个文件的目录
        var tempfilepath = file.path;
        // 获取文件类型
        var type = file.type;
        // 获取文件名，并根据文件名获取扩展名
        var filename = file.name;
        var extname = filename.lastIndexOf('.') >= 0
                        ? filename.slice(filename.lastIndexOf('.') - filename.length)
                        : '';
        // 文件名没有扩展名时候，则从文件类型中取扩展名
        if (extname === '' && type.indexOf('/') >= 0) {
            extname = '.' + type.split('/')[1];
        }
        // 将文件名重新赋值为一个随机数（避免文件重名）
        filename = Math.random().toString().slice(2) + extname;

        // 构建将要存储的文件的路径
        var filenewpath = uploadfoldername + '/' + filename;

        // 将临时文件保存为正式的文件
        // fs.rename(tempfilepath, filenewpath, function (err) {
        //     // 存储结果
        //     var result = '';

        //     if (err) {
        //         // 发生错误
        //         console.log('fs.rename err');
        //         result = 'error|save error';
        //     } else {
        //         // 保存成功
        //         console.log('fs.rename done');
        //         // 拼接图片url地址
        //         result = 'http://' + server + ':' + port + '/' + "image" + '/' + filename;
        //     }
            
        //     // 返回结果
        //     urlArr.push(result)
        //     console.log(urlArr)
        // }); // fs.rename
        fs.renameSync(tempfilepath, filenewpath)
        result = 'http://' + server + ':' + port + '/' + "image" + '/' + filename;
        urlArr.push(result)
    } // for in 
    console.log(urlArr)
    ctx.body = {"errno": 0,"data":urlArr}   
}