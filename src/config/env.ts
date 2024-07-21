const env = {
    MONGODB_URL: process.env.MONGODB_URL,
    DB_NAME: process.env.DB_NAME,
    CLIENT_SIDE_URL: process.env.CLIENT_SIDE_URL,
    COMPANY_NAME: process.env.COMPANY_NAME,
    EMAIL_HOST: process.env.EMAIL_HOST,
    EMAIL_PORT: process.env.EMAIL_PORT,
    EMAIL_USERNAME: process.env.EMAIL_USERNAME,
    EMAIL_PASSWORD: process.env.EMAIL_PASSWORD,
    SENDER_EMAIL: process.env.SENDER_EMAIL,
    SECURE: process.env.SECURE,
    EMAIL_SENDER_NAME: process.env.EMAIL_SENDER_NAME,
    EMAIL_SENDER_JOB_TITLE: process.env.EMAIL_SENDER_JOB_TITLE,
    HOST: process.env.HOST || "localhost:3000"
}

export default env