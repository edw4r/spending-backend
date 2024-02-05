export interface IUser {
    _id?: Object
    name: string
    email: string
    photo?: string
    role: 'user' | 'admin'
    password: string
    passwordConfirm?: string
}
