
<?php

require_once "./db.php";

$db=new Database();
print_r($_POST);
print_r($_FILES);
if ( isset($_FILES["file"])) {
  // File upload path
  $targetDir = "uploads/";
  $fileName = basename($_FILES["file"]["name"]);

  $targetFilePath = "./img/" . $fileName;
  $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);

  // Allow certain file formats
  $allowTypes = array('jpg', 'png', 'jpeg', 'gif', 'pdf');

  if (in_array($fileType, $allowTypes)) {
      // Upload file to server
      if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetFilePath)) {
          echo "The file " . htmlspecialchars($fileName) . " has been uploaded.";
      } else {
          echo "Sorry, there was an error uploading your file.";
      }
  } else {
      echo "Sorry, only JPG, JPEG, PNG, GIF, and PDF files are allowed to upload.";
  }
} else {
  // If no file is submitted or request method is not POST
  echo "Please select a file to upload.";
}






$color_name = $_POST['color_name'];
$clothing_catigory = $_POST['clothing_catigory'];
$user_id = 1;
echo $targetFilePath;

try {

    $sql = "INSERT INTO clothing (color_name, clothing_catigory, clothing_img,user_id) VALUES (:color_name, :clothing_catigory, :clothing_img,:user_id)";
    $db->query($sql,["color_name"=>$color_name,"clothing_catigory"=>$clothing_catigory,"clothing_img"=>$targetFilePath,"user_id"=>$user_id]);
} catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
}
