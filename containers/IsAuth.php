<?php

use \Firebase\JWT\JWT;

if (isset($_GET['Authorization'])) {
    $token = explode(" ", $_GET['Authorization'])[1];

    $decoded = JWT::decode($token, $_ENV['JWT_KEY'], array('HS256'));

    if ($decoded) {
        return $decoded;
    }
}

return false;
