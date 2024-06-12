
<?php

require_once "./db.php";

$db=new Database();


$username = $_POST['username'];
if (!empty($username)){
} else {
    die("userempty");
}

$email = $_POST['email'];
if (filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
} else {
    die("emailinvalid");
}

$password = $_POST['password'];
if (!empty($password)){
} else {
    die("passwordempty");
}

$cpassword = $_POST['cpassword'];
if ($_POST['password'] == $_POST['cpassword']) {
} else {
    die("notmatch");
}

try {

    $sql = "INSERT INTO users (full_name, email, pwd) VALUES (:username, :email, :pwd)";
    $db->query($sql,["username"=>$username,"email"=>$email,"pwd"=>$password]);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
