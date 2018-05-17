<?php
$days; //Variable array to store the date (format of single number) of a each day in the current week.

$timestamp = time(); //Store the current time.

//The below statements test what day of the week the current day is, and
// substracts the appropirate amount of days so that the timestamp 
// variable represents the Monday of the current week

if (date('D', $timestamp) === 'Tue') {
  
    $timestamp = strtotime("-1 day", $timestamp);
}

if (date('D', $timestamp) === 'Wed') {
    
    $timestamp = strtotime("-2 day", $timestamp);
}

if (date('D', $timestamp) === 'Thu') {
    
    $timestamp = strtotime("-3 day", $timestamp);
}

if (date('D', $timestamp) === 'Fri') {
    
    $timestamp = strtotime("-4 day", $timestamp);
}

if (date('D', $timestamp) === 'Sat') {
    
    $timestamp = strtotime("-5 day", $timestamp);
}

if (date('D', $timestamp) === 'Sun') {
    
    $timestamp = strtotime("-6 day", $timestamp);
}

//Store the date of the all the days in the working week (Mon to Fri)
for ($i = 0; $i < 5; $i++) {
    $days[$i] = date('d', $timestamp)+$i;
}
?>