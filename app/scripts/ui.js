define(['jquery','vbl'], function ($,vbl) {
    function clickStatistics() {
            $("#dbStatus").toggle();       
    }

    function clickOpenOptions() {
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
    }

    function clickOnHeader() {
        $(".searchHeader")
            .on("click", function () {
                $(this)
                    .siblings()
                    .toggle();
            });
    }

    function clickOnSearchButton() {
        $("#searchButton")
            .on("click", function () {
                require(['scripts/dbinfo'], function (info) {
                    info.setDbInfo();
                    alert(vbl.searchText);
                });
                //δημιουργία ερωτήματος

                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }

    function clickOnSearchExactlyButton() {
        $("#searchExactlyButton")
            .on("click", function () {
                //δημιουργία ερωτήματος
                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }

    function clickOnSearchByNumberButton() {
        $("#searchByNumberButton")
            .on("click", function () {
                //δημιουργία ερωτήματος
                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }



    return {
        clickStatistics: clickStatistics,
        clickOpenOptions: clickOpenOptions,
        clickOnHeader: clickOnHeader,
        clickOnSearchButton: clickOnSearchButton,
        clickOnSearchExactlyButton: clickOnSearchExactlyButton,
        clickOnSearchByNumberButton: clickOnSearchByNumberButton
    };
});
