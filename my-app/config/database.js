import pg from 'pg'
const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    port:5432,
    database: 'my_app',
    password: 'gulzodakhan'
})
export default pool