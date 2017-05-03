$(document).ready(function(){
	console.log("ready...");
	$("#openButton").on('click',function(){
		console.log("click on sidebar");
		console.log($(this).text());
		if ($(this).text()==="v")
		{
			$(this).text("^");
		$("#mySidebar").css("display", "block");
		$("#myOverlay").css("display","block");
		}
		else
		{
			$(this).text("v");
		$("#mySidebar").css("display", "none");
		$("#myOverlay").css("display","none");
		}

	});

	$("#closeButton").on("click",function(){
	});
});
