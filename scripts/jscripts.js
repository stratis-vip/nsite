filter=0;
taxOrder="ASC";
key=0;

$(document).ready(function(){
	console.log("ready...");
	$("#openButton").on('click',function(){
		if ($(this).text()==="Άνοιγμα Φίλτρων και Επιλογών Ταξινόμησης ")
		{
			$(this).text("Κλείσιμο Φίλτρων και Eπιλογών Tαξινόμησης ");
			$("#mySidebar").css("display", "block");
			$("#myOverlay").css("display","block");
		}
		else
		{
			$(this).text("Άνοιγμα Φίλτρων και Επιλογών Ταξινόμησης ");
			$("#mySidebar").css("display", "none");
			$("#myOverlay").css("display","none");
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
});
