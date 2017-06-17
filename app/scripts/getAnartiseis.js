define(['jquery', 'vbl', 'info', 'scripts/prepareResults'], function ($, vbl, info, prepareResults) {
    if (vbl.debug) {
        console.log('DEBUG: Entering script app/scripts/getAnartiseis.js');
    }

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
            alert(vbl.totalPages);

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
$('li.page-item').on('click',function(){
         	if ($(this).hasClass('active')){}else{	
	       $('li.active').removeClass('active');
		$(this).addClass('active');
		var off=$('#forDebug').text($(this));
	      require(['cQ'],function(cQ){
	      cQ.CreateQuery(vbl.bufferSize,vbl.bufferSize*off);
	      });}

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

    function getAnartiseis(count, offset) {
        //Αναφέρεται στα παρακάτω σημεία
        //app/main.js:45:                getAnartiseis.getAnartiseis(10, 0);
        //χτίζω το ερώτημα στη βάση.
        if (vbl.debug) {
            console.log('DEBUG: |02| in getAnartiseis...');
        }
        var query = '';
        var queryForCount = '';
        $("#loader")
            .show();

        query += 'SELECT keimena.* FROM keimena ';
        queryForCount += 'SELECT count(*) FROM keimena ';
        //vbl.key = 0;
        var queryPart = '';
        if (Number(vbl.key) !== 0) {
            queryPart += '	WHERE keimena.category = ' + vbl.key;

        }
        if (Number(vbl.filter) !== 0) {
            if (Number(vbl.filter) === 1) {
                queryPart += '	ORDER BY keimena.id ' + vbl.taxOrder;
            } else {
                queryPart += '	ORDER BY keimena.imnia_auth ' + vbl.taxOrder;
            }
        }
        queryForCount += queryPart;
        // if (offset > 0) {
        //      query += ' OFFSET ' + offset;
        //  }
        if (vbl.debug) {
            console.log('DEBUG: |02| query to database= ' + query);
        }
        $.ajax({
            type: "POST",
            url: "app/scripts/php/getTheResults.php",
            data: {
                "value": queryForCount,
                "typeofquery": 1
            },
            success: function (data) {

                prepareResults.fillPagination(data);
                query += ' LIMIT ' + vbl.bufferSize;


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
                        //
                       // makePagination();

                        //
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
                    },
                    datatype: "json"
                });
            },
            datatype: "json"
        });
        if (vbl.debug) {
            console.log('DEBUG: leaving getStartAnartiseis!');
        }
    }

    return {
        getAnartiseis: getAnartiseis
//        makePagination: makePagination

    };
});
