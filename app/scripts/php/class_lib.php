<?php
use PDO;
$htServ  = "http://newdbase.texnopraksis.com/";
$dbUser  = "dbaseuser";
//$dbServ="db22.papaki.gr";
$dbServ  = "127.0.0.1";
$dbPass  = "Jqw6f0^9";
$dbDbase = "collection";
$opt = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => true
];   
