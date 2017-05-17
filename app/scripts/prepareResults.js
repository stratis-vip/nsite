define(['jquery'], function ($) {
    function prepareResults(sqlData) {
        //τα δεδομένα γυρνάνε στη μορφή
        //{"status": 0, 
        //"message": "Βρέθηκαν 5 εγγραφές", 
        //"count": 5, 
        //"results": [
        //{"id": 1, 
        //"cat_id": -17, 
        //"keimeno": [
        //{"str":"Το μόνο που κινήθηκε στο μπαλκόνι, ήταν η σκιά της, πάνω στις γλάστρες και τον τοίχο. "},
        //{"str":"Η ματιά της σκάλωσε θαρρείς στον ορίζοντα, καθώς κοίταζε κάπου πιο μακριά... "},
        //{"str":"Έψαχνε θαρρείς να βρει, γραμμένες στο άπειρο απαντήσεις! "},
        //{"str":" "},
        //{"str":"Ξεψάχνιζε τον ορίζοντα να βρει, γιατί καίγεται η καρδιά της, "},
        ///{"str":"γιατί το μυαλό της κλείδωσε σε μια μόνο σκέψη! "},
        //{"str":"Πως τα μάτια της θολώσανε απ\' το καημό, "},
        //{"str":"πως η ψυχή της κλειδώθηκε στο πόνο... "},
        //{"str":" "},
        //], 
        //"category": 1, 
        //"date": "2013-10-14", 
        //"explanations": "", 
        //"publications": [
        //{"date": "2013-10-14", 
        //"link": "http://goo.gl/Dw9EMg", 
        //"parseis": "Δημοσίευση στο Facebook"}, 
        //{"date": "2014-10-16", 
        //"link": "http://goo.gl/xzsW0O", 
        //"parseis": "Δημοσίευση στον τεχνοΠράξις"}
        //]
        //},
        //{"id": 2, 
        //"cat_id": -29, 
        //"keimeno": [
        //{"str":"Δεν με ενόχλησε που το όνειρο μου ήταν λυπημένο, αλλά που ήσουν το όνειρο μου..."}], 
        //"category": 2, 
        //"date": "1996-01-01", 
        //"explanations": "Επισημαίνει την ανάγκη του ανθρώπου να επενδύσει συναισθηματικά αλλά και κυριολεκτικά σε ανθρώπους και πράγματα ταπεινής αξίας.", 
        //"publications": [
        //{"date": "2013-04-19", 
        //"link": "https://www.facebook.com/stratis.vip/posts/10200160301148699", 
        //"parseis": "Δημοσίευση στο Facebook"}
        //]
        //},
        //}]}
        var sqlDataObj = JSON.parse(sqlData);
        var recordsCount = sqlDataObj.count;

        var results = sqlDataObj.results;
        var apotelesma = "";
        var counter = 1;
        Object.keys(results)
            .forEach(function (key) {

                console.log(key, results[key]);

            });

        $('#database')
            .html("SDF");
    }

    return {
        prepareResults: prepareResults
    };

});
