define(['jquery', 'vbl'], function ($, vbl) {

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
            $('#paginationPlace')
                .show();

            paginationString = '<ul class="pagination" style="margin: 6px 0px -10px 0px;">' +
                '<li class="disabled page-item"><a class="page-link" href="#">Προηγούμενη</a></li>' +
                '<li class="active page-item"><a class="page-link" href="#">1</a></li>';
            for (i = 2; i < vbl.totalPages; i++) {
                paginationString +=
                    '<li class="page-item"><a class="page-link" href="#">' + i + '</a></li>';

            }
            paginationString += '<li class="page-item"><a class="page-link" href="#">Επόμενη</a></li></ul>';
            $('#paginationPlace')
                .html(paginationString);
            $('li.page-item')
                .on('click', function () {
                    if ($(this)
                        .hasClass('active')) {} else {
                        $('li.active')
                            .removeClass('active');
                        $(this)
                            .addClass('active');
				var off=Number($(this).text())-1;
                        require(['cQ'], function (cQ) {
                            cQ.createQuery(vbl.bufferSize, vbl.bufferSize * off);
                        });
                    }


                });
        }
        /*        var query = '';
                query += 'SELECT keimena.* FROM keimena ';

                if (Number(vbl.key) !== 0) {
                    query += '	WHERE keimena.category = ' + vbl.key;
                }
                if (Number(vbl.filter) !== 0) {
                    if (Number(vbl.filter) === 1) {
                        query += '	ORDER BY keimena.id ' + vbl.taxOrder;
                    } else {
                        query += '	ORDER BY keimena.imnia_auth ' + vbl.taxOrder;
                    }
                }
                if (vbl.debug) {
                    console.log('|||QUERY->||| ' + query);
                }*/
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
        vbl.setBufferSize(sqlDataObj.count);
        var keimeno = "";
        if (sqlDataObj.status === 0) {
            var recordsCount = sqlDataObj.count;

            var results = sqlDataObj.results;
            var apotelesma = "";
            var counter = 1;
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
        } else //έχουμε θέμα στη Βάση Δεδομένων
        {
            keimeno = sqlDataObj.message;
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
                if (sqlDataObj.status === 0) {
                    vbl.totalPosts = sqlDataObj.count;
                    var x = Math.trunc(vbl.totalPosts / 100);

                    if (x === 0) {
                        vbl.bufferSize = 10;
                        vbl.totalPages = 0;
                    } else {
                        vbl.bufferSize = 25;
                        var tempPages = Math.trunc(vbl.totalPosts / vbl.bufferSize);
                        if (vbl.totalPosts % vbl.bufferSize > 0) {
                            vbl.setTotalPages(++tempPages);
                        } else {
                            vbl.setTotalPages(tempPages);
                        }
                    }

                    if (vbl.debug) {
                        console.log('DEBUG: ' + vbl.totalPages + ' seλίδες με  ' + vbl.bufferSize + ' ανά σελίδα ( η τελευταία έχει ' + vbl.totalPosts % vbl.bufferSize + ')');
                    }
                } else {
                    vbl.totalPosts = 0;
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
