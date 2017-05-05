filter=0;
taxOrder="ASC";
key=0;

$(document).ready(function(){
	console.log("ready...");
	$("#openButton").on('click',function(){
		if ($("#openButton").text()==="Άνοιγμα Επιλογών")
		{
			$("#openButton").html("<button class=\"w3-button\">Kλείσιμο Eπιλογών</button>");
			$("#mySidebar").css("display", "block");
			$("#openButton").removeClass("w3-theme-l3").addClass("w3-theme-l2");
		}
		else
		{
			$("#openButton").html("<button class=\"w3-button\">Άνοιγμα Επιλογών</button>");
			$("#mySidebar").css("display", "none");	
			$("#openButton").addClass("w3-theme-l3").removeClass("w3-theme-l2");
		}

	});

//filter είναι η κατηγορία των ποιημάτων. 1 Ποιητικά, 2 Λογοπλοκίες 3 Μεγάλες απορίες 4 Της ζωής Τα δεδομένα 0 Όλες οι κατηγορίες
	$("#tax").on("change",function(){
		filter=$("#tax").val();
	});

//taxOrder είναι το descent η accent για το ερώτημα στην βάση δεδομένων	
	$("#order").on("change",function(){
		var temp=$("#order").val();
		switch (temp)
		{
			case "1": taxOrder="ASC";
				break;
			case "2": taxOrder="DESC";
				break;
			default: console.log("else");


		}
	});

//key είναι το κλειδί που θα χρησιμοποιήσω για να ταξινομήσω τα αποτελέσματα. Κατά #αριθμό ή κατά ημεροομηνία έκδοσης. Αυτό έχει ουσία όταν είναι το filter = 0	
	$("#category").on("change",function(){
		key=$('input[name=cat]:checked').val();
	});
	

	$(".searchHeader").on("click",function(){
		$(this).siblings().toggle();
		console.log("dblClick on "+ $(this).name);
	});
});
