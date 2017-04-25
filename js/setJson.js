/*
* @Author: lixinduan
* @Date:   2017-04-11 20:07:55
* @Last Modified by:   lixinduan
* @Last Modified time: 2017-04-20 10:24:36
*/

'use strict';

function getParams(search) {
    var queryString = search || window.location.search.split('?')[1];
    var result = {};
    if (queryString) {
        var queryList = queryString.split('&');
        for (var i = 0; i < queryList.length; i++) {
            var keyValue = queryList[i].split('=');
            result[keyValue[0]] = decodeURIComponent(keyValue[1]);
        }
    }
    return result;
}
function setJson() {
    var injectext = getParams().injectext;
    
    console.log(window.JSONStorage.getJSON('vivo_kbshare_kbsweb_com_qq_sports'))
    document.querySelector('#batch-adding').value = injectext
}

setJson();