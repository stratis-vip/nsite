<?php
include("class_lib.php");

echo '{ "status": ';
try {
    $conn = new PDO("mysql:host=$dbServ;dbname=$dbDbase;charset=utf8", $dbUser, $dbPass, $opt);
    echo  '0, "message":"Επιτυχής σύνδεση '.$dbServ.'", "categories":[';

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
