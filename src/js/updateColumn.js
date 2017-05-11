$(function () {
    //修改一条dns记录
    $('body').on('click' , '.lm-edit-btn' , function (){
        if ($.lmParam.state == 1) {
            var tr = $(this).parent().parent();
            saveOldData(tr);
            updateableView(tr);
        } else {
            alert('请先保存您正在修改的解析记录');
        }


    });

    var updateableView  = function  (tr) {

        tr.attr('class' , 'lm-edit-tr');
        $.lmParam.state = 2;//保存前不可新增
        //只修改2，3，4的值
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            var html = content.html();
            ele.empty();
            switch (i) {
                case 1 :
                    var select = $('<select class="lm-edit-type"></select>');
                    $($.lmParam.recordType).each (function (n , ele) {
                        select.append($('<option value="'+ele.value+'" '+ ((ele.value == html) ? "selected='selected'" : '') +'>'+ele.text+'</option>'));
                    });
                    ele.append(select);
                    break;
                case 2:
                    ele.append($('<input type="text" value="'+html+'" class="lm-edit-subdomain">'));
                    break;
                case 3:
                    ele.append($('<input type="text" value="'+html+'" class="lm-edit-value">'));
                    break;
            }

        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-save-btn">保存</a>&nbsp;<a href="javascript:void(0)" class="lm-back-btn">取消</a>'));

    };

    var saveOldData = function (tr) {
        for (var i = 1 ; i < 4 ; i ++) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            var html = content.html();
            $.lmParam.tmpRecord[i] = html;
        }
        console.log($.lmParam.tmpRecord);
    }



});