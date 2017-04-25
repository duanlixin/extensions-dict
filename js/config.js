/*
* @Author: lixinduan
* @Date:   2017-04-19 14:25:06
* @Last Modified by:   lixinduan
* @Last Modified time: 2017-04-20 13:54:29
*/

window.__CONF__ = {
    "#vivo-rule": { // 类名或者id
        "key": "rules",   // 对应数据的key值
        "item-wrapper-selector": "div", // 每一个数据项dom容器的selector
        "item-selector": {              // 具体每项数据dom的selector
            ".vivo-rule-title": {        // 类名或者id
                "key": "title",         // 对应数据的key值
                "type": "text"         // 对应页面放值的方式text是文本，src是图片，待扩充
            },
            ".vivo-rule-content": {        // 类名或者id
                "key": "content",         // 对应数据的key值
                "type": "text"         // 对应页面放值的方式text是文本，src是图片，待扩充
            }
        }
    },
    "#vivo-prize-list": { // 类名或者id
        "key": "list",   // 对应数据的key值
        "item-wrapper-selector": "li", // 每一个数据项dom容器的selector
        "item-selector": {              // 具体每项数据dom的selector
            ".prize-img": {        // 类名或者id
                "key": "img",
                "type": "src"
            },
            ".prize-title": {        // 类名或者id
                "key": "title",
                "type": "text"
            },
            ".prize-des": {        // 类名或者id
                "key": "des",
                "type": "text"
            }
        }
    }
}