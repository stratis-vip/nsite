define(['jquery', 'vbl'], function ($, vbl) {
    function clickStatistics() {
        $("#statistics")
            .on('click', function () {
                console.log("DEBUG: in clickStatistics");
                $("#dbStatus")
                    .toggle();
            });
    }

    function clickOpenOptions() {
        $("#openButton")
            .on('click', function () {
                console.log('DEBUG: Entering clickOpenOptions');
                if ($.trim(($("#titleAllagi")
                        .text())) == "Άνοιγμα Επιλογών") {
                    $("#titleAllagi")
                        .html(" Kλείσιμο Eπιλογών");
                    $("#mySidebar")
                        .css("display", "block");
                } else {
                    $("#titleAllagi")
                        .html(" Άνοιγμα Επιλογών");
                    $("#mySidebar")
                        .css("display", "none");
                }
            });
    }

    function clickOnHeader() {
        $(".searchHeader")
            .on("click", function () {
                console.log('DEBUG: Entering clickOnHeader');
                for (var i = 0, w = Things.length; i < w; i++) {}
                $(this)
                    .siblings()
                    .toggle();
            });
    }

    function clickOnSearchButton() {
        $("#searchButton")
            .on("click", function () {
                console.log("DEBUG: Entering clickOnSearchButton");
                // require(['scripts/dbinfo'], function (info) {
                //   info.setDbInfo();
                // alert(vbl.searchText);
                // });
                //δημιουργία ερωτήματος

                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }

    function clickOnSearchExactlyButton() {
        $("#searchExactlyButton")
            .on("click", function () {
                console.log("DEBUG: Entering clickOnSearchExactlyButton");
                //δημιουργία ερωτήματος
                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }

    function clickOnSearchByNumberButton() {
        $("#searchByNumberButton")
            .on("click", function () {
                console.log("DEBUG: Entering clickOnSearchByNumberButton");
                //δημιουργία ερωτήματος
                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }

    function changeTaxOptions() {
        $("#tax")
            .on("change", function () {
                console.log("DEBUG: Entering changeTaxOptions");
                //   info.setDbInfo();
                if ($('#tax')
                    .val() > 0) {
                    $('#order')
                        .show();
                } else {
                    $('#order')
                        .hide();
                }
            });
    }

    function changeOrderOptions() {
        $("#order")
            .on("change", function () {
                console.log("DEBUG: Entering changeOrderOptions");
                // info.setDbInfo();
            });
    }

    function onFocusOutSearch() {
        $("#searchText")
            .on('focusout', function () {
                console.log("DEBUG: Entering onFocusOutSearch");
                //        info.setDbInfo();
            });
    }

    function onFocusOutSearchNumber() {
        $("#searchNumberText")
            .on('focusout', function () {
                console.log("DEBUG: Entering onFocusOutSearchNumber");
                //        info.setDbInfo();
            });
    }

    return {
        clickStatistics: clickStatistics,
        clickOpenOptions: clickOpenOptions,
        clickOnHeader: clickOnHeader,
        clickOnSearchButton: clickOnSearchButton,
        clickOnSearchExactlyButton: clickOnSearchExactlyButton,
        clickOnSearchByNumberButton: clickOnSearchByNumberButton,
        changeTaxOptions: changeTaxOptions,
        changeOrderOptions: changeOrderOptions,
        onFocusOutSearch: onFocusOutSearch,
        onFocusOutSearchNumber: onFocusOutSearchNumber
    };
});
