<?php

use GraphQL\Utils\BuildSchema;

$contents = file_get_contents('./graphql/schema/schema.graphql');
$schema = BuildSchema::build($contents);

return $schema;
