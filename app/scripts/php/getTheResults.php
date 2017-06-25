<?php
require("class_lib.php");
require("functions.php");

$nl   = "\r\n";
$lent = 120;
$resultString="";
$test=$_POST['typeofquery'];

try {
    $conn = new PDO("mysql:host=$dbServ;dbname=$dbDbase;charset=utf8", $dbUser, $dbPass, $opt);
//σύνδεση είναι Επιτυχής
$stmt=$conn->prepare($_POST['value']);
//$stmt=$conn->prepare("SELECT count(*)  FROM keimena WHERE keimena.category = 1");
    if ($result=$stmt->execute()) {
        $numberOfPosts=count($stmt->fetchAll());
        if ($numberOfPosts>0) {
            switch ($test) {
            case GET_RESULTS: //0
                $resultString .= '{"type": 0, "status": 0, ' . $nl . '"message":"Βρέθηκαν εγγραφές", "count":'.$numberOfPosts.','.$nl
                .'"results":['.$nl;
            //Βρέθηκαν εγγραφές
            $stmt->execute();
            while ($row = $stmt->fetch()) {
                $resultString .= '{"id": ' . $row['id'] . ', "cat_id": ' . $row['keimeno_id'] . ', "keimeno": '
                    . makeJsonArray($row['keimeno']) . ', "category": ' . $row['category']
                    . ', "date": "' . $row['imnia_auth'] . '", "explanations": "' . $row['eksigisi'] . '"},';
            }
        $resultString=rtrim($resultString, ',');
        $resultString.=']}';
        break;
            //end case 0
        case COUNT_RESULTS: //1
        $stmt->execute();
$row=$stmt->fetch();
                $resultString .= '{"type": 1, "status": 0, ' . $nl . '"message":"Βρέθηκαν εγγραφές", "count":'.$row['count(*)'].'}';
            break;
            //end case 1
        default:
            break;
            //end case 1
        }
//end
        } else {
            //Δεν βρέθηκαν εγγραφές
    
        $resultString .= '{"status": 1, ' . $nl . '"message":"Δεν βρέθηκαν εγγραφές"}';
        }
        $stmt=null;
    }
} catch (PDOException $e) {
    $resultString = '{"status":'.$e->getCode().', "message":"Αδυναμία Σύνδεσης. Επικοινωνήστε με τον διαχειριστή ('. $e->getMessage().')"}';
    //Η σύνδεση απέτυχε
}
$conn=null;
echo $resultString;
