/*
* @Author: lixinduan
* @Date:   2017-04-19 15:09:19
* @Last Modified by:   lixinduan
* @Last Modified time: 2017-04-25 10:41:41
*/

var dictData = JSONStorage.getJSON('vivo_kbshare_kbsweb_com_qq_sports');
var cilckedSelector = '[data-clicked]';
$('body').append('<div class="mask hide"></div>');
$('body').append('<div class="layer hide"><div class="edit-content"></div><input id="edit-preview" value="预览" type="button"><input id="edit-close" value="关闭" type="button"></div>');
/**
 * 校验字典元素是否存在
 * @return {boolean} 全部存在返回true
 */
function validateDictDoms() {
    var conf = window.__CONF__;

    var keys = Object.keys(conf);
    for(var i = 0; i < keys.length; i++) {
        if ($(keys[i]).length === 0) {
            return false;
        }
    }

    return true;
}
/**
 * 高亮字典dom元素，样式待确定
 */
function hightLightDictDom() {
    var conf = window.__CONF__;

    var keys = Object.keys(conf);
    for(var i = 0; i < keys.length; i++) {
        $(keys[i]).addClass('dict-element');
        $(keys[i]).attr('data-key', conf[keys[i]].key);
    }

}
/**
 * 高亮字典dom元素，样式待确定
 * @param ids 高亮字典dom元素id数组
 */
function addIcons() {
    var conf = window.__CONF__;
    var keys = Object.keys(conf);

    // var imgURL = chrome.extension.getURL('images/edit.png');
    // http://img1.gtimg.com/sports/pics/hv1/253/52/2203/143263588.png add
    // http://img1.gtimg.com/sports/pics/hv1/31/53/2203/143263621.png edit
    // http://img1.gtimg.com/sports/pics/hv1/42/53/2203/143263632.png save
    for(var i = 0; i < keys.length; i++) {
        // todo 移除zepto
        // console.log($('#' + keys[i]).find(item[i]));
        var key = conf[keys[i]]['key'];
        var addElement = '<img class="dict-element-add" data-key="' + key +'" style=" position: absolute; height: 25px; width: 25px ; top: 0; right: 28px;" src="http://img1.gtimg.com/sports/pics/hv1/253/52/2203/143263588.png">';
        var saveElement = '<img class="dict-element-save" style=" position: absolute; height: 25px; width: 25px ; top: 0; right: 0;" src="http://img1.gtimg.com/sports/pics/hv1/42/53/2203/143263632.png">';
        var items = $(keys[i]).find(conf[keys[i]]['item-wrapper-selector']).addClass('dict-element-item').attr('data-selector', keys[i]);


        items.each(function (j, el) {
            var editElement = '<img class="dict-element-edit" data-key="' + key +'" data-index="' + j +'" style=" position: absolute; height: 25px; width: 25px ; top: 0; right: 0;" src="http://img1.gtimg.com/sports/pics/hv1/31/53/2203/143263621.png">';
            var delElement = '<img class="dict-element-del" data-key="' + key +'" data-index="' + j +'" style=" position: absolute; height: 25px; width: 25px ; top: 0; right: 25px;" src="http://img1.gtimg.com/sports/pics/hv1/93/131/2203/143283573.png">';
            $(el).append(editElement).append(delElement);
        });
        $(keys[i]).append(addElement).append(saveElement);

    }
}

function showLayer(obj) {
    var html = [];
    for(var key in obj) {
        html.push('<label>' + key +'</label>' + '<textarea data-key="' + key + '" >' + obj[key] + '</textarea><br>')
    }
    // console.log(html.join(''))

    $('.layer').removeClass('hide');
    $('.mask').removeClass('hide');
    $('.mask').css({
        height: $('body').offset().height
    });
    $('.layer .edit-content').append(html.join(''));
}
/**
 * 页面图标绑定事件
 * 
 */
