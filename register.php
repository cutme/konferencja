<?php

if(empty($_POST['name'])) {
	die('Error: Missing variables');
}

$name			= strip_tags(trim($_POST['name']));
$email			= strip_tags(trim($_POST['email']));
$phone			= strip_tags(trim($_POST['phone']));
$diet			= strip_tags(trim($_POST['diet']));
$institution	= strip_tags(trim($_POST['institution']));
$app1			= $_POST['app1'];
$app2			= $_POST['app2'];
$app3			= $_POST['app3'];

$to = 'info@cutme.pl';

$headers = 'From: '.$name.' <'.$email.'>'."\r\n" .
	'Reply-To: '.$email."\r\n";
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