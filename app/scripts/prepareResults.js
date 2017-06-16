define(['jquery', 'vbl'], function ($, vbl) {
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
        var sqlDataObj = {};
        sqlDataObj = JSON.parse(data);
        if (sqlDataObj.status === 0) {
            vbl.totalPosts = sqlDataObj.count;
            var x = Math.trunc(vbl.totalPosts / 100);

            if (x === 0) {
                vbl.bufferSize = 10;
                vbl.totalPages = 0;
            } else {
                vbl.bufferSize = x * 10;
                vbl.totalPages = Math.trunc(vbl.totalPosts / vbl.bufferSize);
                if (vbl.totalPosts % vbl.bufferSize > 0) {
                    vbl.totalPages++;
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

    }
    return {
        prepareResults: prepareResults,
        fillPagination: fillPagination
    };

});
