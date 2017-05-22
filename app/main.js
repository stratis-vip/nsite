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
    function (vbl, $, ui, info, getCategoriesFromDB, getDatabaseStatus, getStartAnartiseis) {
        getCategoriesFromDB.getCategoriesFromDB("#category");
        getDatabaseStatus.getDatabaseStatus("#dbStatus");
        $('document')
            .ready(function () {
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

                getStartAnartiseis.getStartAnartiseis(5);

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
        console.log('DEBUG: vbl=' + JSON.stringify(vbl));
        console.log('DEBUG: vbl.key=' + vbl.key);
    });
