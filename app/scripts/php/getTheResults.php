<?php
require("class_lib.php");
$nl="\r\n";
$link= mysqli_connect($dbServ, $dbUser,	$dbPass,	$dbDbase);
mysqli_query($link,'set names UTF8');
$lent=120; 
	
//$query='SELECT keimena.*, description FROM keimena,keimena_cat WHERE (category=keimena_cat.id)';
$query='SELECT * FROM keimena LIMIT 2';
//if ($result=mysqli_query($link,$_POST['value']))
if ($result=mysqli_query($link,$query))
	{
		$howManyRecs=mysqli_num_rows($result);
		if ($howManyRecs==0)
		{
			echo '{"status": 1, '.$nl.'"message": "Δεν βρέθηκαν αποτελέσματα", "count": 0}';
		}
		else			
		{
			echo '{"status": 0, '.$nl.'"message": "';
			if ($howManyRecs==1)
			{
				echo 'Βρέθηκε '.$howManyRecs.' εγγραφή", "count": '.$howManyRecs.', '.$nl.'"results": [';
			}
			else
			{
				echo 'Βρέθηκαν '.$howManyRecs.' εγγραφές", "count": '.$howManyRecs.','.$nl.'"results": [';
			}
			$count=1;
			while ($row = mysqli_fetch_row($result)) 
			{
				echo '{"id": '.$row[0].', "cat_id": '.$row[1].', "keimeno": "'.$row[2].'", "category": '.$row[3].', "date": "'.$row[4].'", "explanations": "'.$row[5].'"';

			//Αναζήτηση για το αν υπάρχει σημείωση για δημοσίευση 
			$publicQuery='SELECT * FROM pubplications WHERE pubplications.keimeno_id='.$row[0];
			if ($resultPublicQuery=mysqli_query($link,$publicQuery))
			{
				$howManyRecsPublic=mysqli_num_rows($resultPublicQuery);
				if ($howManyRecsPublic==0)
				{
					echo ','.$nl.' "publications": [{}]}';
				}
				else
				{
					echo ','.$nl.' "publications": [';
					$publicCount=1;
					while ($rowP=mysqli_fetch_row($resultPublicQuery))
					{
						echo '{"date": "'.$rowP[2].'", "link": "'.$rowP[4].'", "parseis": "'.$rowP[5].'"}';
						if ($publicCount<$howManyRecsPublic)
						{
							echo ','.$nl;
						}
						$publicCount++;
					}
					echo ']}';		
				}
				//βρήκα δημοσιεύσεις
			}
			else
			{
				//δεν βρήκα δημοσιεύσεις
			}
			// τέλος

			if ($count!=$howManyRecs)
				{
					echo ',';
				}
				$count++;
			}
			echo ']}';
		}
	mysqli_free_result($result);
	}
else
{
	echo '{"status":'.mysqli_errno($link).',"message":"'.mysqli_error($link).'"}';
}
	mysqli_close($link);
?>
