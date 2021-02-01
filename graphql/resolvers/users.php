<?php

use Siddeshrocks\Models\User;

return [
    'user' => function ($root, $args) {
        $user = User::where('id', $args['id'])->first();

        return $user;
    },

    'editUser' => function ($root, $args) {
        $user = User::where('id', $args['userId']);

        if (trim($args['newPassword']) == '') {
            $user->update([
                'username' => $args['username'],
            ]);
        } else {
            $user->update([
                'username' => $args['username'],
                'password' => password_hash($args['newPassword'], PASSWORD_BCRYPT)
            ]);
        }

        if (isset($root['isAuth']) && $root['isAuth']) {
            if (!$root['isAuth']->user->isAdmin) {
                $user->update([
                    'isAdmin' => (int) $args['isAdmin'],
                ]);
            }
        }

        return $user->first();
    },
];
