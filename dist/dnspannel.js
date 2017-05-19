define('addColumn',function (require , exports , module) {

    var addBtn = $(".lm-add-dns-record");
    var table = $(".lm-dns-table");
    var titleTr = $(".lm-title-tr");

    exports.init = function () {
        addBtn.click(function (){
            if ($.lmParam.state == 1) {
                var tr = module.exports.buildColumn();
                titleTr.after(tr);
                $.lmParam.state = 2;
            } else {
                alert('当前有尚未保存的记录！');
            }
        });
    };

    exports.buildColumn = function () {
        var select = $('<select class="lm-edit-type"></select>');
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-edit-tr"></tr>');
        td0.append($('<input type="checkbox">'));
        $($.lmParam.recordType).each(function (n,ele) {
            select.append($('<option value="'+ele.value+'">'+ele.text+'</option>'));
        });
        td1.append(select);
        td2.append($('<input type="text" class="lm-edit-subdomain">'));
        td3.append($('<input type="text" class="lm-edit-value">'));
        td4.append('');
        td5.append('<a href="javascript:void(0)" class="lm-save-btn">保存</a>&nbsp;<a href="javascript:void(0)" class="lm-cancel-btn">取消</a>');
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    }

});


define('cancelColumn' , function (require , exports , module){
    exports.init = function () {
        $('body').on('click' , '.lm-cancel-btn' ,function (){
            $.lmParam.state = 1;
            $(this).parent().parent().remove();
        });

        $('body').on('click' , '.lm-back-btn' , function () {
            $.lmParam.state = 1;
            tr = $(this).parent().parent();
            module.exports.changeTr(tr);
        });
    };

    exports.changeTr = function (tr) {
        tr.attr('class' , 'lm-tr');
        //只修改2，3，4的值
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            ele.empty();
            ele.append($('<p>'+$.lmParam.tmpRecord[i]+'</p>'));
        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
    };
}) ;



define('delColumn' , function (require , exports , module) {

    exports.init = function () {
        $('body').on('click' , '.lm-delete-btn' ,function () {
            if (confirm('您确定要删除吗？')) {
                var tr = $(this).parent().parent();
                $.ajax({
                    url:$.lmParam.deleteDnsRecordUrl,
                    method:"post",
                    data: {
                        id:$($(tr.children()[0]).children()[0]).val(),
                        domainId:$.lmParam.domainId
                    },
                    success: function (data) {
                        tr.remove();
                    }
                });
            }
        });
    };

    exports.del = function (tr) {

        tr.remove();

    };
});

define('initColumn' , function (require , exports , module) {

    exports.init = function () {
        window.onload = function () {
            var titleTr = $(".lm-title-tr");
            $.ajax({
                'url': $.lmParam.initDataUrl,
                'method': 'post',
                'data': {
                    domainId: $.lmParam.domainId
                },
                success : function (data) {
                    data = eval(data);
                    if (data.length == 0) {
                        //要求用户对@记录进行填写
                        titleTr.after(module.exports.baseRecord());
                    } else {
                        $(data).each (function (){
                            if (this.type == 'A' && this.subdomain == '@') {
                                titleTr.after(module.exports.baseColumn(this));
                            } else {
                                titleTr.after(module.exports.dataColumn(this));
                            }

                        });
                    }
                }
            });
        };
    };

    exports.baseRecord = function () {
        $.lmParam.state = 2;
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-edit-tr"></tr>');
        td0.append($('<input type="checkbox">'));
        td1.append($('<p>A</p>'));
        td2.append($('<p>@</p>'));
        td3.append($('<input type="text" class="lm-edit-value">'));
        td4.append('');
        td5.append('<a href="javascript:void(0)" class="lm-save-base-btn">保存</a>');
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    };

    exports.updateBaseRecord = function () {
        $.lmParam.state = 2;
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-edit-tr"></tr>');
        td0.append($('<input type="checkbox">'));
        td1.append($('<p>A</p>'));
        td2.append($('<p>@</p>'));
        td3.append($('<input type="text" class="lm-edit-value">'));
        td4.append('');
        td5.append('<a href="javascript:void(0)" class="lm-confirmEdit-base-btn">保存</a>');
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    };

     exports.dataColumn = function (data) {
        //正常记录
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-tr"></tr>');
        td0.append($('<input type="checkbox" value="'+data.id+'">'));
        td1.append($('<p>'+data.type+'</p>'));
        td2.append($('<p>'+data.subdomain+'</p>'));
        td3.append($('<p>'+data.value+'</p>'));
        td4.append('');
        td5.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
        tr.append(td0);
        tr.append(td1);
        tr.append(td2);
        tr.append(td3);
        tr.append(td4);
        tr.append(td5);
        return tr;
    };

     exports.baseColumn = function (data) {
         var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
         var tr = $('<tr class="lm-tr"></tr>');
         td0.append($('<input type="checkbox" value="'+data.id+'">'));
         td1.append($('<p>'+data.type+'</p>'));
         td2.append($('<p>'+data.subdomain+'</p>'));
         td3.append($('<p>'+data.value+'</p>'));
         td4.append('');
         td5.append($('<a href="javascript:void(0)" class="lm-edit-base-btn">修改</a>'));
         tr.append(td0);
         tr.append(td1);
         tr.append(td2);
         tr.append(td3);
         tr.append(td4);
         tr.append(td5);
         return tr;
     }

});

