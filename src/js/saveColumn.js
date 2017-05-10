$(function () {
    var saveBtn = $('.lm-save-btn');

    $('body').on('click' , '.lm-save-btn' , function (){
        //here is your logic code by ajax
        if (true) {
            $.lmParam.state = 1;
        } else {
            $.lmParam.state = 2;
        }
    });
    //
    // saveBtn.on('click' ,function (){ alert(1)});
    // saveBtn.click(function () {
    //     console.log(saveBtn);
    //     //here is your logic code by ajax
    //     if (true) {
    //         $.lmParam.state = 1;
    //     } else {
    //         $.lmParam.state = 2;
    //     }
    //
    // });

})