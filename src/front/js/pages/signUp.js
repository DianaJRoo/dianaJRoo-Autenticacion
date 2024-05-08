import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Context } from "../store/appContext";

export const SignUp = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",

  })

  const handleChange = ({ target }) => {
    const { name, value } = target
    if (name === "learning_language" || name === "native_language") setUserInfo({ ...userInfo, [name]: Number(value) })
    else setUserInfo({ ...userInfo, [name]: value })

  }
  console.log(userInfo)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userInfo)
    console.log(userInfo.username)
    
  
  const registered = null
    try{registered = await actions.createNewUser(userInfo) } 
    catch (error) {
     
      console.log(error.message)
    	if (error.message == "Email already exists"){
       
        alert(store.currentIdiom !== "Español" ?
        "Email already exists" :
        "Correo electronico ya existe");
        return;
      }
     
    return false; 
  }

    if (registered) navigate('/login')
    else undefined
  };


  return (<>
  
    <div className='flex flex-col justify-around items-center mx-auto max-w-screen-sm h-screen'>
      <form onSubmit={handleSubmit} className="flex flex-col items-center p-4 mx-auto max-w-screen-sm h-screen">
       
        <div id="form1" className="border border-gray-900/10 pb-15 p-4 mx-auto max-w-screen-sm rounded-lg shadow-2">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
              Información Personal    
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Utilice una dirección permanente donde pueda recibir correo.
          </p>

            <div className="sm:col-span-3 mt-2">
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Dirección de correo electrónico
             </label>
              <div className="sm:col-span-3">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  value={userInfo.email}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between ">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Contraseña                
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required
                  value={userInfo.password}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>

            <div className="footer" style={{ display: 'flex', justifyContent: 'center' }}>

              <button className="flex justify-center mt-7 mb-1 bg-pink-900 hover:bg-pink-700 text-pink-200 hover:text-pink-50 font-overpass text-base font-semibold py-3 px-10 rounded "
                type="submit"
                title="Ingresar"
                name="Ingresar">
                {store.currentIdiom !== "Español" ? (
                  <>Register</>
                ) : (
                  <>Registrar</>
                )}
              </button>

            </div>
          </div >
        </div >
      </form >
    </div >
  </>
  );
}
