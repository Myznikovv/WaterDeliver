<?php
//Считать json  файл
$json = file_get_contacts(../goods.json);
$json = json_decode($json,true);
$message ='';
$message.='<h1>Заказ в магазине</h1>';
$message.='<p>Телефон:'.$_POST[phone].'</p>';
$message.='<p>Почта:'.$_POST[mail].'</p>';
$message.='<p>Клиент:'.$_POST[name].'</p>';

$cart=$_POST['cart'];
$sum=0;
foreach($cart as $id=> count){
    $message.=$json[$id]['name'].'---';
    $message.=$count.'---';
    $message.=$count*$json[$id]['cost'];
    $sum =$sum+$count*$json[$id]['cost'];
}
$message .='Всего'.$sum;
$to ='myzvitalik@yandex.ru'.',';
$to .=$_POST['mail'];
$spectext='<!DOCTYPE HTML><html><head><title>Заказ</title></head><body>';
$headers='MINE-Version 1.0'."\r\n";
$headers .='Content-type:text/html;charset+utf-8'."\r\n";
$ m=mail($to,'Заказ в магазине',$spectext.$message.'</body></html>',$headers);
if ($m){echo 1;};else {echo 0;}