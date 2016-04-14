<?php

if(empty($_POST['name'])) {
	die('Error: Missing variables');
}

$name			= $_POST['name'];
$email			= $_POST['email'];
$phone			= $_POST['phone'];
$diet			= $_POST['diet'];
$institution	= $_POST['institution'];
$app1			= $_POST['app1'];
$app2			= $_POST['app2'];
$app3			= $_POST['app3'];

$to = 'bartosz@mediger.net';

$headers = 'From: '.$name.' <'.$email.'>'."\r\n" .
	'Reply-To: '.$email."\r\n" .
	'X-Mailer: PHP/' . phpversion();
$subject = 'kontakt ze strony konferencji';
$body.='Imię i nazwisko: '.$name."\n";
$body.='E-mail: '.$email."\n";
$body.='Telefon: '.$phone."\n";

if (!empty($diet)) {
	$body.='Dieta: '.$diet."\n";
}

if (!empty($institution)) {
	$body.='Instrytucja: '.$institution."\n";
}

if (!empty($app1)) {
	$body.='Zgoda 1: '.$app1."\n";
}

if (!empty($app2)) {
	$body.='Zgoda 2: '.$app2."\n";
}

if (!empty($app3)) {
	$body.='Zgoda 3: '.$app3."\n";
}

if(mail($to, $subject, $body, $headers)) {
	die('ok');
} else {
	die('Error: Mail failed');
}

?>