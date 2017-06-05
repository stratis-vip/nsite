<?php
require("class_lib.php");
// $link = new mysqli($dbServ, $dbUser, $dbPass, $dbDbase);
// $link->query('set names UTF8');
$conn = new PDO("mysql:host=$dbServ;dbname=$dbDbase", $dbUser, $dbPass,$opt);


echo "[";
$count = 0;
 
if ($result = $conn->query("SELECT id,description FROM `keimena_cat` order by `ID`")) {
    while ($row = $result->fetch()) {
        if ($count == 0) {
            echo '{"id":' . $row['id'] . ', "name":"' . $row['description'] . '"}';
        } else {
            echo ',{"id":' . $row['id'] . ', "name":"' . $row['description'] . '"}';
        }
        $count = $count + 1;
    }
}
echo "]";
$result=null;
$conn=null;
