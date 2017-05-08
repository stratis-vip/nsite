filter = 0;
taxOrder = "ASC";
key = 0;
katigories = {};



$(document)
    .ready(function () {
        console.log("ready...");
        katigories = getDatabaseStatus("#dbStatus");
        getCategoriesFromDB("#category");
        setDbInfo();
    });
$("#openButton")
    .on('click', function () {
        if ($.trim(($("#titleAllagi")
                .text())) == "Άνοιγμα Επιλογών") {
            $("#titleAllagi")
                .html(" Kλείσιμο Eπιλογών");
            $("#mySidebar")
                .css("display", "block");
        } else {
            $("#titleAllagi")
                .html(" Άνοιγμα Επιλογών");
            $("#mySidebar")
                .css("display", "none");
        }

    });
$("#statistics")
    .on('click', function () {
        $("#dbStatus")
            .toggle();
    });
//filter είναι η κατηγορία των ποιημάτων. 1 Ποιητικά, 2 Λογοπλοκίες 3 Μεγάλες απορίες 4 Της ζωής Τα δεδομένα 0 Όλες οι κατηγορίες
$("#tax")
    .on("change", function () {
        filter = $("#tax")
            .val();
        setDbInfo();
    });

//taxOrder είναι το descent η accent για το ερώτημα στην βάση δεδομένων	
$("#order")
    .on("change", function () {
        var temp = $("#order")
            .val();
        switch (temp) {
        case "1":
            taxOrder = "ASC";
            break;
        case "2":
            taxOrder = "DESC";
            break;
        default:
            console.log("else");


        }
        setDbInfo();
    });

//key είναι το κλειδί που θα χρησιμοποιήσω για να ταξινομήσω τα αποτελέσματα. Κατά #αριθμό ή κατά ημεροομηνία έκδοσης. Αυτό έχει ουσία όταν είναι το filter = 0	
$("#category")
    .on("change", function () {
        key = $('input[name=cat]:checked')
            .val();
        setDbInfo();
    });


$(".searchHeader")
    .on("click", function () {
        $(this)
            .siblings()
            .toggle();
        console.log("dblClick on " + $(this)
            .name);
    });


function setDbInfo() {
    var info = "[";
    var dbKey = Number(key);
    info += "Το φίλτρο είναι " + filter + " ενώ η ταξινομηση είναι  " + taxOrder + " το κλειδί είναι " + key;
    if (dbKey === 0) {
        info += " «σε όλες τις κατηγορίες»";
    } else {
        dbKey--;
        info += " στην κατηγορία «" + katigories[dbKey].name + "»";
    }

    info += "]";
    $("#curInfo")
        .text(info);
}


function getCategoriesFromDB(selection) {
    var items = "";
    $.getJSON("scripts/getcat.php", function (data) {
        items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=0> Όλες οι κατηγορίες<br>";
        $.each(data, function (index, item) {
            items += "<input class=\"w3-radio\" type=\"radio\" name=\"cat\" value=" + item.ID + "> " + item.Name + "<br>";
        });
        $(selection)
            .html(items);
        $("input[name=cat]")
            .val([0]);
    });
}

function getDatabaseStatus(selection) {
    var items = "";
    $.getJSON("scripts/connect.php", function (data) {
        items += '<p>';
        if (data.status === 0) {
            items += '<div class="w3-indigo" style="width:auto">' + data.message + '</div>' +
                '<div class="w3-sand" style="width:auto">';
            var postNumber = 0;
            for (i = 0; i < data.categories.length; i++) {
                postNumber += data.categories[i].count;
                items += '<span style="font-weight:bold">' + data.categories[i].name + ':</span>' + data.categories[i].count + ' εγγραφές<BR>';
                $(selection)
                    .html(items + '<p>');
                katigories = data.categories;

            }
            items += '</div><div style="font-weight:bold" class="w3-light-blue"><span style="font-weight:bold">Συνολικές εγγραφές:<span> ' + postNumber + '</div></div>';
            console.log(data.categories.length);
        } else {
            items += '<div class="w3-panel w3-red"> ' + data.message + '</div>';
            $(selection)
                .html(items + '<p>');
            katigories = null;
        }
    });
}
