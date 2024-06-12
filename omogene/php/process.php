<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $clothingColors = $_POST['clothingColor'];
  $clothingTypes = $_POST['clothingType'];

  for ($i = 0; $i < count($clothingColors); $i++) {
    echo "Selected Clothing Color: " . $clothingColors[$i] . "<br>";
    echo "Selected Clothing Type: " . ucfirst($clothingTypes[$i]) . "<br>";
    echo "<br>";
  }
}
?>
