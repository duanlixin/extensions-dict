/*
* @Author: lixinduan
* @Date:   2017-04-19 10:22:02
* @Last Modified by:   lixinduan
* @Last Modified time: 2017-04-19 10:25:05
*/

/**
 * @desc 安全的操作localStorage
 * @module utils/JSONStorage
 */
(function () {
    var CHROME_QUOTA_CODE = 22;
    var FIREFOX_QUOTA_CODE = 1014;
    var IE_QUOTA_CODE = -2147024882;

    var available = !!(window.localStorage && window.localStorage.setItem);
    var isQuotaExceeded = function (e) {
        var quotaExceeded = false;
        if (e && e.code) {
            switch (e.code) {
                case CHROME_QUOTA_CODE:
                    quotaExceeded = true;
                    break;
                case FIREFOX_QUOTA_CODE:
                    if (e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                        quotaExceeded = true;
                    }
                    break;
            }
        } else if (e && e.number === IE_QUOTA_CODE) {
            quotaExceeded = true;
        }
        return quotaExceeded;
    };

    window.JSONStorage = {
        /**
         * 把一个可序列化为JSON的对象存储到localStorage
         * @param {string} key 键值
         * @param {object} json 可序列化对象
         * @returns {boolean}
         *
         * @example
         * var user = {name: 'foo'};
         * require('utils/JSONStorage').setJSON('user', user);
         */
        setJSON: function (key, json) {
            if (!available) {
                return false;
            }
            try {
                localStorage.setItem(key, JSON.stringify(json));
                return true;
            } catch (e) {
                // localStorage存储满时强行清理并尝试重新存储
                if (isQuotaExceeded(e)) {
                    localStorage.clear();
                    try {
                        localStorage.setItem(key, JSON.stringify(json));
                        return true;
                    } catch (e) {
                        return false;
                    }
                }
                // 忽略浏览器不支持或者禁止使用localStorage
                return false;
            }
        },
        /**
         * 获取已存储的可序列化对象
         * @param {string} key
         * @returns {object}
         */
        getJSON: function (key) {
            if (!available) {
                return false;
            }

            var json = {};
            try {
                json = JSON.parse(localStorage.getItem(key));
            } catch (e) {

            }
            return json;
        },
        /**
         * 按key来删除已存储的对象
         * @param {string} key
         * @returns {boolean}
         */
        removeJSON: function (key) {
            if (!available) {
                return false;
            }
            try {
                localStorage.removeItem(key);
                return true;
            } catch (e) {
                return false;
            }
        }
    };
})();