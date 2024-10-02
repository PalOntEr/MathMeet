import './LogIn.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Register = () => {

  const [Matricula, setMatricula] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const History = useHistory();
  const handleSubmit = () => {
    History.push("/Home");
  }

  return (
    <div className="h-screen w-screen flex justify-center align-middle flex-col">
    <div id="Container-Form" className="container mx-auto flex bg-comp-1 md:p-8 min-w-[50%]">
      <div className="Form m-6 flex flex-col items-center w-1/2">
        <h2 className="text-5xl text-center mb-8 text-primary">Crear <span className="text-secondary"> Cuenta </span></h2>
        <form className="space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="inputbox space-y-4">
            <p p className="text-primary">Nombre Completo</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Matricula} onChange={(e) => setMatricula(e.target.value)} name="Matricula" type="text" />
          </div>
          <div className="inputbox space-y-4">
            <p p className="text-primary">Matricula</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Matricula} onChange={(e) => setMatricula(e.target.value)} name="Matricula" type="text" />
          </div>
          <div className="inputbox space-y-4">
            <p p className="text-primary">Contraseña</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Contraseña} onChange={(e) => setContraseña(e.target.value)} name="Contraseña" type="password" />
          </div>
          <div className="inputbox space-y-4">
            <p p className="text-primary">Confirmar Contraseña</p>
            <input className='inputLine w-full bg-transparent outline-none text-white border-b-2 border-[var(--primary-color)]' value={Contraseña} onChange={(e) => setContraseña(e.target.value)} name="Contraseña" type="password" />
          </div>
          <div className="btn flex justify-center">
            <Link to="/">
              <button id="btn-submit" className="bg-primary text-comp-1 px-6 py-0.5"> Registrar </button>
            </Link>
          </div>
        </form>
        <p class="Register text-center mt-4 text-primary">¿Ya tienes cuenta? <Link to="/"><span id="IniciarSesion" className="text-secondary underline">Iniciar Sesión</span></Link></p>
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