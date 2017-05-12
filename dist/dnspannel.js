$(function (){
    var addBtn = $(".lm-add-dns-record");
    var table = $(".lm-dns-table");
    var titleTr = $(".lm-title-tr");
    addBtn.click(function (){
        if ($.lmParam.state == 1) {
            var tr = buildColumn();
            titleTr.after(tr);
            $.lmParam.state = 2;
        } else {
            alert('当前有尚未保存的记录！');
        }
    });

    var buildColumn = function () {
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
$(function () {
    $('body').on('click' , '.lm-cancel-btn' ,function (){
        $.lmParam.state = 1;
        $(this).parent().parent().remove();
    });

    $('body').on('click' , '.lm-back-btn' , function () {
        $.lmParam.state = 1;
        tr = $(this).parent().parent();
        changeTr(tr);
    });

    var changeTr = function (tr) {
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
    }
});


$(function () {
    $('body').on('click' , '.lm-delete-btn' ,function () {
        if (confirm('您确定要删除吗？')) {
            var tr = $(this).parent().parent();
            $.ajax({
                url:$.lmParam.deleteDnsRecordUrl,
                method:"post",
                data: {
                    id:$($(tr.children()[0]).children()[0]).val()
                },
                success: function (data) {

                    tr.remove();

                }
            });
        }
    });

});
$(function () {
    window.onload = function () {
        var titleTr = $(".lm-title-tr");
        $.ajax({
            'url': $.lmParam.initDataUrl,
            'method': 'get',
            success : function (data) {
                data = eval(data);
                $(data).each (function (){
                    titleTr.after(dataColumn(this));
                });
            }

        });
    };

    var dataColumn = function (data) {
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
    }

});



$(function (){

    $.lmParam = {
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
    }
});
$(function () {

    var saveBtn = $('.lm-save-btn');

    $('body').on('click' , '.lm-save-btn' , function (){
        //here is your logic code by ajax
        var tr = $(this).parent().parent();
        $.ajax(
        {
            url:$.lmParam.addDnsRecordUrl,
            data:{
                type:$('.lm-edit-type').val(),
                subdomain:$('.lm-edit-subdomain').val(),
                value:$('.lm-edit-value').val()
            },
            method:'post',
            success:function(data){
                $.lmParam.state = 1;
                changeTr(tr,data);
            },
            error:function(data){
                $.lmParam.state = 2;
            }
        });
    });

    var changeTr = function (tr,index) {
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
    }

});

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

    $('body').on('click' , '.lm-update-btn' , function () {
        var tr = $(this).parent().parent();
        $.ajax(
            {
                url:$.lmParam.updateDnsRecordUrl,
                data:{
                    id:$($(tr.children()[0]).children()[0]).val(),
                    type:$('.lm-edit-type').val(),
                    subdomain:$('.lm-edit-subdomain').val(),
                    value:$('.lm-edit-value').val()
                },
                method:'post',
                success:function(data){
                    $.lmParam.state = 1;
                    changeTr(tr);
                },
                error:function(data){
                    $.lmParam.state = 2;
                }
            });
    });

    var changeTr = function (tr) {
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
        lastTd.append($('<a href="javascript:void(0)" class="lm-update-btn">保存</a>&nbsp;<a href="javascript:void(0)" class="lm-back-btn">取消</a>'));

    };

    var saveOldData = function (tr) {
        for (var i = 1 ; i < 4 ; i ++) {
            var ele = $(tr.children()[i]);
            var content = $(ele.children()[0]);
            var html = content.html();
            $.lmParam.tmpRecord[i] = html;
        }
    };



});