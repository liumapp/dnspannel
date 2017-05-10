$(function (){
    var addBtn = $(".lm-add-dns-record");
    var table = $(".lm-dns-table");
    var titleTr = $(".lm-title-tr");
    var recordType = [
        {value:'a',text:'A'},
        {value:'cname',text:'CNAME'}
    ];
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
        var select = $('<select></select>');
        var td0=$('<td></td>'),td1=$('<td></td>'),td2=$('<td></td>'),td3=$('<td></td>'),td4=$('<td></td>'),td5=$('<td></td>');
        var tr = $('<tr class="lm-edit-tr"></tr>');
        td0.append($('<input type="checkbox">'));
        $(recordType).each(function (n,ele) {
            select.append($('<option value="'+ele.value+'">'+ele.text+'</option>'));
        });
        td1.append(select);
        td2.append($('<input type="text">'));
        td3.append($('<input type="text">'));
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
    })
});
var delcolumn = function () {
    console.log('del column');
}
$(function (){
     $.lmParam = {
         state:1
     };
})
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