define(['jquery', 'vbl', 'info'], function ($, vbl, info) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/getAnartiseis.js');
    }

    function makePagination() {
        if (vbl.debug) {
            console.log('DEBUG: Entering getAnartiseis.makePagination...');
        }
	    var paginationString="";
	    if (vbl.totalPages===0)
	    {
		    $('#paginationPlace').hide();
	    }
//	    alert(vbl.totalPages);
	    /* for (i=0;i<vbl.totalPages;i++){
	    paginationString=+
	    
	    
	    <li class="page-item"><a class="page-link" href="#">Προηγούμενη</a></li>
            <li class="page-item"><a class="page-link" href="#">1</a></li>
            <li class="page-item"><a class="page-link" href="#">2</a></li>
            <li class="page-item"><a class="page-link" href="#">3</a></li>
            <li class="page-item"><a class="page-link" href="#">Επόμενη</a></li>*/
	    

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

    function getAnartiseis(count, offset) {
        //χτίζω το ερώτημα στη βάση.
        if (vbl.debug) {
            console.log('DEBUG: |02| in getAnartiseis...');
        }
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
        if (vbl.debug) {
            console.log('DEBUG: |02| query to database= ' + query);
        }
        $.ajax({
            type: "POST",
            url: "app/scripts/php/getTheResults.php",
            data: {
                "value": query,
                "typeofquery": 0
            },
            success: function (data) {
                if (vbl.debug) {
                    console.log('DEBUG: |02| AJAX returns in getStartAnartiseis');
                }
                require(['scripts/prepareResults'], function (prepareResults) {
                    vbl.setCurrentId(vbl.currentId + 1);
                    vbl.setBuffer(data);
                    if (vbl.debug) {
                        console.log('DEBUG: ...leaving temprarily app/scripts/getAnartiseis.js to execute prepareResults.prepareResults()...');
                    }
                    prepareResults.prepareResults(data, vbl.currentId);
                    if (vbl.debug) {
                        console.log('DEBUG: ...return from prepareResults.');
                    }
                    $("#infoDbRecords")
                        .html(' #' + (vbl.currentId + 1) + ' από ' + vbl.bufferSize + ' ');
                });
            },
            datatype: "json"
        });
        if (vbl.debug) {
            console.log('DEBUG: leaving getStartAnartiseis!');
        }
    }
    return {
        getAnartiseis: getAnartiseis,
        makePagination: makePagination

    };
});