function bindIconEvent() {
    // 增加按钮
    $('.dict-element-add').click(function() {
        var self = $(this);
        var container = self.parent();
        var newElementHtml = self.parent().find('[data-selector]').last().clone().wrap('<div>').parent().html();
        newElementHtml = newElementHtml.replace(/data-index="([0-9]+)"/m, function(a,b) {
            return 'data-index="'+ (parseInt(b)+1)+'"';
        });
        container.append(newElementHtml)

        var newIndex = container.find('[data-selector]').length;
        var key = self.attr('data-key');
        var newData = $.extend({}, dictData[key][newIndex - 2]);

        dictData[key][newIndex - 1] = newData;
        JSONStorage.setJSON('vivo_kbshare_kbsweb_com_qq_sports', dictData);
        console.log(dictData)
    });
    // 保存按钮
    $('.dict-element-save').click(function() {
        location.href = 'http://ons.webdev.com/site/mydictedit?sid=vivo.kbshare.kbsweb.com.qq.sports&injectext=' + encodeURIComponent(JSON.stringify(JSONStorage.getJSON('vivo_kbshare_kbsweb_com_qq_sports')))
    });
    // 删除按钮
    $('body').on('click', '.dict-element-del', function() {
        var _this = this;
        var self = $(this);
        var keyDom = self.parents().find('[data-key]');
        var delIndex = self.attr('data-index');
        var objKey = '';
        keyDom.each(function(i, item) {
            if ($.contains(item, _this)) {
                objKey = $(item).attr('data-key')
            }
        });
        // console.log(dictData[objKey][index]);
        // todo splice
        console.log(typeof dictData[objKey], dictData[objKey], $.isArray(dictData[objKey]))
        if ($.isArray(dictData[objKey])) {
            dictData[objKey].splice(delIndex, 1);
        }
        if ($.isPlainObject(dictData[objKey])) {
            delete dictData[objKey][delIndex];
        }
        // console.log(self.parent())
        var wrapperSelector = self.parents().attr('data-selector');
        var allElement = $(wrapperSelector).find('[data-index]');
        // console.log(allElement)
        allElement.each(function(i, item) {
            var self = $(item);
            var index = self.attr('data-index');
            // if
            console.log(index, delIndex)
            if(index > delIndex) {
                self.attr('data-index', index - 1);
            }
        });

        self.parent().remove();
        JSONStorage.setJSON('vivo_kbshare_kbsweb_com_qq_sports', dictData);

        console.log(dictData)
        
    });
    // 编辑按钮
    $('body').on('click','.dict-element-edit', function() {
        var _this = this;
        var self = $(this);
        var keyDom = self.parents().find('[data-key]');
        var index = self.attr('data-index');
        var objKey = '';
        keyDom.each(function(i, item) {
            if ($.contains(item, _this)) {
                objKey = $(item).attr('data-key')
            }
        });
        // console.log(dictData[objKey][index]);
        
        self.parent().attr('data-clicked', true);
        
        showLayer(dictData[objKey][index]);
    });
}



function findDictDom() {
    if (validateDictDoms() === false) {
        chrome.runtime.sendMessage('查找失败，缺失id，请确认页面或者查看config.js');
        return;
    }
    addIcons();
    bindIconEvent();
    hightLightDictDom();
    chrome.runtime.sendMessage('查找成功！');

}

findDictDom();



function closeEditLayer() {
    $('.layer .edit-content').empty();
    $('.layer').addClass('hide');
    $('.mask').addClass('hide');
    $(cilckedSelector).removeAttr('data-clicked');

    
    // $('[data-dictdom]').each(function(i, item) {
    //     domToData($(item));
    // });
}
$('#edit-close').click(function() {
    closeEditLayer();
});

$('#edit-preview').click(function() {
   
    var obj = {};
    $('.edit-content').find('[data-key]').each(function(i, item ) {
        var _self = $(item)
        obj[_self.data('key')] = _self.val();
    });
    console.log(obj)

    var clickDom = $(cilckedSelector);

    var conf = window.__CONF__;

    var selectors = conf[clickDom.attr('data-selector')]['item-selector'];


    for(var selector in selectors) {
        var ss =  selectors[selector];
        if (ss.type === 'text') {
            clickDom.find(selector).text(obj[ss.key]);
        }
        if (ss.type === 'src') {
            clickDom.find(selector).attr('src', obj[ss.key]);
        }
        
    }

    var key = clickDom.find('[data-key]').attr('data-key');
    var index = clickDom.find('[data-key]').attr('data-index');
        
    dictData[key][index] = obj;

    console.log(dictData)

    JSONStorage.setJSON('vivo_kbshare_kbsweb_com_qq_sports', dictData);

    closeEditLayer();
});