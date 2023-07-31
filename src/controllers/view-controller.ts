import { Request, Response } from 'express'

const index = async (_req: Request, res: Response) => {
    res.render('index', {
        title: 'Gudang',
        layout: './layouts/main-layout.ejs'
    })
}

const login = async (_req: Request, res: Response) => {
    res.render('login', {
        title: 'Gudang | Login',
        layout: './layouts/main-layout.ejs'
    })
}

const register = async (_req: Request, res: Response) => {
    res.render('register', {
        title: 'Gudang | Register',
        layout: './layouts/main-layout.ejs'
    })
}

export default {
    index,
    login,
    register,
}