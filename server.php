<?php
switch ($_POST['page']) {
  case 'start':
    echo file_get_contents('pages/start.html');
    break;

  case 'game':
    echo file_get_contents('pages/game.html');
    break;

  case 'result':
    # code...
    break;

  default:
    echo file_get_contents('pages/result.html');
    break;
}
?>
