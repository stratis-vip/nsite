<?php

$htServ="http://dbase.texnopraksis.com/";
$dbServ="db22.papaki.gr";
$dbUser= "dbaseuser";
$dbPass= "Jqw6f0^9";
$dbDbase="collection";

class keimeno {
	var $id;
	function __construct($id) {           
		$this->id = $id;            
	}

	function set_id($new_id){
		$this->id=$new_id;
	}

	function get_id(){
		return $this->id;
	}
}


class config{
	public $hostname;
	public $username;
	public $password;
	public $database;
	public $prefix;
	public $connector;

	function __construct($hostname = NULL, $username = NULL, $password = NULL, $database = NULL){
		$this->hostname = !empty($hostname) ? $hostname : "";
		$this->username = !empty($username) ? $username : "";
		$this->password = !empty($password) ? $password : "";
		$this->database = !empty($database) ? $database : "";
	}

	function __destruct(){
	}
}


class db extends mysqli{
	private $connection;
	private $selectdb;
	private $lastQuery;
	private $config;

	function __construct($config){
		$this->config = $config;
	}

	function __destruct(){
	}

	public function openConnection()
	{			
		$this->connection = mysqli_connect($this->config->hostname, $this->config->username, $this->config->password);			
	}				
}

?>
