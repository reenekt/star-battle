<?php
switch ($_POST['page']) {
  case 'start':
    echo file_get_contents('pages/start.html');
    break;

  case 'game':
    echo file_get_contents('pages/game.html');
    break;

  case 'result':
    $host = 'localhost';
    $user = 'root';
    $password = '';
    $db = 'star-battle';
    $mysqli = new mysqli($host, $user, $password, $db);
    if($mysqli->connect_errno){
      echo 'db error!\n' . $mysqli->connect_error;
    }
    $player_name = $_POST['name'];
    $player_time = $_POST['time'];
    $player_score = $_POST['score'];
    $insert = "INSERT INTO results(name, time, score) VALUES ('" . $player_name . "', " . $player_time . ", " . $player_score . ")";
    $get_info = 'SELECT * FROM results WHERE name=\'' . $player_name . '\'';
    if ($mysqli->query($insert)) {
      if($result = $mysqli->query($get_info)){
        echo file_get_contents('pages/result.html');
      }
    }
    break;

  default:
    echo "default";
    //echo file_get_contents('pages/start.html');
    break;
}
?>
