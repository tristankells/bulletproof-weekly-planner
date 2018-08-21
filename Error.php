<html>
<body>
<?php
$doc_root = preg_replace("!${_SERVER['SCRIPT_NAME']}$!", '', $_SERVER['SCRIPT_FILENAME']);
// base directory
$base_dir = __DIR__;

// server protocol
$protocol = empty($_SERVER['HTTPS']) ? 'http' : 'https';

// domain name
$domain = $_SERVER['SERVER_NAME'];

// base url
$base_url = preg_replace("!^${doc_root}!", '', $base_dir);

// server port
$port = $_SERVER['SERVER_PORT'];
$disp_port = ($protocol == 'http' && $port == 80 || $protocol == 'https' && $port == 443) ? '' : ":$port";

// put em all together to get the complete base URL
$url = "${protocol}://${domain}${disp_port}${base_url}";
$newpath = $domain."/Glance/index.php";
echo "<p>$url</p>"; // = http://example.com/path/directory
echo "<p>$newpath</p>";
echo "<h3>Unauthorized Access!</h3>";
echo "<p>". $_SERVER['DOCUMENT_ROOT']. "</p>";
echo "<p>". __DIR__. "</p>";
$path2 = __DIR__;
$path = $_SERVER['DOCUMENT_ROOT']."/Glance/index.php";
echo "<a href='./index.php'>Go to the main page</a>";
?>
</body>
</html>