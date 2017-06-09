<?php
require("class_lib.php");

echo '{ "status": ';

try {
    $conn = new PDO("mysql:host=$dbServ;dbname=$dbDbase;charset=utf8", $dbUser, $dbPass, $opt);

    echo  '0, "message":"Επιτυχής σύνδεση", "categories":[';
    $stmt= $conn->query("SELECT id,description FROM `keimena_cat` order by `ID`");
    $str="";
    while ($row = $stmt->fetch()) {
        $str.= '{"id":' . $row['id'] . ', "name":"' . $row['description'] . '"},';
    }

    echo rtrim($str, ',').']';
    $stmt=null;
} catch (PDOException $e) {
    echo  $e->getCode().', "message":"Αδυναμία Σύνδεσης. Επικοινωνήστε με τον διαχειριστή ('. $e->getMessage().')"';
}
echo '}';
$conn=null;
