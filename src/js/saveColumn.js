$(function () {

    var saveBtn = $('.lm-save-btn');

    $('body').on('click' , '.lm-save-btn' , function (){
        //here is your logic code by ajax
        var tr = $(this).parent().parent();
        $.ajax(
        {
            url:$.lmParam.addDnsRecordUrl,
            data:{
                uid:$.lmParam.uid,
                domainId:$.lmParam.domainId,
                type:$('.lm-edit-type').val(),
                subdomain:$('.lm-edit-subdomain').val(),
                value:$('.lm-edit-value').val()
            },
            method:'post',
            success:function(data){
                if(data == 'success') {
                    $.lmParam.state = 1;
                    changeTr(tr);
                }
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
    }

});
