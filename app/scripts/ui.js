define(['jquery', 'vbl', 'info','cQ'], function ($, vbl, info,cQ) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/ui.js');
    }

    function clickStatistics() {
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
        $("#setOptions")
            .on("click", function () {
                if (vbl.debug) {
                    console.log('DEBUG: |07| Entering clickOnSetOptions');
                }
                $(this)
                    .prop('disabled', true);
		    //gia jekina
			jsonQueryObject=cQ.createQueryJSON();
		    countQuery=cQ.countPostsFromJSONQuery(jsonQueryObject);
		    cQ.executeQuery(countQuery,1);
		    require(['gA'],function(getAnartiseis)
			    {
				    getAnartiseis.makePagination();
			    });
		         






		    //
		    if (vbl.debug){console.log('DEBUG: From CreateQuery |07.1| '+cQ.countPostsFromJSONQuery(JSON.stringify(cQ.createQueryJSON())));}
		    if (vbl.debug) {
                    console.log('DEBUG: |07| Exiting clickOnSetOptions');
                }
            });
    }

    function clickOnSearchButton() {
        $("#searchButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering clickOnSearchButton");
                }
            });
    }

    function clickOnSearchExactlyButton() {
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
        $("#category")
            .on("change", function () {
                if (vbl.debug) {
                    console.log('DEBUG: Entering function changeCategory');
                }
                info.setDbInfo();
            });
    }

    function changeOrderOptions() {
        $("#order")
            .on("change", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering changeOrderOptions");
                }
                 info.setDbInfo();
            });
    }

    function onFocusOutSearch() {
        $("#searchText")
            .on('focusout', function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering onFocusOutSearch");
                }
                //        info.setDbInfo();
            });
    }

    function onFocusOutSearchNumber() {
        $("#searchNumberText")
            .on('focusout', function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering onFocusOutSearchNumber");
                }
                //        info.setDbInfo();
            });
    }

    function onPressToFirst() {
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
        //το πλήκτρο πήγαινε στην αρχή
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
        //το πλήκτρο πήγαινε στην αρχή
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
        require(['scripts/prepareResults'], function (prepR) {
            if (vbl.debug) {
                console.log('DEBUG: Entering function navigate');
            }
            if (typeof vbl.buffer.length !== 'undefined') {
                prepR.prepareResults(vbl.buffer, record);
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
