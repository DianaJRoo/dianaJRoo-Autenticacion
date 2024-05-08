import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { useState } from "react";


export const LogIn = () => {
    const { store, actions } = useContext(Context);
    const [userInfo, setUserInfo] = useState({ "email": "", "password": "" });
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    }

    const handleLogin = async (e) => {
        e.preventDefault()
        const logged = await actions.login(userInfo)
        if (logged) navigate(`/private`)
        else setError(true)
    }

    return (
        <>
           
            <div id='login-body' className="flex flex-col justify-center mt-0 items-center" style={{backgroundImage: 'url("https://wallpapercave.com/wp/wp13615545.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh'}} >

                <div id="login" className="border-4 rounded border-gray-200 drop-shadow-md p-5 ">


                    <form className="border-b border-pink-900 flex flex-col justify-center items-center text-wrap" id="loginform">
                        <p className="text-3xl text-pink-900">Ingresa a tu cuenta</p>


                        <div className="border-y border-pink-900 mt-3 mb-4 w-full">
                            <input
                                className="mt-3 block w-full h-10 px-2 py-1 border border-gray-300 rounded-md font-overpass text-base text-gray-700 focus:outline-none focus:border-pink-500"
                                type="text"
                                name="email"
                                placeholder="Email"
                                required
                                onChange={handleChange}
                            />

                            <input
                                className="my-3  block w-full h-10 px-2 py-1 border border-gray-300 rounded-md font-overpass text-base text-gray-700 focus:outline-none focus:border-pink-500"
                                type="password"
                                placeholder= "Contraseña"
                                name="password"
                                required
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            className="mt-2 bg-pink-900 hover:bg-pink-700 text-pink-200 hover:text-pink-50 font-overpass text-base font-semibold py-2 px-4 rounded inline-flex items-center"
                            type="submit"
                            title="Ingresar"
                            name="Ingresar"
                            onClick={(e) => handleLogin(e)}
                        >
                            Entrar
                        </button><br />
                        {error && <small>invalid email or password</small>}

                        <div className="text-wrap text-xs text-center" style={{ maxWidth: "300px" }}>
                            <p>
                                Al continuar, aceptas nuestros<strong>  Terminos</strong> y nuestra
                            </p>
                            <p className="">
                                <strong>Politica de privacidad</strong>
                            </p>
                        </div>

                    </form>
                    <div className="pie-form flex justify-center ">
                        {/* <Link className="mt-4 text-pink-900" to="">Perdiste tu contraseña</Link><br /> */}
                        <Link className="mt-2 text-pink-900" to="/signup"> <strong>¿No tienes Cuenta? Registrate</strong></Link>
                    </div>

                </div>


                <div className="flex justify-between items-center">
                    <Link to="/hero"><strong>Volver</strong></Link>

                </div>


            </div>



        </>
    );
}
