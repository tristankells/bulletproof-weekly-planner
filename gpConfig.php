<?php

//Include Google client library 
include_once 'src/Google_Client.php';
include_once 'src/contrib/Google_Oauth2Service.php';

/*
 * Configuration and setup Google API
 */
$clientId = '455598438382-7l28gdqcfh7t11bvp1dnkokf08vjvrt0.apps.googleusercontent.com'; //Google client ID
$clientSecret = '9yae7aTz7C0ay32FaCjJoOEP'; //Google client secret
$redirectURL = 'http://localhost/Glance'; //Callback URL

//Call Google API
$gClient = new Google_Client();
$gClient->setApplicationName('glance');
$gClient->setClientId($clientId);
$gClient->setClientSecret($clientSecret);
$gClient->setRedirectUri($redirectURL);

$google_oauthV2 = new Google_Oauth2Service($gClient);
?>