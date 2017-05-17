require.config({
    baseUrl: "app",
    paths: {
        "jquery": "libs/jquery.min"
    }
});

require(['jquery', 'scripts/ui'], function ($, ui) {

    require(['scripts/getCategoriesFromDB'], function (getCategoriesFromDB) {
        getCategoriesFromDB.getCategoriesFromDB("#category");
    });

    require(['scripts/getDatabaseStatus'], function (getDatabaseStatus) {
        getDatabaseStatus.getDatabaseStatus("#dbStatus");
    });

    $("#statistics")
        .on('click', ui.clickStatistics);
    ui.clickOnHeader();
    ui.clickOnSearchButton();
    $("#openButton")
        .on('click', ui.clickOpenOptions);

    require(['scripts/dbinfo'], function (info) {
        info.setDbInfo();
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

    });

});
