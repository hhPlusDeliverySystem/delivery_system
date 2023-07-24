export default () => ({
    type: 'mysql',
    host: process.env.RDS_HOST,
    port: 3306,
    username: process.env.RDS_USERNAME,
    password: process.env.RDS_PW,
    database: 'delivery_system',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
});