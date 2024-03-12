import "dotenv/config";

const { PORT, DB_USER, DB_PASS, DB_HOST, DB, SECRET_JWT, GEOCONDING_API_KEY, GEOCODING_URL } = process.env;

export const env = {
    port: PORT,
    database: {
        db_user: DB_USER,
        db_pass: DB_PASS,
        db: DB,
        host: DB_HOST
    },
    jwt_env: {
        secret: SECRET_JWT
    },
    geocoding: {
        api_key: GEOCONDING_API_KEY,
        api_geo: GEOCODING_URL
    }
}
