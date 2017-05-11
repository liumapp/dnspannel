$(function () {
    $('body').on('click' , '.lm-cancel-btn' ,function (){
        $.lmParam.state = 1;
        $(this).parent().parent().remove();
    })
});{}