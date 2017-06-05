<?php
require("class_lib.php");
require("functions.php");
$nl   = "\r\n";
$link = new mysqli($dbServ, $dbUser, $dbPass, $dbDbase);
$link->query('set names UTF8');
$lent = 120;
$resultString="";

//echo "type is ".$_POST['typeofquery']." value is  ".$_POST['value'];
if ($result = $link->query($_POST['value'])) {
	$howManyRecs =$result->num_rows;
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
			$row =$link->fetch_array(MYSQLI_ASSOC);
			$resultString .= '{"id": ' . $row[0] . '}';
			$resultString .= ']}';
			break;
		case GET_RESULTS:
			$count = 1;
			while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
				$resultString .= '{"id": ' . $row['id'] . ', "cat_id": ' . $row['keimeno_id'] . ', "keimeno": ' . makeJsonArray($row['keimeno']) . ', "category": ' . $row['category'] . ', "date": "' . $row['imnia_auth'] . '", "explanations": "' . $row['eksigisi'] . '"';
				$publicQuery = 'SELECT * FROM pubplications WHERE pubplications.keimeno_id=' . $row['id'];
				if ($resultPublicQuery = $link->query( $publicQuery)) {
					$howManyRecsPublic = $resultPublicQuery->num_rows;
					if ($howManyRecsPublic == 0) {
						$resultString .= ',' . $nl . ' "publications": [{}]}';
					} else {
						$resultString .= ',' . $nl . ' "publications": [';
						$publicCount = 1;
						while ($rowP = $resultPublicQuery->fetch_array(MYSQLI_ASSOC)) {
							$resultString .= '{"date": "' . $rowP['imnia'] . '", "link": "' . $rowP['url'] . '", "parseis": "' . $rowP['parseis'] . '"}';
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
	$result->free();
} else {
	$resultString .= '{"status":' . $link->errno . ',"message":"' . $link->connect_error . '"}';
}
$link->close();
echo $resultString;
