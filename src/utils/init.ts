import { User } from '../models'
const isDev = process.env.NODE_ENV === 'development'

const dbInit = () => {
    User.sync({ alter: isDev })
}
export default dbInit 