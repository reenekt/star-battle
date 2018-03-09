<?php session_start(); ?>
<!DOCTYPE HTML>
<html>

<head>
  <meta charset="utf-8">
  <title>Star Battle</title>
  <link rel="stylesheet" href="/css/style.css">
</head>

<body>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>

  <!-- основной блок -->

  <div id="content"></div>

<script type="text/javascript">
<?php
// установка переменной для загрузки контента
if(!isset($_SESSION['player'])){
  if(!isset($_POST['startBtn'])){
    //начальная страница
    echo 'var page = \'start\'';
  }
  else {
    //$_SESSION['player'] = $_POST['playerName'];
    echo 'var page = \'game\'';
  }
}
else if(!isset($_POST['endPlaying'])){
  if(!isset($_POST['logout'])){
    //если игра не была завершена - страница с игрой
    echo 'var page = \'game\'';
  }
  else{
    unset($_SESSION['player']);
    echo 'var page = \'start\'';
  }
}
else {
  //страница результатов
  echo 'var page = \'result\'';
}
echo ";\n";
?>
//alert(page);
  $.ajax({
    url: 'server.php',
    type: 'post',
    data: {page: page},
    dataType: 'html',
    success: function(data, textStatus){
      $('#content').html(data);
    },
    beforeSend: function(){
      //alert('waiting...');
    }
  })
  .done(function() {
    console.log("success");
  })
  .fail(function() {
    console.log("error");
  })
  .always(function() {
    console.log("complete");
  });

</script>
  <!-- конец основного блока -->
</body>

</html>
