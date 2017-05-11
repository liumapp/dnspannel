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
        td0.append($('<input type="checkbox">'));
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


