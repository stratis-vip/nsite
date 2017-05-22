require.config({
    baseUrl: "app",
    paths: {
        "jquery": "libs/jquery.min",
        "vbl": "scripts/variables",
        "ui": "scripts/ui",
        "info": "scripts/dbinfo",
        "gC": "scripts/getCategoriesFromDB",
        "gD": "scripts/getDatabaseStatus",
        "gS": "scripts/getStartAnartiseis"
    }
});

require(['vbl', 'jquery', 'ui', 'info', 'gC', 'gD', 'gS'],
    function(vbl, $, ui, info, getCategoriesFromDB, getDatabaseStatus, getStartAnartiseis) {
        getCategoriesFromDB.getCategoriesFromDB("#category");
        getDatabaseStatus.getDatabaseStatus("#dbStatus");
        $('document')
            .ready(function() {
                ui.clickStatistics();
                ui.clickOpenOptions();
                ui.clickOnHeader();
                ui.clickOnSearchButton();
                ui.clickOnSearchExactlyButton();
                ui.clickOnSearchByNumberButton();
                ui.changeTaxOptions();
                ui.changeOrderOptions();
                ui.onFocusOutSearch();
                ui.onFocusOutSearchNumber();

                ui.onPressToFirst();
                ui.onPressToLast();
                ui.onPressToNext();
                ui.onPressToPrevious();
                getStartAnartiseis.getStartAnartiseis(10);
                ui.initializeNavBar();

            });
        /*
         $("#category")
            .on("change", function () {
                info.setDbInfo();
            });
    });
    require(['jquery', 'scripts/getStartAnartiseis'], function ($, getStartAnartiseis) {
        $('#fisrtButton')
            .on('click', getStartAnartiseis.getStartAnartiseis);
    
    require(['scripts/test'], function (t) {
        console.log('going into test...');
        console.log(V.someValue + JSON.stringify(V));

    });
*/
    });