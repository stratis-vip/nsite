define(['jquery', 'vbl', 'info', 'cQ'], function ($, vbl, info, cQ) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/ui.js');
    }

    function clickStatistics() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:28:                ui.clickStatistics();
        $("#statistics")
            .on('click', function () {
                if (vbl.debug) {
                    console.log("DEBUG: in clickStatistics");
                }
                $("#dbStatus")
                    .toggle();
            });
    }

    function clickOpenOptions() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:29:                ui.clickOpenOptions();
        $("#openButton")
            .on('click', function () {
                if (vbl.debug) {
                    console.log('DEBUG: Entering clickOpenOptions');
                }
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

    function clickOpenSearch() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:43:                ui.clickOpenSearch();
        $("#openSearchButton")
            .on('click', function () {
                if (vbl.debug) {
                    console.log('DEBUG: Entering clickOpenSearch');
                }
                if ($.trim(($("#titleSearch")
                        .text())) == "Άνοιγμα Αναζήτησης") {
                    $("#titleSearch")
                        .html(" Kλείσιμο Αναζήτησης");
                    $("#mySearchBar")
                        .css("display", "block");
                } else {
                    $("#titleSearch")
                        .html(" Άνοιγμα Αναζήτησης");
                    $("#mySearchBar")
                        .css("display", "none");
                }
            });
    }

    function clickOnHeader() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:30:                ui.clickOnHeader();

        $(".searchHeader")
            .on("click", function () {
                if (vbl.debug) {
                    console.log('DEBUG: Entering clickOnHeader');
                }
                for (var i = 0, w = this.length; i < w; i++) {}
                $(this)
                    .siblings()
                    .toggle();
            });
    }

    function clickOnSetOptions() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:44:                ui.clickOnSetOptions();

        $("#setOptions")
            .on("click", function () {
                if (vbl.debug) {
                    console.log('DEBUG: |07| Entering clickOnSetOptions');
                }
                $(this)
                    .prop('disabled', true);
                //gia jekina
                jsonQueryObject = cQ.createQueryJSON();
                countQuery = cQ.countPostsFromJSONQuery(jsonQueryObject);
                cQ.executeQuery(countQuery, 1);
                require(['gA'], function (getAnartiseis) {
                    getAnartiseis.makePagination();
                });







                //
                if (vbl.debug) {
                    console.log('DEBUG: From CreateQuery |07.1| ' + cQ.countPostsFromJSONQuery(JSON.stringify(cQ.createQueryJSON())));
                }
                if (vbl.debug) {
                    console.log('DEBUG: |07| Exiting clickOnSetOptions');
                }
            });
    }

    function clickOnSearchButton() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:31:                ui.clickOnSearchButton();
        $("#searchButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering clickOnSearchButton");
                }
            });
    }

    function clickOnSearchExactlyButton() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:32:                ui.clickOnSearchExactlyButton();
        $("#searchExactlyButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering clickOnSearchExactlyButton");
                }
                //δημιουργία ερωτήματος
                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }

    function clickOnSearchByNumberButton() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:33:                ui.clickOnSearchByNumberButton();
        $("#searchByNumberButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering clickOnSearchByNumberButton");
                }
                //δημιουργία ερωτήματος
                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
            });
    }

    function changeTaxOptions() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:34:                ui.changeTaxOptions();
        $("#tax")
            .on("change", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering changeTaxOptions");
                }
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
    }

    function changeCategory() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/scripts/getCategoriesFromDB.js:36:                ui.changeCategory();
        $("#category")
            .on("change", function () {
                if (vbl.debug) {
                    console.log('DEBUG: Entering function changeCategory');
                }
                info.setDbInfo();
            });
    }

    function changeOrderOptions() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:35:                ui.changeOrderOptions();
        $("#order")
            .on("change", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering changeOrderOptions");
                }
                info.setDbInfo();
            });
    }

    function onFocusOutSearch() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:36:                ui.onFocusOutSearch();
        $("#searchText")
            .on('focusout', function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering onFocusOutSearch");
                }
                //        info.setDbInfo();
            });
    }

    function onFocusOutSearchNumber() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:37:                ui.onFocusOutSearchNumber();
        $("#searchNumberText")
            .on('focusout', function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering onFocusOutSearchNumber");
                }
                //        info.setDbInfo();
            });
    }

    function onPressToFirst() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:39:                ui.onPressToFirst();
        $("#firstButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: in function onPressToStart");
                }
                //function code
                vbl.currentId = 0;
                initializeNavBar();
            });
        //το πλήκτρο πήγαινε στην αρχή
    }

    function onPressToLast() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:40:                ui.onPressToLast();
        $("#lastButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: in function onPressToLast");
                }
                vbl.currentId = vbl.bufferSize - 1;
                initializeNavBar();
                //function code
            });
        //το πλήκτρο πήγαινε στην αρχή
    }

    function onPressToNext() {
        //Αναφέρεται στα παρακάτω σημεία
        //το πλήκτρο πήγαινε στην αρχή
        //app/main.js:41:                ui.onPressToNext();
        $("#nextButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: in function onPressNext");
                }
                vbl.currentId++;
                initializeNavBar();
                //function code
            });
    }

    function onPressToPrevious() {
        //Αναφέρεται στα παρακάτω σημεία
        //το πλήκτρο πήγαινε στην αρχή
        //app/main.js:42:                ui.onPressToPrevious();
        $("#prevButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: in function onPressToPrevous");
                }
                vbl.currentId--;
                initializeNavBar();
                //function code
            });
    }

    function initializeNavBar() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:46:                ui.initializeNavBar();
        //app/scripts/ui.js:233:                initializeNavBar();
        //app/scripts/ui.js:246:                initializeNavBar();
        //app/scripts/ui.js:261:                initializeNavBar();
        //app/scripts/ui.js:275:                initializeNavBar();
        if (vbl.debug) {
            console.log("DEBUG: in function initializeNavBar");
        }
        if (vbl.currentId + 1 > 1) {
            $("#prevButton")
                .prop('disabled', false);
            $("#firstButton")
                .prop('disabled', false);
        } else {
            $("#prevButton")
                .prop('disabled', true);
            $("#firstButton")
                .prop('disabled', true);
        }
        if (vbl.currentId < vbl.bufferSize - 1) {
            $("#nextButton")
                .prop('disabled', false);
            $("#lastButton")
                .prop('disabled', false);
        } else {
            $("#nextButton")
                .prop('disabled', true);
            $("#lastButton")
                .prop('disabled', true);
        }
        $("#infoDbRecords")
            .html(' #' + (vbl.currentId + 1) + ' από ' + vbl.bufferSize + ' ');
        navigate(vbl.currentId);
    }

    function navigate(record) {
        //Αναφέρεται στα παρακάτω σημεία
        //app/scripts/ui.js:309:        navigate(vbl.currentId);
        require(['scripts/prepareResults'], function (prepareResults) {
            if (vbl.debug) {
                console.log('DEBUG: Entering function navigate');
            }
            if (typeof vbl.buffer.length !== 'undefined') {
                prepareResults.prepareResults(vbl.buffer, record);
            } else {
                if (vbl.debug) {
                    console.log('DEBUG: Navigate disabled');
                }
            }
        });
    }

    if (vbl.debug) {
        console.log('DEBUG: Exiting app/scripts/ui.js...');
    }
    return {
        clickStatistics: clickStatistics,
        clickOpenOptions: clickOpenOptions,
        clickOnHeader: clickOnHeader,
        clickOpenSearch: clickOpenSearch,
        clickOnSearchButton: clickOnSearchButton,
        clickOnSearchExactlyButton: clickOnSearchExactlyButton,
        clickOnSearchByNumberButton: clickOnSearchByNumberButton,
        clickOnSetOptions: clickOnSetOptions,
        changeTaxOptions: changeTaxOptions,
        changeCategory: changeCategory,
        changeOrderOptions: changeOrderOptions,
        onFocusOutSearch: onFocusOutSearch,
        onFocusOutSearchNumber: onFocusOutSearchNumber,
        onPressToFirst: onPressToFirst,
        onPressToLast: onPressToLast,
        onPressToNext: onPressToNext,
        onPressToPrevious: onPressToPrevious,
        initializeNavBar: initializeNavBar
    };
});
