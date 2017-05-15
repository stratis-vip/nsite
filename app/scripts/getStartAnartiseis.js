define(['jquery'], function ($) {
    function getStartAnartiseis(count) {
        require(['scripts/variables'], function (vbl) {
            //χτίζω το ερώτημα στη βάση.
            var query = '';

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
            query += ' LIMIT ' + count;
            $.ajax({
                type: "POST",
                url: "app/scripts/php/getTheResults.php",
                data: {"value":query},
                success: function (data) {
                    $("#database")
                        .html(data);
                },
                datatype: "json"
            });
        });
    }
    return {
        getStartAnartiseis: getStartAnartiseis
    };
});
