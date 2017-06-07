<?php
include("class_lib.php");

echo '{ "status": ';
try {

$conn = new PDO("mysql:host=$dbServ;dbname=$dbDbase", $dbUser, $dbPass,$opt);
echo  '0, "message":"Επιτυχής σύνδεση '.$dbServ.'",';






} catch (PDOException $e) {

    echo  $e->getCode().', "message":"Αδυναμία Σύνδεσης. Επικοινωνήστε με τον διαχειριστή ('. $e->getMessage().')"';
}
$conn = null;

// if (!$link) {
//     echo $link->connect_error . ',"message":"Αδυναμία Σύνδεσης. Επικοινωνήστε με τον διαχειριστή"}';
//     exit;
// } else {
//     echo '0,"message":"Επιτυχής σύνδεση '.$dbServ.'",';
//     $link->query("SET NAMES 'utf8'");
//     echo '"categories":[';
//     
//     if ($result = $link->query('SELECT count(*) AS cc,`description` FROM `keimena`,`keimena_cat`  where `category` = `keimena_cat`.`id` group by `category`')) {
//         $counter = 0;
//         while ($row = $result->fetch_array(MYSQLI_ASSOC)) {
//             if ($counter > 0) {
//                 echo ',';
//             }
//             echo '{"name":"' . $row['description'] . '","count":' . $row['cc'] . '}';
//             $counter = $counter + 1;
//         }
//         $result->free();
//         echo ']}';
//     } else {
//         echo '{"name:"Άδεια βάση δεδομένων","count":0"}';
//     }
//     $link->close();
// }
