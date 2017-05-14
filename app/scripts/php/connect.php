<?php
	include("class_lib.php"); 
$dbServ1="test";
	$link= mysqli_connect($dbServ, $dbUser,$dbPass,$dbDbase);
	echo '{ "status":';
	if (!$link) {
		echo  mysqli_connect_errno().',"message":"Αδυναμία Σύνδεσης. Επικοινωνήστε με τον διαχειριστή"}';
		exit;
	}
	else
	{
		echo '0,"message":"Επιτυχής σύνδεση '.$dbServ.'",';
		mysqli_query($link,"SET NAMES 'utf8'");			
		mysqli_select_db($link,'test');
		echo '"categories":[';

		if ($result=mysqli_query($link,'SELECT count(*),`description` FROM `keimena`,`keimena_cat`  where `category` = `keimena_cat`.`id` group by `category`'))
		{		
			$counter=0;
			while ($row = mysqli_fetch_row($result) )
			{
				if ($counter > 0)
				{
					echo ',';
				}
				echo '{"name":"'.$row[1].'","count":'.$row[0].'}';
				$counter=$counter+1;

			}
			mysqli_free_result($result);				
			echo ']}';
		}
		else
		{
			echo '{"name:"Άδεια βάση δεδομένων","count":0"}';
			
		}
	}
?>
