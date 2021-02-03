<?php

use Siddeshrocks\Models\User;

use \Firebase\JWT\JWT;
use Respect\Validation\Validator as v;

return [
    'loginUser' => function ($root, $args) {
        $user = User::where('email', $args['email'])->first();

        if ($user) {
            if (password_verify($args['password'], $user->password)) {
                $jwt = JWT::encode([
                    'user' => $user
                ], $_ENV['JWT_KEY']);

                return [
                    'userId' => $user->id,
                    'token' => $jwt,
                    'user' => $user
                ];
            } else {
                throw new Exception('Invalid password.');
            }
        } else {
            throw new Exception('User doesn\'t exists.');
        }
    },

    'createUser' => function ($root, $args) {
        $userData = [
            'username' => $args['username'],
            'email' => $args['email'],
            'password' => $args['password']
        ];

        $validation = $root['validator']()->validate($userData, [
            'username' => v::notEmpty(),
            'email' => v::noWhitespace()->notEmpty(),
            'password' => v::noWhitespace()->notEmpty(),
        ]);

        if ($validation->failed()) {
            throw new Exception('Invalid user input.');
        }

        if (!User::where('username', $args['username'])->first()) {
            $userData['password'] = password_hash($args['password'], PASSWORD_DEFAULT);
            User::create($userData);
        } else {
            throw new Exception('User already exists.');
        }

        return User::where('username', $args['username'])
            ->where('email', $args['email'])
            ->first();
    },


    'verifyLogin' => function ($root, $args) {
        $key = $_ENV['JWT_KEY'];
        $decoded = JWT::decode($args['token'], $key, array('HS256'));

        if ($decoded) {
            $user = User::where('id', $decoded->user->id)->first();

            $jwt = JWT::encode([
                'user' => $user
            ], $key);

            return [
                'newToken' => $jwt,
                'user' => $user
            ];
        }

        return false;
    }
];
