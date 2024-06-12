<?php
  require_once "./db.php";

  $db=new Database();

  $color=$_GET["color"];
  echo $color;

  $query="SELECT rolation_color FROM color WHERE color=:color_name";
  $result=$db->query($query,["color_name"=>$color])->fetch(PDO::FETCH_ASSOC);
  // echo json_encode(["msg"=>"valid","data"=>$result["rolation_color"]]);
  if($result){
    $colors=explode("/",$result["rolation_color"]);
    $all=[];
    $i=0;

    foreach($colors as $v){
      $query="SELECT id ,clothing_catigory,clothing_img FROM clothing WHERE color_name='$v'";
      $res=$db->query($query,[])->fetch(PDO::FETCH_ASSOC);

      if($res){
        $all[$i]=$res;
      }

      $i++;
      
    }
    print_r($all);
    echo json_encode(["msg"=>"valid","data"=>$all]);
  }else{
    echo json_encode(["msg"=>"nothing"]);
  }

?> 