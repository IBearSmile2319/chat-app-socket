import { Navigate, Outlet } from 'react-router-dom'
const PublicRouter = ({isAuth}) => {
    return isAuth ? <Navigate to="/" /> : <Outlet />
}

export default PublicRouter