define('main',function (require , exports ) {

    var initColumn = require('initColumn');

    var addColumn = require('addColumn');

    var cancelColumn = require('cancelColumn');

    var delColumn = require('delColumn');

    var saveColumn = require('saveColumn');

    var updateColumn = require('updateColumn');

    exports.init = function () {

        initColumn.init();

        addColumn.init();

        cancelColumn.init();

        delColumn.init();

        saveColumn.init();

        updateColumn.init();

    }

});
$(function (){

    $.lmParam = {
        domainId:1,
        defaultValue: [
            {'type':'A','subdomain':'mail','value':'112.13.12.11','status':'1'},
            {'type':'A','subdomain':'mail2','value':'112.13.12.12','status':'2'},
            {'type':'A','subdomain':'mail3','value':'112.13.12.13','status':'0'},
        ],
        recordType:[
            {'value':'A','text':'A'},
            {'value':'CNAME','text':'CNAME'}
        ],
        tmpRecord:{},
        state:1,
        homePage:"http://www.liumapp.com",
        addDnsRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/addDnsRecord.php",
        initDataUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/initRecord.php",
        updateDnsRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/updateDnsRecord.php",
        deleteDnsRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/deleteDnsRecord.php",
        addDnsBaseUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/addDnsBaseRecord.php",
        updateDnsBaseRecordUrl:"http://localhost:8080/whmcs/vendor2/vendor/liumapp/dns/page/updateDnsBaseRecord.php"
    }

});
define('saveColumn' , function (require , exports , module) {
    var saveBtn = $('.lm-save-btn');

    exports.init = function () {
        $('body').on('click' , '.lm-save-btn' , function (){
            //here is your logic code by ajax
            var tr = $(this).parent().parent();
            $.ajax(
                {
                    url:$.lmParam.addDnsRecordUrl,
                    data:{
                        domainId:$.lmParam.domainId,
                        type:$('.lm-edit-type').val(),
                        subdomain:$('.lm-edit-subdomain').val(),
                        value:$('.lm-edit-value').val()
                    },
                    method:'post',
                    success:function(data){
                        $.lmParam.state = 1;
                        module.exports.changeTr(tr,data);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });

        $('body').on('click' , '.lm-save-base-btn' , function () {
            var tr = $(this).parent().parent();
            var dataValue = $('.lm-edit-value').val();
            $.ajax(
                {
                    url:$.lmParam.updateDnsBaseRecordUrl,
                    data:{
                        id:$.lmParam.tmpRecord[0],
                        domainId:$.lmParam.domainId,
                        type:'A',
                        subdomain:'@',
                        value:dataValue
                    },
                    method:'post',
                    success:function(index) {
                        $.lmParam.state = 1;
                        module.exports.changeBaseTr(tr , dataValue,index);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });

    };

    exports.changeBaseTr = function (tr , data , index) {
        tr.attr('class' , 'lm-tr');
        td0 = $(tr.children()[0]);
        td0.empty();
        td0.append($('<input type="checkbox" value="'+index+'">'));
        td3 = $(tr.children()[3]);
        td3.empty();
        td3.append($('<p>'+data+'</p>'));
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-base-btn">修改</a>'));

    };

    exports.changeTr = function (tr , index) {
        tr.attr('class' , 'lm-tr');
        //只修改1,2，3，4的值
        td0 = $(tr.children()[0]);
        td0.empty();
        td0.append($('<input type="checkbox" value="'+index+'">'));
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            ele.empty();
            ele.append($('<p>'+content.val()+'</p>'));
        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
    };
});

define ('updateColumn' , function (require , exports , module){
    exports.init = function () {

        $('body').on('click' , '.lm-edit-btn' , function (){
            if ($.lmParam.state == 1) {
                var tr = $(this).parent().parent();
                module.exports.saveOldData(tr);
                module.exports.updateableView(tr);
            } else {
                alert('请先保存您正在修改的解析记录');
            }
        });

        $('body').on('click' , '.lm-update-btn' , function () {
            var tr = $(this).parent().parent();
            $.ajax(
                {
                    url:$.lmParam.updateDnsRecordUrl,
                    data:{
                        domainId:$.lmParam.domainId,
                        id:$($(tr.children()[0]).children()[0]).val(),
                        type:$('.lm-edit-type').val(),
                        subdomain:$('.lm-edit-subdomain').val(),
                        value:$('.lm-edit-value').val()
                    },
                    method:'post',
                    success:function(data){
                        $.lmParam.state = 1;
                        module.exports.changeTr(tr);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });

        $('body').on('click' , '.lm-edit-base-btn' , function () {
            var tr = $(this).parent().parent();
            module.exports.saveOldData(tr);
            var title_tr = $('.lm-title-tr');
            var init = require('initColumn');
            var delColumn = require('delColumn');
            delColumn.del($(this).parent().parent());
            title_tr.after(init.baseRecord());
        });

        $('body').on('click' , '.lm-confirmEdit-base-btn' , function () {
            var tr = $(this).parent().parent();
            $.ajax(
                {
                    url:$.lmParam.updateDnsBaseRecordUrl,
                    data:{
                        domainId:$.lmParam.domainId,
                        id:$($(tr.children()[0]).children()[0]).val(),
                        type:'A',
                        subdomain:'@',
                        value:$('.lm-edit-value').val()
                    },
                    method:'post',
                    success:function(data){
                        $.lmParam.state = 1;
                        var saveColumn = require('saveColumn');
                        saveColumn.changeBaseTr(tr , this.data , data);
                    },
                    error:function(data){
                        $.lmParam.state = 2;
                    }
                });
        });
    };

    exports.changeTr = function (tr) {
        tr.attr('class' , 'lm-tr');
        //只修改2，3，4的值
        for (var i = 1 ; i < 4 ; i++ ) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            ele.empty();
            ele.append($('<p>'+content.val()+'</p>'));
        }
        //修改最后的操作
        lastTd = $(tr.children()[tr.children().length - 1]);
        lastTd.empty();
        lastTd.append($('<a href="javascript:void(0)" class="lm-edit-btn">修改</a><a href="javascript:void(0)" class="lm-delete-btn">删除</a>'));
    };

    exports.updateableView = function (tr) {
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
        lastTd.append($('<a href="javascript:void(0)" class="lm-update-btn">保存</a>&nbsp;<a href="javascript:void(0)" class="lm-back-btn">取消</a>'));
    };

    exports.saveOldData = function (tr) {
        $.lmParam.tmpRecord[0] = $($(tr.children()[0]).children()[0]).val();
        for (var i = 1 ; i < 4 ; i ++) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            var html = content.html();
            $.lmParam.tmpRecord[i] = html;
        }
    }
});
