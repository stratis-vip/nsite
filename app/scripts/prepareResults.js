define(['jquery', 'vbl'], function ($, vbl) {
    function prepareResults(sqlData, id) {
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

            if ($.trim(results[id].explanations) !== "") {
                keimeno += "<div class=\"w3-card\" style=\"width:80%;margin:auto\"><br>" + results[id].explanations + "<br></div>";
            }
        } else //έχουμε θέμα στη Βάση Δεδομένων
        {
            keimeno = sqlDataObj.message;
        }

        $('#database')
            .html(keimeno);
        $("#loader")
            .hide();
    }

    return {
        prepareResults: prepareResults
    };

});
