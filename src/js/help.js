define ( 'help' , function (require , exports , module) {

    var container = $('<div class="lm-help-msg"></div>');

    var baseData = 'this is baseData';

    var selectData = 'this is select data';

    var typeData = 'this is type data';

    var valueData = 'this is value data';

    exports.init = function () {

        $('body').on('click' , '.lm-edit-base-btn' , function () {
            module.exports.helpStart();
        });

        $('body').on('click' , '.lm-edit-btn' , function () {
            module.exports.helpStart();
        });

        $('body').on('click' , '.lm-add-dns-record' , function () {
            module.exports.helpStart();
        });

    };

    // send me the tr by $
    exports.helpStart = function () {

        var ele = $('.lm-edit-tr');

        container.append(baseData);

        ele.append(container);

        $('body').on('mouseenter' , 'select[class=lm-edit-type]' ,function () {

            module.exports.selectFocus($(this));

        });

        $('body').on('mouseenter' , 'input[class=lm-edit-subdomain]' , function () {

            module.exports.typeFocus($(this));

        });

        $('body').on('mouseenter' , 'input[class=lm-edit-value]' , function () {

            module.exports.valueFocus($(this));

        });



    };

    exports.selectFocus = function (ele) {

        $('.lm-help-msg').attr('class' , 'lm-help-msg onSelect');
        $('.lm-help-msg').empty();
        $('.lm-help-msg').append(selectData);

    };

    exports.typeFocus = function (ele) {

        $('.lm-help-msg').attr('class' , 'lm-help-msg onType');
        $('.lm-help-msg').empty();
        $('.lm-help-msg').append(typeData);

    };

    exports.valueFocus = function (ele) {

        $('.lm-help-msg').attr('class' , 'lm-help-msg onValue');
        $('.lm-help-msg').empty();
        $('.lm-help-msg').append(valueData);

    };

});

