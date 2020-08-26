<?php

require 'Controller.php';

$controller = new Controller;

if (isset($_POST['save'])) {
    echo $controller->saveHouse($_POST);
 
}