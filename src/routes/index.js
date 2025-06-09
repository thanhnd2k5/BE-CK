import authRouter from './auth.router'
import admin from './admin'
import user from './user'

function route(app) {
    app.use('/admin', admin)
    app.use('/auth', authRouter)
    app.use('/users', user)
}

export default route
