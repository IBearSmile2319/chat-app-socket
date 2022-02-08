
import { useContext, useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AuthContext from '../auth/AuthContext'
import ChatPages from '../pages/ChatPages'
// import { Error404 } from '../pages/Error404'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import PrivateRouter from './PrivateRouter'
import PublicRouter from './PublicRouter'
const AppRouter = () => {
    const { auth, verifyToken } = useContext(AuthContext)
    useEffect(()=>{
        verifyToken();
    },[verifyToken])
    // if (auth.checking) {
    //     <Navigate to="/login" />
    //     return <h1>Espere por favor</h1>
    // }
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<PrivateRouter isAuth={auth.logged} />}>
                    <Route path="/" element={<ChatPages />} />
                </Route>
                <Route element={<PublicRouter isAuth={auth.logged} />}>
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRouter
