require.config({
    baseUrl: "app",
    paths: {
        "jquery": "libs/jquery.min",
        "vbl": "scripts/variables",
        "ui": "scripts/ui",
        "info": "scripts/dbinfo"
    }
});

require(['vbl', 'jquery', 'ui', 'info', 'scripts/nVar'], function (vbl, $, ui, info, V) {

    /*/   require(['scripts/getCategoriesFromDB'], function (getCategoriesFromDB) {
    //     getCategoriesFromDB.getCategoriesFromDB("#category");
    // });

    require(['scripts/getDatabaseStatus'], function(getDatabaseStatus) {
        getDatabaseStatus.getDatabaseStatus("#dbStatus");
    });
*/
    /*	console.log(vbl);
        $('document')
            .ready(function () {
                ui.clickStatistics();
                ui.clickOnHeader();
                ui.clickOnSearchButton();
                ui.clickOpenOptions();

    //            info.setDbInfo();
            });
        $("#tax")
            .on("change", function () {
                info.setDbInfo();
                if ($('#tax')
                    .val() > 0) {
                    $('#order')
                        .show();
                } else {
                    $('#order')
                        .hide();
                }


            });
        $("#order")
            .on("change", function () {
                info.setDbInfo();
            });
        $('#searchText')
            .on('focusout', function () {
                info.setDbInfo();
            });
        $('#searchNumberText')
            .on('focusout', function () {
                info.setDbInfo();
            });

        $("#category")
            .on("change", function () {
                info.setDbInfo();
            });
    });
    require(['jquery', 'scripts/getStartAnartiseis'], function ($, getStartAnartiseis) {
        getStartAnartiseis.getStartAnartiseis(5);
        $('#fisrtButton')
            .on('click', getStartAnartiseis.getStartAnartiseis);
    	*/
    console.log(V.someValue + JSON.stringify(V));
    require(['scripts/test'], function (t) {
        console.log('going into test...');
    console.log(V.someValue + JSON.stringify(V));

    });

});
