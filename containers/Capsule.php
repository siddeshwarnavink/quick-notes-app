<?php

use Illuminate\Database\Capsule\Manager as Capsule;

$capsule = new Capsule;

$capsule->addConnection([
    'driver'    => $_ENV['DATABASE_DRIVER'],
    'host'      => $_ENV['DATABASE_HOST'],
    'database'  => $_ENV['DATABASE_NAME'],
    'username'  => $_ENV['DATABASE_USERNAME'],
    'password'  => $_ENV['DATABASE_PASSWORD'],
    'charset'   => $_ENV['DATABASE_CHARSET'],
    'collation' => $_ENV['DATABASE_COLLATION'],
    'prefix'    => '',
]);

$capsule->setAsGlobal();
$capsule->bootEloquent();

return $capsule;
