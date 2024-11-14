import './LogIn.css';
import { useState, useEffect,useContext } from 'react';
import { UserContext } from './UserContext';
import { Link, useNavigate } from 'react-router-dom';

const LogIn = () => {

    const [Matricula, setMatricula] = useState('');
    const [Contraseña, setContraseña] = useState('');
    const [IntentoLogin, setIntentoLogin] = useState(false);
    const [mostrarDiv, setMostrarDiv] = useState(false);
    const { LoginUsuario,user } = useContext(UserContext);

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();  // Evita que la página se recargue al enviar el formulario
        setIntentoLogin(true);
    };

    useEffect(() => {
        if (!IntentoLogin) return;

        const loginUser = async () => {
            const login = {
                matricula: Matricula,
                Contrasena: Contraseña,
            }
            try {
                // Realiza la solicitud POST a la API
                const response = await fetch('LogIn', {  //la path de la api (sin el controller)
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(login),  // convierte el objeto a JSON (que es lo que espera la api)
                });



                if (!response.ok) {
                    throw new Error('Error en el inicio de sesion'); //si la contrseña es incorrecta o no existe el usuario
                }

                const data = await response.json();

                LoginUsuario({
                    Matricula: data.matricula,
                    UserName: data.nombreCompleto,
                    Encrypt: data.encrypt,
                    NombreCompleto: data.nombreCompleto,
                    Active: data.status
                });
                navigate('/Chats')//si todo sale bien re redirecciona a la pagina de chats

            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                //alert("Hubo un error al inicial sesion"); //dice que algo salio mal
                setMostrarDiv(true);
            } finally {
                setIntentoLogin(false);
            };

        };
        loginUser();

    }, [IntentoLogin, Matricula, Contraseña, navigate]);

    return (
        <div className="flex flex-col h-screen w-screen justify-center items-center ">
            <h1 className="Title text-7xl h-[10%] text-center md:hidden ">Math<span>Meet</span></h1>
            <div className="Container-Form flex min-w-[50%] p-3 md:p-8 bg-comp-1">
                <div className="m-6 min-w-80">
                    <h2 className="text-5xl text-center mb-8 text-primary">Iniciar<span className="text-secondary"> Sesión</span></h2>
                    <form className="space-y-12" onSubmit={handleSubmit}>
                        <div className="inputbox space-y-3">
                            <p className="text-primary">Matricula</p>
                            <input className="inputLine w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" value={Matricula} onChange={(e) => setMatricula(e.target.value)} name="Matricula" type="text" />
                        </div>
                        <div className="inputbox space-y-3">
                            <p className="text-primary">Contraseña</p>
                            <input className="inputLine w-full bg-transparent outline-none border-b-2 text-white border-[var(--primary-color)]" value={Contraseña} onChange={(e) => setContraseña(e.target.value)} name="Contraseña" type="password" />
                        </div>

                        {mostrarDiv && (
                            <div id="alert-border-2" className="flex items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800" role="alert">
                                <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <div className="ms-3 text-sm font-medium">
                                    Usuario o contraseña incorrectos.
                                </div>
                            </div>
                        )}
                        <div className="btn my-2 justify-center flex">
                            <button type="submit" className="btn-submit bg-primary text-comp-1 px-6 py-0.5" > Ingresar </button>
                        </div>
                    </form>
                    <p className="Register text-center mt-4 text-primary">¿No tienes cuenta? <Link to="/Register"><span id="Registrarse" className="text-secondary underline">Registrate</span></Link></p>
                </div>
                <div className="bg-primary rounded min-w-0.5 hidden md:flex"></div>
                <div className="hidden content-center md:block w-[100%] m-10">
                    <h1 className="Title text-8xl text-center text-primary font-semibold">Math<span className="text-secondary">Meet</span></h1>
                    <p className="Slogan text-center text-primary">
                        Donde Los Math <span className="text-secondary"> Conocen a los Meet.</span>
                    </p>
                </div>
            </div>
        </div>
    );

};
export default LogIn;