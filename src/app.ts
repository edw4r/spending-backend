import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import ExpressMongoSanitize from 'express-mongo-sanitize'
import hpp from 'hpp'

import todoRouter from './routes/todoRoutes'
import userRouter from './routes/userRoutes'

const app = express()

// MIDDLEWARES

// Set security HTTP headers
app.use(helmet())

const corsOptions = {
    origin: 'http://todofrontend.netlify.app',
}
app.use(cors(corsOptions))

app.use(express.json({ limit: '10kb' }))

// Url Encoder, Allows express to parse data being sent from a from
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Limit requests from same API
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Data sanitization against NoSQL query injection
app.use(ExpressMongoSanitize())

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

// Data sanitization against XSS (DEPRECATED)
app.use(hpp())

// var allowlist = ['http://example1.com', 'http://example2.com']
// var corsOptionsDelegate = function (req, callback) {
//     var corsOptions
//     if (allowlist.indexOf(req.header('Origin')) !== -1) {
//         corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//     } else {
//         corsOptions = { origin: false } // disable CORS for this request
//     }
//     callback(null, corsOptions) // callback expects two parameters: error and options
// }
// app.use(cors(corsOptionsDelegate))

// ROUTES
app.use('/api/v1/todos', todoRouter)
app.use('/api/v1/users', userRouter)

app.get('/', (req, res) => {
    res.status(200).send('Welcome to Our Express Server!!!!')
})

export default app
