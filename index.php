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
if(!isset($_POST['submitResult'])){
  if(!isset($_POST['startBtn'])){
    //начальная страница
    echo 'var page = \'start\'';
    $data = 'data: {page: page}';
  }
  else {
    //$_SESSION['player'] = $_POST['playerName'];
    echo 'var page = \'game\'';
    $data = 'data: {page: page}';
  }
}else{
  //страница результатов
  echo 'var page = \'result\'';
  $data = 'data: {page: page, name: ' . '\'' . $_POST['name'] . '\'' . ', time: ' . $_POST['time'] . ', score: ' . $_POST['score'] . '}';
}

echo ";\n";
?>
//alert(page);
  $.ajax({
    url: 'server.php',
    type: 'post',
    <?php
    echo $data;
    echo ',';
    ?>
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
