<?php
require("class_lib.php");
require("functions.php");
$nl   = "\r\n";
$link = mysqli_connect($dbServ, $dbUser, $dbPass, $dbDbase);
mysqli_query($link, 'set names UTF8');
$lent = 120;
$resultString="";

//echo "type is ".$_POST['typeofquery']." value is  ".$_POST['value'];
if ($result = mysqli_query($link, $_POST['value'])) {
	$howManyRecs = mysqli_num_rows($result);
	if ($howManyRecs == 0) {
    		$resultString .=  '{"status": 1, ' . $nl . '"message": "Δεν βρέθηκαν αποτελέσματα", "count": 0}';
	} else {
		$resultString .= '{"status": 0, ' . $nl . '"message": "';
		if ($howManyRecs == 1) {
			$resultString .= 'Βρέθηκε ' . $howManyRecs . ' εγγραφή", "count": ' . $howManyRecs . ', ' . $nl . '"results": [';
		} else {
			$resultString .= 'Βρέθηκαν ' . $howManyRecs . ' εγγραφές", "count": ' . $howManyRecs . ',' . $nl . '"results": [';
		}
		switch ($_POST['typeofquery']) {
		case  COUNT_RESULTS:
			$row = mysqli_fetch_row($result);
			$resultString .= '{"id": ' . $row[0] . '}';
			$resultString .= ']}';
			break;
		case GET_RESULTS:
			$count = 1;
			while ($row = mysqli_fetch_row($result)) {
				$resultString .= '{"id": ' . $row[0] . ', "cat_id": ' . $row[1] . ', "keimeno": ' . makeJsonArray($row[2]) . ', "category": ' . $row[3] . ', "date": "' . $row[4] . '", "explanations": "' . $row[5] . '"';
				$publicQuery = 'SELECT * FROM pubplications WHERE pubplications.keimeno_id=' . $row[0];
				if ($resultPublicQuery = mysqli_query($link, $publicQuery)) {
					$howManyRecsPublic = mysqli_num_rows($resultPublicQuery);
					if ($howManyRecsPublic == 0) {
						$resultString .= ',' . $nl . ' "publications": [{}]}';
					} else {
						$resultString .= ',' . $nl . ' "publications": [';
						$publicCount = 1;
						while ($rowP = mysqli_fetch_row($resultPublicQuery)) {
							$resultString .= '{"date": "' . $rowP[2] . '", "link": "' . $rowP[4] . '", "parseis": "' . $rowP[5] . '"}';
							if ($publicCount < $howManyRecsPublic) {
								$resultString .= ',' . $nl;
							}
							$publicCount++;
						}
						$resultString .= ']}';
					}
				} else {
				}
				if ($count != $howManyRecs) {
					$resultString .= ',';
				}
				$count++;
			}
			$resultString .= ']}';
			break;
		default:
			$resultString='{"status":1000,"message":"Δεν δώθηκε ο τύπος του ερωτήματος"}';
			echo  $resultString;
		}
	}
	mysqli_free_result($result);
} else {
	$resultString .= '{"status":' . mysqli_errno($link) . ',"message":"' . mysqli_error($link) . '"}';
}
mysqli_close($link);
echo $resultString;
