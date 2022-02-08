import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import AuthContext from "../auth/AuthContext"
import AuthContent from "../components/content/AuthContent"
import Swal from 'sweetalert2'
const LoginPage = () => {
    const { login } = useContext(AuthContext)


    const [form, setForm] = useState(
        {
            email: "",
            password: "",
            rememberMe: false,
        }
    )
    const onChange = ({ target }) => {
        const { name, value } = target
        setForm({
            ...form,
            [name]: value
        });
    }
    useEffect(() => {
        const email = localStorage.getItem("email")
        if (email) {
            setForm((form) => ({
                ...form,
                email,
                rememberMe: true
            }))
        }
        // console.log("for")
    }, [])
    const toggleCheck = () => {
        setForm({
            ...form,
            rememberMe: !form.rememberMe
        })
    }
    const onSubmit = async (e) => {
        e.preventDefault();
        (form.rememberMe)
            ? localStorage.setItem("email", form.email)
            : localStorage.removeItem("email")

        const { email, password } = form
        const ok= await login(email, password)
        if(!ok){
            alert('Email or password is incorrect')
        }

    }

    const todoOk = () => {
        return (form.email.length > 0 && form.password.length > 0) ? true : false
    }
    return (
        <AuthContent>
            <form className="login100-form validate-form flex-sb flex-w"
                onSubmit={onSubmit}
            >
                <span className="login100-form-title mb-3">
                    Chat - Ingreso
                </span>

                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={onChange}
                    />
                    <span className="focus-input100"></span>
                </div>


                <div className="wrap-input100 validate-input mb-3">
                    <input
                        className="input100"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={onChange}
                    />
                    <span className="focus-input100"></span>
                </div>

                <div className="row mb-3">
                    <div
                        onClick={() => toggleCheck()}
                        className="col">

                        <input
                            className="input-checkbox100"
                            id="ckb1"
                            type="checkbox"
                            name="rememberMe"
                            checked={form.rememberMe}
                            readOnly
                        />
                        <label className="label-checkbox100">
                            Recordarme
                        </label>
                    </div>

                    <div className="col text-right">
                        <Link to="/register" className="txt1">
                            Nueva cuenta?
                        </Link>
                    </div>
                </div>

                <div className="container-login100-form-btn m-t-17">
                    <button 
                    className="login100-form-btn"
                    disabled={!todoOk()}
                    >
                        Ingresar
                    </button>
                </div>

            </form>
        </AuthContent>
    )
}
export default LoginPage
