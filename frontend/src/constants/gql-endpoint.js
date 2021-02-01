const GRAPHQL_URI = process.env.NODE_ENV === 'development' ? 'http://localhost:9999/' : '/server/';

export default GRAPHQL_URI;