/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/ban-types */
import { type Request ,type Response, type CookieOptions, type NextFunction } from 'express'
import jwt, {JwtPayload} from 'jsonwebtoken'
import User from '../models/userModel'
import { type ExpressFunction } from '../types/expressFunction'
import { type IUser } from '../types/user'

const JWT_SECRET = process.env.JWT_SECRET
const EXPIRES_IN = process.env.JWT_EXPIRES_IN
const JWT_COOKIE_EXPIRES_IN = Number(process.env.JWT_COOKIE_EXPIRES_IN)

if (!JWT_SECRET || !EXPIRES_IN || !JWT_COOKIE_EXPIRES_IN) {
    throw new Error('JWT is not defined in the environment')
}
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const signToken = (id: Object) => {
    return jwt.sign({ id }, JWT_SECRET, {
        expiresIn: EXPIRES_IN,
    })
}

const createSendToken = (user: IUser, statusCode: number, res: Response) => {
    // @ts-expect-error
    const token = signToken(user._id)
    const cookieOptions: CookieOptions = {
        expires: new Date(
            Date.now() + JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
    }
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true

    res.cookie('jwt', token, cookieOptions)

    // Remove password from output
    // @ts-expect-error
    user.password = undefined

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user,
        },
    })
}

export const signup: ExpressFunction = async (req, res) => {
    try {
        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm,
        })
        // @ts-expect-error
        createSendToken(newUser, 201, res)
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        })
    }
}

// @ts-expect-error
export const login: ExpressFunction = async (req, res) => {
    try {
        const { email, password } = req.body

        // 1) Check if email and password exist
        if (!email || !password) {
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide email and password!',
            })
        }
        // 2) Check if user exists && password is correct (selects the user password from DB)
        const user = await User.findOne({ email }).select('+password')

        // @ts-expect-error
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({
                status: 'fail',
                message: 'Incorrect email or password',
            })
        }

        // 3) If everything ok, send token to client
        // @ts-ignore
        createSendToken(user, 200, res)
    } catch (err) {
        return res.status(400).json({
            status: 'fail',
            message: err,
        })
    }
}

export const protect = async (req:Request, res:Response, next:NextFunction) => {
    try {
        // 1) Getting token and check of it's there
        let token
        if (
            // @ts-ignore
            req.headers.authorization &&
            // @ts-ignore
            req.headers.authorization.startsWith('Bearer')
        ) {
            // @ts-ignore
            token = req.headers.authorization.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: 'You are not logged in! Please log in to get access.',
            })
        }

        // 2) Verification token
        const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload // Type Assertion

        const currentUser = await User.findById(decoded.id)

        // @ts-ignore
        req.user = currentUser

        next()
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err,
        })
    }
}

export const restrictTo = (...roles: Array<'admin' | 'user'>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        // roles ['admin', 'user']. role='user'

        // @ts-ignore
        if (!roles.includes(req.user.role)) {
            // @ts-ignore
            console.log('Current user in restrictTo Function', req.user)

            return res.status(401).json({
                status: 'fail',
                message: 'You do not have permission to perform this action',
            })
        }

        next()
    }
}
