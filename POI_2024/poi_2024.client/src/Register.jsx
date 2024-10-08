import './LogIn.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {

  const [Nombre, setNombre] = useState('');
  const [Matricula, setMatricula] = useState('');
  const [Contraseña, setContraseña] = useState('');
    const [IntentoRegister, setIntentoRegister] = useState(false);
    const navigate = useNavigate();
  const handleSubmit = async(e) => {
      e.preventDefault();  // Evita que la página se recargue al enviar el formulario
      setIntentoRegister(true);
     
      // Construir el objeto a enviar en la solicitud POS
  }

    useEffect(() => {
        if (!IntentoRegister) return;

        const nuevoUsuario = {
            nombreCompleto: Nombre,
            matricula: Matricula,
            contrasena: Contraseña,
            iD_ArchivoFoto: 1,  //esto esta hardcodeado para efecto practicos
            calCoins: 0
        };
        const RegisterUser = async () => {
            try {
                // Realiza la solicitud POST a la API
                const response = await fetch('CreateUser', {  //la path de la api (sin el controller)
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(nuevoUsuario),  // convierte el objeto a JSON (que es lo que espera la api)
                });

                const data = await response.json();
                //console.log(data);  // 
                if (!response.ok) {
                    throw new Error('Error en la solicitud');
                }

                console.log('Usuario registrado con éxito:', data);
                //alert("Usuario registrado con éxito");
                navigate('/');
            } catch (error) {
                console.error('Error al registrar el usuario:', error);
                //alert("Hubo un error al registrar el usuario");
            }
        }
            RegisterUser();
    },[IntentoRegister, Nombre, Matricula, Contraseña, navigate]);
  return (
    <div className="h-screen w-screen flex justify-center align-middle flex-col">
    <div id="Container-Form" className="container mx-auto flex bg-comp-1 md:p-8 min-w-[50%]">
      <div className="Form m-6 flex flex-col items-center w-1/2">
        <h2 className="text-5xl text-center mb-8 text-primary">Crear <span className="text-secondary"> Cuenta </span></h2>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="inputbox space-y-4">
            <p className="text-primary">Nombre Completo</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Nombre} onChange={(e) => setNombre(e.target.value)} name="Nombre" type="text" />
          </div>
          <div className="inputbox space-y-4">
            <p className="text-primary">Matricula</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Matricula} onChange={(e) => setMatricula(e.target.value)} name="Matricula" type="text" />
          </div>
          <div className="inputbox space-y-4">
            <p className="text-primary">Contraseña</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Contraseña} onChange={(e) => setContraseña(e.target.value)} name="Contraseña" type="password" />
          </div>
          <div className="inputbox space-y-4">
            <p className="text-primary">Confirmar Contraseña</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Contraseña} onChange={(e) => setContraseña(e.target.value)} name="Contraseña" type="password" />
          </div>
          <div className="btn flex justify-center">            
            <button id="btn-submit" className="bg-primary text-comp-1 px-6 py-0.5" type="submit"> Registrar </button>           
          </div>
        </form>
        <p className="Register text-center mt-4 text-primary">¿Ya tienes cuenta? <Link to="/"><span id="IniciarSesion" className="text-secondary underline">Iniciar Sesión</span></Link></p>
      </div>
      
      <div className="bg-primary rounded min-w-0.5 hidden md:flex"></div>
      <div className="flex flex-col justify-center items-center w-1/2">
            <h1 className="Title text-8xl text-center text-primary font-semibold">Math<span className="text-secondary">Meet</span></h1>
            <p className="Slogan text-center text-primary">
              Donde Los Math <span className="text-secondary"> Conocen a los Meet.</span>
            </p>
          </div>
    </div>
    </div>
  );
}

export default Register;