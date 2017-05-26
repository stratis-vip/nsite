define(['jquery', 'vbl', 'info'], function ($, vbl, info) {
    console.log('DEBUG: Entering script app/scripts/getAnartiseis.js');

    function getAnartiseis(count, offset) {
        //χτίζω το ερώτημα στη βάση.
        console.log('DEBUG: in getAnartiseis...');
        var query = '';
        $("#loader")
            .show();
        query += 'SELECT keimena.* FROM keimena ';
        //vbl.key = 0;

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
        query += ' LIMIT ' + count;
        if (offset > 0) {
            query += ' OFFSET ' + offset;
        }
        console.log('DEBUG: query to database= ' + query);
        $.ajax({
            type: "POST",
            url: "app/scripts/php/getTheResults.php",
            data: {
                "value": query,"typeofquery":0
            },
            success: function (data) {
                console.log('DEBUG: AJAX returns in getStartAnartiseis');
                require(['scripts/prepareResults'], function (prepareResults) {
                    vbl.setCurrentId(vbl.currentId + 1);
                    vbl.setBuffer(data);
                    console.log('DEBUG: vbl.buffer = ' +JSON.stringify(vbl.buffer));
                    prepareResults.prepareResults(data, vbl.currentId);

                    $("#infoDbRecords")
                        .html(' #' + (vbl.currentId + 1) + ' από ' + vbl.bufferSize + ' ');
                });
            },
            datatype: "json"
        });
        console.log('DEBUG: leaving getStartAnartiseis!');
    }
    return {
        getAnartiseis: getAnartiseis
    };
});
