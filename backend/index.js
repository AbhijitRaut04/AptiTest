import express from 'express'
import connectDB from './config/connect.js'
import adminRoutes from './routes/admin.routes.js'
import testRoutes from './routes/test.routes.js'
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config({
    path: './.env'
})
const app = express()
connectDB()

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: '*',
    credentials: true
}));

app.use('/api/admins', adminRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/users', userRoutes);

app.get("/", (req, res) => {
    res.send("Hello")
})

app.listen(process.env.PORT, '0.0.0.0', () => {
    console.log(`Listening on port ${process.env.PORT}`)
})
