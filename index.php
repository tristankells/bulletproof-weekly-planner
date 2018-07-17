<html>
<body>
<h1>login</h1>
<form method="POST" action="./login.php">
username :
<input type="text" name="username" />
<br />
password :
<input type="text" name="password" />
<input type="submit" value="subMit" />
</form>
<br />
<?php
if(isset($_GET['msg'])){
    echo "<p>".$_GET['msg']."</p>";
	unset($_GET['msg']);
} 
?>
</body>
</html>