<?php
print('opa');
include('class_lib.php');

	$link= mysqli_connect($dbServ, $dbUser,	$dbPass,	$dbDbase);
	mysqli_query($link,'set names UTF8');
	if ($result=mysqli_query($link,"SELECT * FROM `keimena` WHERE id = ".$_POST['value']))
		{
				$row = mysqli_fetch_array($result) ;
				$source=substr($row['imnia_auth'],8,2)."/".substr($row['imnia_auth'],5,2)."/".substr($row['imnia_auth'],0,4);
				echo "<div>Άυξων Αριθμός: #".$row['keimeno_id']."</div>";
				echo "<span>Ημνία συγγραφής: ".$source."</span>";
				echo "<div>Κείμενο: <br> <textarea rows=\"40\" cols=\"110\">".$row['keimeno']."</textarea></div>";	
				echo "<div>Επεξήγηση: ".$row['eksigisi']."</div>";
		}

		mysqli_free_result($result);
		mysqli_close($link);
?>
