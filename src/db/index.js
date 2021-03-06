import { Sequelize } from "sequelize"

const { PGHOST, PGPORT, PGUSER, PGDATABASE, PGPASSWORD } = process.env

const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
  logging: false,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
})

export const cartDB = async () => {
  try {
    await sequelize.authenticate()
    console.log("DB connections is ok")
  } catch (error) {
    console.log("DB connection failed")
  }
}

export default sequelize
