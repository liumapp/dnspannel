$(function () {
    $('body').on('click' , '.lm-delete-btn' ,function () {
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


    });

});