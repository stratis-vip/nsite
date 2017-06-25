define(['jquery', 'vbl', 'ui'], function ($, vbl, ui) {

    function makePagination() {
        //Αναφέρεται στα παρακάτω σημεία
        //app/scripts/ui.js:87:         getAnartiseis.makePagination();
        if (vbl.debug) {
            console.log('DEBUG: Entering getAnartiseis.makePagination...');
        }
        var paginationString = "";
        if (vbl.totalPages === 0) {
            $('#paginationPlace')
                .hide();
        } else {

            paginationString = '<ul class="pagination" style="margin: 6px 0px -10px 0px;">' +
                '<li id="prevPage" class="disabled page-item"><a  class="page-link" href="#">Προηγούμενη</a></li>' +
                '<li class="active page-item pagePointer"><a class="page-link" href="#">1</a></li>';
            for (i = 2; i < vbl.totalPages + 1; i++) {
                paginationString +=
                    '<li class="page-item pagePointer"><a class="page-link" href="#">' + i + '</a></li>';

            }
            paginationString += '<li id="nextPage" class="page-item"><a class="page-link" href="#">Επόμενη</a></li></ul>';
            vbl.setCurrentPage(1);

            $('#paginationPlace')
                .show();
            $('#paginationPlace')
                .html(paginationString);
            $('li.page-item.pagePointer')
                .on('click',
                    function () {
                        ui.onPagePress($(this));
                    });
            $('#prevPage')
                .on('click', ui.onPrevPage);
            $('#nextPage')
                .on('click', ui.onNextPage);
            ui.initializeNavBar();
        }
        if (vbl.debug) {
            console.log('DEBUG: ...exiting getAnartiseis.makePagination...');
        }
    }

    function prepareResults(sqlData, id) {
        //Αναφέρεται στα παρακάτω σημεία
        //app/scripts/createQuery.js:173:       prepareResults.prepareResults(data, vbl.currentId);
        //app/scripts/ui.js:284:                prepareResults.prepareResults(vbl.buffer, record);
        //app/scripts/getAnartiseis.js:97:      prepareResults.prepareResults(data, vbl.currentId);
        if (vbl.debug) {
            console.log('DEBUG: Entering prepareResults.js script... ');
        }
        var sqlDataObj = {};
        sqlDataObj = JSON.parse(sqlData);
        //        vbl.setBufferSize(sqlDataObj.count);
        var keimeno = "";
        if (sqlDataObj.status === 0) {
            vbl.setBufferType(sqlDataObj.type);
            if (vbl.bufferType === 0) {
                //επέστρεψε δεδομένα

                vbl.setBufferPostsNumber(sqlDataObj.count);
                var results = sqlDataObj.results;

                var katid = 0;
                keimeno += "<div id=\"keimenoInfo\">";
                katid = Number(results[id].category) - 1;
                keimeno += "Κατηγορία: " + vbl.katigories[katid].name;
                keimeno += "<br>Aριθμός καταχώρισης: " +
                    results[id].cat_id + "" +
                    "<br>Ημερομηνία συγγραφής : " + results[id].date + "</div>" +
                    "<div id=\"keimenoText\"><br>";
                for (i = 0; i < results[id].keimeno.length; i++) {
                    keimeno += results[id].keimeno[i].str + "<br>";
                }
                keimeno += "<br></div>";

                if (vbl.showExplanations) {
                    if ($.trim(results[id].explanations) !== "") {
                        keimeno += "<div class=\"w3-card\" style=\"width:80%;margin:auto\"><br>" + results[id].explanations + "<br></div>";
                    }
                }

	$("#navBar").show();

            } else {
                //επέστρεψε αριθμό εγγραφών




            }

        } else //έχουμε θέμα στη Βάση Δεδομένων
        {
            keimeno = sqlDataObj.message;
		$("#navBar").hide();
        }

        $('#database')
            .html(keimeno);
        $("#loader")
            .hide();
        if (vbl.debug) {
            console.log('DEBUG: Exiting app/scripts/prepareResults.js');
        }
    }

    function fillPagination(data) {
        //Αναφέρεται στα παρακάτω σημεία
        //app/scripts/createQuery.js:175:                        prepareResults.fillPagination(data);
        if (vbl.debug) {
            console.log('DEBUG: Entering fillPagination...');
        }
        if (vbl.debug) {
            console.log(data);
        }
        return new Promise(
            function (resolve, reject) {
                var sqlDataObj = {};
                sqlDataObj = JSON.parse(data);
                vbl.setBufferType(sqlDataObj.type);
                if (sqlDataObj.status === 0) {
                    // An το type είναι 1 έχουμε απλή καταμέτρηση των αναρτήσεων
              //      if (sqlDataObj.type === 1) {
                        vbl.setTotalPosts(sqlDataObj.count);
                        var x = Math.trunc(vbl.totalPosts / 100);

                        if (x === 0) {
                            //αν έχουμε λιγότερα από 10 αποτελέσματα τότε ο buffer θα έχει μόνο αυτά
                            if (vbl.totalPosts > 10) {
                                vbl.bufferSize = 10;
                            } else {
                                vbl.bufferSize = vbl.totalPosts;
                            }
                            vbl.totalPages = 0;
                        } else {
                            vbl.setBufferSize(25);
                            var tempPages = Math.trunc(vbl.totalPosts / vbl.bufferSize);
                            if (vbl.totalPosts % vbl.bufferSize > 0) {
                                vbl.setTotalPages(++tempPages);
                            } else {
                                vbl.setTotalPages(tempPages);
                            }
                        }
                  //  } else { //εδώ επιστρέφουν τα κανονικά αποτελέσματα!!!!
//
              //      }
                    if (vbl.debug) {
                        console.log('DEBUG: ' + vbl.totalPages + ' seλίδες με  ' + vbl.bufferSize + ' ανά σελίδα ( η τελευταία έχει ' + vbl.totalPosts % vbl.bufferSize + ')');
                    }
                } else {
                    vbl.setTotalPosts(0);
                    alert('Δεν υπάρχουν αποτελέσματα!');
                }
                if (vbl.debug) {
                    console.log('DEBUG: ...exiting fillPagination');
                }
                resolve(makePagination());
            });

    }

    return {
        prepareResults: prepareResults,
        fillPagination: fillPagination
    };

});
