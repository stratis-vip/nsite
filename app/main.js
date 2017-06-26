require.config({
    baseUrl: "app",
    paths: {
        "jquery": "libs/jquery.min",
        "vbl": "scripts/variables",
        "bs": "libs/bootstrap.min",
        "ui": "scripts/ui",
        "info": "scripts/dbinfo",
        "gC": "scripts/getCategoriesFromDB",
        "gD": "scripts/getDatabaseStatus",
        "gA": "scripts/getAnartiseis",
        "cQ": "scripts/createQuery"
    }
});

require(['vbl', 'jquery', 'ui', 'info', 'gD', 'gC', 'cQ', 'gA', 'bs'],
    function (vbl, $, ui, info, getDatabaseStatus, getCategoriesFromDB, cQ, getAnartiseis, bs) {
        if (vbl.debug) {
            console.log('<------------------------REAL DEBUG START -------------------->');
            console.log('DEBUG: Entering require function in script app/main.js...');
        }
        getCategoriesFromDB.getCategoriesFromDB("#category");
        getDatabaseStatus.getDatabaseStatus("#dbStatus");
        $('document')
            .ready(function () {
                $('#searchButton')
                    .prop("disabled", true);
                $('#searchByNumberButton')
                    .prop("disabled", true);
                ui.clickStatistics();
                ui.clickOpenOptions();
                ui.clickOnHeader();
                ui.clickOnSearchButton();
                ui.clickOnSearchByNumberButton();
                ui.changeTaxOptions();
                ui.changeOrderOptions();
                ui.onFocusOutSearch();
                ui.onFocusOutSearchNumber();

                ui.onPressToFirst();
                ui.onPressToLast();
                ui.onPressToNext();
                ui.onPressToPrevious();
                ui.clickOpenSearch();
                ui.clickOnSetOptions();
                getAnartiseis.getAnartiseis(10, 0);
                $('#searchText')
                    .on('input', function () {
                        if ($('#searchText')
                            .val()
                            .length > 2) {
                            $('#searchButton')
                                .prop("disabled", false);
                        } else {
                            $('#searchButton')
                                .prop("disabled", true);
                        }
                    });
                $('#searchNumberText')
                    .on('input', function () {
                        if (Number.isInteger(Number($('#searchNumberText')
                                .val()))) {
                            $('#searchByNumberButton')
                                .prop("disabled", false);
                        } else {
                            $('#searchByNumberButton')
                                .prop("disabled", true);
                        }

                    });







                if (vbl.debug) {
                    console.log('DEBUG: Exiting app/main.js');
                }
            });
    });
