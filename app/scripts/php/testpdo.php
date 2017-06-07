<?php
include("class_lib.php");

try {
	$conn = new PDO("mysql:host=$dbServ;dbname=$dbDbase", $dbUser, $dbPass1,$opt);

    //$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $query='SELECT `*` FROM `keimena` WHERE keimena.category= :cat ORDER BY :ord :ascOrDesc LIMIT :limitValue OFFSET :offsetValue';//? OFFSET ?' ;
    $stmt = $conn->prepare($query);
    
  
    $cat=1;
    $order="keimena.category";
    $ascOrDesc="ASC";
    $limitValue=5;
    $offsetValue=2;

    $stmt->bindParam(':cat', $cat);
    $stmt->bindParam(':ord', $order);
    $stmt->bindParam(':ascOrDesc', $ascOrDesc);
    $stmt->bindParam(':limitValue', $limitValue, PDO::PARAM_INT);
    $stmt->bindParam(':offsetValue', $offsetValue, PDO::PARAM_INT);
    $stmt->setFetchMode(PDO::FETCH_ASSOC);

    
    $stmt->execute();//,5,0));

    while ($result=$stmt->fetch()) {
        print_r($result);
    }
} catch (PDOException $e) {

    echo "Error: " . $e->getCode()." kai ". $e->getMessage();
}
$conn = null;
?>

