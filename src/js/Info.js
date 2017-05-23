define ('info' , function (require , exports , module) {

    var table = $('.lm-dns-table');

    exports.init = function () {

        var tr = $('<tr></tr>');

        var td = $('<td colspan="6"></td>');

        var msg = $('<p>提示：A记录的@主机记录表示您的根域名解析</p>');

        td.append(msg);

        tr.append(td);

        table.append(tr);

    }


});