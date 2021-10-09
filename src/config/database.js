module.exports = {
    dialect: 'postgres',
    hotst: process.env.DATABASE_URL,
    username: 'postgress',
    password: 'password',
    database: 'casdplus',
    port:5432,
    define: {
        timestamps: true,
        underscored: true,
    },
};