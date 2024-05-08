import React, { useContext } from 'react';

import { Link } from 'react-router-dom';



export const Hero = () => {

    return (
        <>
            <div id='hero-body' className="flex justify-center items-center mt-0 mb-0 " style={{backgroundImage: 'url("https://64.media.tumblr.com/c5dea7e55d742a5a5cee3dd8091a0645/2d0d102702bf034d-bc/s1280x1920/378aad88947b2982f3bd628e73571cb326a9326c.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '170vh'}}>
            
                <div id='hero' className='d-flex flex-column'  >
                    <h1 className='text-5xl text-gray-500 font-bold text-center'>
                
                    </h1>
                    <div className='mt-16'>
                        <Link id='boton-hero' className='block m-auto text-center h-14 rounded-xl border-0 w-96' to='/signup' style={{ paddingTop: '12px' }}>
                            <strong className='mt-4'>¡Empieza ahora!</strong>
                        </Link>
                        <Link id='boton-hero2' className="block m-auto text-pink-500 text-center mt-2 p-0 h-14 rounded-xl border-b-0 border-2 border-slate-200 w-96" style={{ paddingTop: '12px' }} to='/login'>
                            <strong className='py-2 text-pink-500'>¡Ya tengo cuenta!</strong>
                        </Link>
                    </div>
                </div>
            </div>
           
        </>
    );
};


