var result = document.querySelector("#result");
// 在当前页面注入配置文件
chrome.tabs.executeScript({
    file: 'js/config.js'
});
chrome.tabs.executeScript({
    file: 'js/JSONStorage.js'
});
document.querySelector('#find-dist-dom').addEventListener('click', e => {
    // 注入查找字典元素脚本
    chrome.tabs.executeScript({
        file: 'js/findDictDom.js'
    });
}, false);

document.querySelector('#set-json').addEventListener('click', e => {
    chrome.tabs.executeScript({
        // code: 'document.body.style.backgroundColor="red"'
        file: 'js/setJson.js'
    });
}, false);

chrome.extension.onMessage.addListener(function(req){
  result.innerText = req;
});