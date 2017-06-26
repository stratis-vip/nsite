<?php
//Eμφανίζεται στα παρακάτω σημεία
//app/scripts/php/connect.php:2:include("class_lib.php");
//app/scripts/php/getTheResults.php:2:require("class_lib.php");
//Το δυαδικό αρχείο app/scripts/php/.connect.php.swp ταιριάζει
//app/scripts/php/pVars.php:2:include("class_lib.php");
//app/scripts/php/getcat.php:2:require("class_lib.php");
//app/scripts/php/testpdo.php:2:include("class_lib.php");
//
include("class_lib.php");

echo '{ "status": ';
try {
    $conn = new PDO("mysql:host=$dbServ;dbname=$dbDbase;charset=utf8", $dbUser, $dbPass, $opt);
    echo  '0, "message":"Επιτυχής σύνδεση", "categories":[';

    $stmt=$conn->query('SELECT count(*) AS cc,`description` FROM `keimena`,`keimena_cat`  where `category` = `keimena_cat`.`id` group by `category`');
    $str="";
    while ($result=$stmt->fetch()) {
        $str.= '{"name":"' . $result['description'] . '","count":' . $result['cc'] . '},';
    }
    echo rtrim($str, ',').']';
    $stmt=null;
} catch (PDOException $e) {
    echo  $e->getCode().', "message":"Αδυναμία Σύνδεσης. Επικοινωνήστε με τον διαχειριστή ('. $e->getMessage().')"';
}
echo '}';
$conn = null;
