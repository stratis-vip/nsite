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
				
				$('#searchText').val('');
				$('#searchNumberText').val('');
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
		    $('#paginationPlace').hide();
		    $('#navBar').hide();
                //gia jekinoa
                vbl.setCurrentId(-1);
                jsonQueryObject = cQ.createQuery(25, 0);
                var countQuery = cQ.countPostsFromJSONQuery(jsonQueryObject);
                cQ.executeQuery(countQuery, 1);
                paginate();
                cQ.executeQuery(cQ.queryFromJSON(jsonQueryObject), 0);

                require(['gA', 'scripts/prepareResults'], function (getAnartiseis, prepareResults) {
                    info.collectInfo();
                    //.then(
                    // prepareResults.fillPagination());
                });
                //
                if (vbl.debug) {
                    console.log('DEBUG: From CreateQuery |07.1| ' + cQ.countPostsFromJSONQuery(JSON.stringify(cQ.createQuery())));
                }
                if (vbl.debug) {
                    console.log('DEBUG: |07| Exiting clickOnSetOptions');
                }
            });
    }

    function clickOnSearchButton() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:32:                ui.clickOnSearchExactlyButton();
        $("#searchButton")
            .on("click", function () {
                if (vbl.debug) {
                    console.log("DEBUG: Entering clickOnSearchExactlyButton");
                }
                var query = cQ.createQuery(0, 0);
                var searchText = $('#searchText')            .val();
                if (query.where === null) {
                    query.where = [];
                }
                query.where.push({
                    "wTerm": " keimeno LIKE \"%" + searchText + '%\"'
                });
                var countQuery = cQ.countPostsFromJSONQuery(query);
                cQ.executeQuery(countQuery, 1);
                paginate();
                cQ.executeQuery(cQ.queryFromJSON(query), 0);
                //  require(['scripts/prepareResults'], function (prepareResults) {
                //    prepareResults.fillPagination(vbl.buffer);


                if (vbl.debug) {
                    console.log('DEBUG: searchText=' + searchText + "  query= " + cQ.createQuery(query));
                }

                if (vbl.debug) {
                    console.log('DEBUG: ...exiting clickOnSearchButton');
                }
                //δημιουργία ερωτήματος
                //αποστολή ερωτήματος
                //εμφάνιση αποτελεσμάτων
                // });
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

                var query = cQ.createQuery(0, 0);
                var searchText = Number($('#searchNumberText')
                    .val());
		    $('#searchNumberText').val(searchText);
                if (query.where === null) {
                    query.where = [];
                }
                query.where.push({
                    "wTerm": " keimeno_id LIKE \"" + searchText + '\"'
                });
		
var countQuery = cQ.countPostsFromJSONQuery(query);
                cQ.executeQuery(countQuery, 1);
                paginate();
                cQ.executeQuery(cQ.queryFromJSON(query), 0);



                require(['scripts/prepareResults'], function (prepareResults) {
                    prepareResults.fillPagination(vbl.buffer);
                });

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

		    $('#setOptions').prop('disabled',false );
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
		    $('#setOptions').prop('disabled', false);
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
                vbl.setCurrentId(0);
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
                vbl.setCurrentId(vbl.bufferPostsNumber - 1);
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
                vbl.incCurrentId();
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
                vbl.decCurrentId();
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
        if (vbl.bufferType === 0) {
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
            if (vbl.currentId < vbl.bufferPostsNumber - 1) {
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
                .html(' #' + (vbl.currentId + 1) + ' από ' + vbl.bufferPostsNumber + ' ');
            navigate(vbl.currentId);
		$('#navBar').show();
        }
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

    function paginate() {
        $('li.page-item')
            .on('click', function () {
                $('li.active')
                    .removeClass('active');
                $(this)
                    .addClass('active');
                $('#forDebug')
                    .text($(this)
                        .text());
            });
    }

    function onNextPage() {
        if (vbl.currentPage < vbl.totalPages) {
            vbl.incCurrentPage();
            var button = $('#paginationPlace > ul > li:contains("' + vbl.currentPage + '"):first');
            if (button !== undefined) {
                onPagePress(button);
            }
        } else {
            //disabled
            $('#nextPage')
                .addClass('disabled');
        }
    }

    function onPrevPage() {
        if (vbl.currentPage > 1) {
            vbl.decCurrentPage();
            var button = $('#paginationPlace > ul > li:contains("' + vbl.currentPage + '"):first');
            if (button !== undefined) {
                onPagePress(button);
            }
        } else {
            $('#prevPage')
                .addClass('disabled');
            //disabled
        }
    }


    function onPagePress(pageNumber) {
        var newPageQuery = '';

        if (vbl.debug) {
            console.log('DEBUG: into page ' + Number($(this)
                .text()) + ' click ');
        }

        if (pageNumber.hasClass('active')) {} else { //elseThis
            $('li.active')
                .removeClass('active');
            pageNumber
                .addClass('active');
            var off = Number(pageNumber
                .text());

            vbl.setCurrentPage(off);
            switch (off) {
            case 1:
                $('#prevPage')
                    .addClass('disabled');
                break;
            case vbl.totalPages:
                $('#nextPage')
                    .addClass('disabled');
                break;
            default:
                $('#nextPage')
                    .removeClass('disabled');
                $('#prevPage')
                    .removeClass('disabled');
                break;
            }
            require(['cQ'], function (cQ) {
                newPageQuery = cQ.createQuery(vbl.bufferSize, vbl.bufferSize * (off - 1));
                vbl.setCurrentId(-1);
                cQ.executeQuery(cQ.queryFromJSON(newPageQuery), 0);
                initializeNavBar();
                if (vbl.debug) {
                    console.log('DEBUG: exiting click on page ' + Number(pageNumber
                        .text()) + '  newPageQuery= ' + newPageQuery);
                }

            });
        }


    } //end function:
    if (vbl.debug) {
        console.log('DEBUG: Exiting app/scripts/ui.js...');
    }
    return {
        clickStatistics: clickStatistics,
        clickOpenOptions: clickOpenOptions,
        clickOnHeader: clickOnHeader,
        clickOpenSearch: clickOpenSearch,
        clickOnSearchButton: clickOnSearchButton,
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
        onPagePress: onPagePress,
        onNextPage: onNextPage,
        onPrevPage: onPrevPage,
        initializeNavBar: initializeNavBar,
        paginate: paginate
    };
});
