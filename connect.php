<?php
	include("scripts/class_lib.php"); 
	$link= mysqli_connect($dbServ, $dbUser,	$dbPass,$dbDbase);
	if (mysqli_connect_errno()) {
		printf("Connect failed: %s\n", mysqli_connect_error());
	}
	else
	{
		mysqli_query($link,"SET NAMES 'utf8'");			
		mysqli_select_db($link,'test');
		if ($result=mysqli_query($link,'select count(*) from keimena_cat'))
		{
			$row = mysqli_fetch_row($result);
			echo '<b> Κατηγορίες ('.$row[0].') : </b><br>';
			mysqli_free_result($result);				 
		};

		if ($result=mysqli_query($link,'SELECT count(*),`description` FROM `keimena`,`keimena_cat`  where `category` = `keimena_cat`.`id` group by `category`'))
		{		
			$total=0;
			while ($row = mysqli_fetch_row($result) )
			{
				echo '«'.$row[1].'» ( '.$row[0].' ) <br>';
				$total=$total+$row[0];

			}
			mysqli_free_result($result);				
			echo 'Σύνολο εγγραφών: '.$total;
		}
		else
		{echo 'Άδεια βάση δεδομένων<br>';}
	}
?>
