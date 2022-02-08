import { useCallback, useContext } from 'react'
import { useEffect } from 'react'
import { createContext, useState } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { fetchNotToken, fetchToken } from '../helpers/fetch'
import { types } from '../types/types'

const AuthContext = createContext()

const initialState = {
    uid: null,
    checking: true,
    logged: false,
    error: null,
    name: null,
    email: null,
}

export const AuthProvider = ({ children }) => {
    const {dispatch} = useContext(ChatContext)
    const [auth, setAuth] = useState(initialState)

    const login = async (email, password) => {
        const res = await fetchNotToken('login', { email, password }, 'POST')
        if (res.ok) {
            localStorage.setItem('token', res.token)
            const { user } = await res
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email
            })
        }
        return res.ok


    }
    const register = async (name, email, password) => {
        const res = await fetchNotToken('register', { name, email, password }, 'POST')
        if (res.ok) {
            return alert("registrado correctamente")
        }
        return alert("no se pudo registrar")
    }
    useEffect(() => {
    }, [])
    const verifyToken = useCallback(async() => {
        const token = localStorage.getItem('token');
        // verificar token
        if (!token) {
            setAuth(initialState)
            return false;
        }
        const res= await fetchToken('renew')
        if (res.ok) {
            const { user } = await res
            setAuth({
                uid: user.uid,
                checking: false,
                logged: true,
                name: user.name,
                email: user.email
            })

            return true
        }else{
            setAuth(initialState)
            return false;
        }

    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        dispatch({
            type: types.DropData
        })
        setAuth(initialState)
    }
    return (
        <AuthContext.Provider
            value={
                {
                    login,
                    register,
                    logout,
                    verifyToken,
                    auth
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
