<?php
require("class_lib.php");
$link= mysqli_connect($dbServ, $dbUser,	$dbPass,$dbDbase);
mysqli_query($link,'set names UTF8');
echo "[";
$count=0;
if ($result=mysqli_query($link,"SELECT * FROM `keimena_cat` order by `ID`"))
{
	while ($row = mysqli_fetch_array($result)) {
		if ($count==0)
		{
			echo '{"ID":'.$row[0].', "Name":"'.$row[1].'"}';
		}	
		else
		{
			echo ',{"ID":'.$row[0].', "Name":"'.$row[1].'"}';
		}
		$count=$count+1;	
	}
}
echo "]";
mysqli_free_result($result);
mysqli_close($link);
?>
