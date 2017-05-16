define('main',function (require , exports ) {

    var initColumn = require('initColumn');

    var addColumn = require('addColumn');

    var cancelColumn = require('cancelColumn');

    var delColumn = require('delColumn');

    var saveColumn = require('saveColumn');

    var updateColumn = require('updateColumn');

    exports.init = function () {

        initColumn.init();

        addColumn.init();

        cancelColumn.init();

        delColumn.init();

        saveColumn.init();

        updateColumn.init();

    }

});