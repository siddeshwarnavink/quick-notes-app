<?php

use \Firebase\JWT\JWT;

$headers = getAllHeaders();

if (isset($headers['Authorization'])) {
    $key = require('./shared/JWTKey.php');

    $token = explode(" ", $headers['Authorization'])[1];

    $decoded = JWT::decode($token, $key, array('HS256'));

    if ($decoded) {
        return $decoded;
    }
}

return false;
