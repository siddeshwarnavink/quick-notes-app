<?php

$authResolvers = require('./graphql/resolvers/auth.php');
$userResolvers = require('./graphql/resolvers/users.php');
$notesResolvers = require('./graphql/resolvers/notes.php');

$Resolvers = array_merge(
    $authResolvers,
    $userResolvers,
    $notesResolvers
);

return $Resolvers;
