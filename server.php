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
    $get_info = 'SELECT * FROM results ORDER BY score DESC, time DESC';
    $info = [];
    if ($mysqli->query($insert)) {
      if($result = $mysqli->query($get_info)){
        while($row = $result->fetch_assoc()){
          $info[] = $row;
        }
        //$result->close();
        //var_dump($info);
        echo '
        <h2>Результат</h2><br>
        <div class="results">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Имя</th>
              <th>Время</th>
              <th>Очки</th>
            </tr>
          </thead>
          <tbody>';
        foreach ($info as $key) {
          echo '<tr><td>' . $key['id'] . '</td><td>' . $key['name'] . '</td><td>';
          $minutes = floor((int)$key['time'] / 60);
          if($minutes < 10)
            $minutes = '0' . $minutes;
          $seconds = (int)$key['time'] % 60;
          if($seconds < 10)
            $seconds = '0' . $seconds;
          echo $minutes . ':' . $seconds;

          echo '</td><td>' . $key['score'] . '</td></tr>';
        }
        echo '</tbody>
      </table>';
        echo file_get_contents('pages/result.php');
      }
    }
    break;

  default:
    echo "default";
    //echo file_get_contents('pages/start.html');
    break;
}
?>
