
import { Dialect, Sequelize } from 'sequelize'

const dbName = process.env.MYSQL_DATABASE as string
const dbUser = process.env.MYSQL_USER_NAME as string
const dbHost = process.env.MYSQL_HOST
const dbDriver = process.env.NYSQL_DRIVER as Dialect
const dbPassword = process.env.MYSQL_PASSWORD

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver
})

export default sequelizeConnection