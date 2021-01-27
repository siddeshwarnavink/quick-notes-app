<?php

use Respect\Validation\Rules\Not;
use Siddeshrocks\Models\Notes;
use Respect\Validation\Validator as v;

return [
    'createNote' => function ($root, $args) {
        AuthRequired($root);

        $noteData = [
            'title' => $args['title'],
            'content' => $args['content'],
        ];

        $validation = $root['validator']()->validate($noteData, [
            'title' => v::length(0, 120),
            'content' => v::notEmpty()->length(3, 250)
        ]);

        if ($validation->failed()) {
            throw new Exception('Invalid user input.');
        }

        $noteId = Notes::insertGetId(array_merge($noteData, [
            'user' => $root['isAuth']->user->id
        ]));

        $noteData['id'] = $noteId;
        $noteData['creator'] = $root['isAuth']->user;

        return $noteData;
    },

    'updateNote' => function ($root, $args) {
        AuthRequired($root);

        $updateNoteData = [
            'title' => $args['title'],
            'content' => $args['content'],
        ];

        $validation = $root['validator']()->validate($updateNoteData, [
            'title' => v::length(0, 120),
            'content' => v::notEmpty()->length(3, 250)
        ]);

        $currentNote = Notes::where('id', $args['id']);

        if ($currentNote->first()) {
            if ($validation->failed()) {
                throw new Exception('Invalid user input.');
            }

            if ($currentNote->first()->user !==  $root['isAuth']->user->id) {
                throw new Exception('Access denied.');
            }

            $currentNote->update($updateNoteData);

            return array_merge($updateNoteData, [
                'id' => $currentNote->first()->id,
                'creator' => $root['isAuth']->user
            ]);
        } else {
            throw new Exception('Note dosen\'t exist.');
        }
    },

    'deleteNote' => function ($root, $args) {
        AuthRequired($root);

        $currentNote = Notes::where('id', $args['id']);

        if ($currentNote->first()) {
            if ($currentNote->first()->user !==  $root['isAuth']->user->id) {
                throw new Exception('Access denied.');
            }

            $currentNoteData = [
                'id' => $currentNote->first()->id,
                'title' => $currentNote->first()->title,
                'content' => $currentNote->first()->content
            ];

            $currentNote->delete();

            return array_merge($currentNoteData, [
                'creator' => $root['isAuth']->user
            ]);
        } else {
            throw new Exception('Note dosen\'t exist.');
        }
    }
];
