$(function () {

    var saveBtn = $('.lm-save-btn');

    $('body').on('click' , '.lm-save-btn' , function (){
        //here is your logic code by ajax
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
            success:function(result){
                console.log(result);
                $.lmParam.state = 1;
            },
            error:function(result){
                $.lmParam.state = 2;
            }
        });
    });

});