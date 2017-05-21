require.config({
    baseUrl: "app",
    paths: {
        "jquery": "libs/jquery.min",
        "vbl": "variables"
    }
});

require(['jquery', 'vbl'], function($, _) {
    getJsonFromPHP('app/getPhp.php')
        .then(function() {
            finishedLoad("...kai skata");
        }, function() {
            console.log('Πιάσαμε λάθος στο getJsonFromPHP');
        })
        .then(function() {
            $("#start")
                .html('apo to javascript! To antikeimneno startValue e;inai iso me ' + _.startValue);
        }, function() {
            console.log('Πιάσαμε λάθος στο finishedLoad');
        });
});

var finishedLoad = function(alma) {
    var cText = $("#progress")
        .html();
    cText += '<br>entering finishedLoad...';
    $("#progress")
        .html(cText);
    return new Promise(function(resolve, reject) {
        cText += '<br>...εντός της finishedLoad!';
        $("#progress")
            .html(cText + alma);
        a = 2;
        if (a === 1) {
            resolve(console.log('...all OK at finishedLoad'));
        } else {
            reject(new Error('...resolve on finishedload fired'));
        }
    });
};

var getJsonFromPHP = function(filename) {
    return new Promise(function(resolve, reject) {
        $.getJSON(filename, function(data) {
                console.log(JSON.stringify(data));
            })
            .done(function() {
                resolve(console.log('...resolve on getJsonFromPHP fired from done()'));
            })
            .fail(function(jqXHR, textStatus, errorThrown) {
                reject(console.log('getJSON request failed! ' + textStatus + " " + errorThrown));
            })
            .always(function() {
                console.log('getJSON request ended!');
            });
    });
};