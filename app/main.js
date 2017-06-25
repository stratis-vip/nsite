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
                $("#setOptions")
                    .prop("disabled", true);
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
                ui.clickOpenSearch();
                ui.clickOnSetOptions();
                getAnartiseis.getAnartiseis(10, 0);
//                ui.initializeNavBar();
  //              info.collectInfo()
    //                .then($("#forDebug")
      //                  .text(cQ.countPostsFromJSONQuery(cQ.createQuery())));
                if (vbl.debug) {
                    console.log('DEBUG: Exiting app/main.js');
                }
            });
    });
