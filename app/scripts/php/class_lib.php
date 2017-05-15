<?php

$htServ  = "http://dbase.texnopraksis.com/";
$dbUser  = "dbaseuser";
//$dbServ="db23.papaki.gr";
$dbServ  = "127.0.0.1";
$dbPass  = "Jqw6f0^9";
$dbDbase = "collection";

class keimeno
{
    public $id;
    public function __construct($id)
    {
        $this->id = $id;
    }
    
    public function set_id($new_id)
    {
        $this->id = $new_id;
    }
    
    public function get_id()
    {
        return $this->id;
    }
}


class config
{
    public $hostname;
    public $username;
    public $password;
    public $database;
    public $prefix;
    public $connector;
    
    public function __construct($hostname = null, $username = null, $password = null, $database = null)
    {
        $this->hostname = !empty($hostname) ? $hostname : "";
        $this->username = !empty($username) ? $username : "";
        $this->password = !empty($password) ? $password : "";
        $this->database = !empty($database) ? $database : "";
    }
    
    public function __destruct()
    {
    }
}


class db extends mysqli
{
    private $connection;
    private $selectdb;
    private $lastQuery;
    private $config;
    
    public function __construct($config)
    {
        $this->config = $config;
    }
    
    public function __destruct()
    {
    }
    
    public function openConnection()
    {
        $this->connection = mysqli_connect($this->config->hostname, $this->config->username, $this->config->password);
    }
}
