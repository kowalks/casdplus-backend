module.exports = {
    dialect: 'postgres',
    hotst: DATABASE_URL,
    username: 'test',
    password: 'test',
    database: 'casdplus',
    port:15432,
    define: {
        timestamps: true,
        underscored: true,
    },
};