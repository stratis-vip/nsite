$(document).ready(function(){
	console.log("ready...");
	$("#openButton").on('click',function(){
		console.log("click on sidebar");
		$("#mySidebar").css("display", "block");
		$("#myOverlay").css("display","block");
	});

	$("#closeButton").on("click",function(){
		$("#mySidebar").css("display", "none");
		$("#myOverlay").css("display","none");
	});
});
