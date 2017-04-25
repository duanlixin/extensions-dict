/*
* @Author: lixinduan
* @Date:   2017-04-19 14:19:45
* @Last Modified by:   lixinduan
* @Last Modified time: 2017-04-24 15:10:23
*/
var jsonData = {};
function getData(data) {
    // chrome.runtime.sendMessage('连接成功1111！');
    jsonData = data;
    console.log(jsonData)
}