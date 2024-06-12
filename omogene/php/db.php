<?php 

  class Database{

    private $dsn="mysql:host=localhost;dbname=omogene;";
    private $user="root";
    private $pwd="";
    private $pdo;

    public function __construct()
    {
      $this->pdo=new PDO($this->dsn,$this->user,$this->pwd);
      $this->pdo->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
    }

    public function query( string $query, array $data){

      $stmt=$this->pdo->prepare($query);

      foreach($data as $k=>$v){
        $stmt->bindValue(":$k",$v);
      }

      $stmt->execute();
      return $stmt;
    }
  }
?>