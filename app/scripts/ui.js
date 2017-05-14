define(['jquery'], function ($) {
    function clickStatistics() {
        require(['scripts/variables'], function (vbl) {
            $("#dbStatus")
                .toggle();
        });
    }

    function clickOpenOptions() {
        require(['scripts/variables'], function (vbl) {
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
                $(this)
                    .siblings()
                    .toggle();
            });
    }


    return {
        clickStatistics: clickStatistics,
        clickOpenOptions: clickOpenOptions,
        clickOnHeader: clickOnHeader
    };
});
