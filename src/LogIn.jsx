import './LogIn.css'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

const LogIn = () => {

  const [Matricula, setMatricula] = useState('');
  const [Contraseña, setContraseña] = useState('');
  const History = useHistory();
  const handleSubmit = () => {
    History.push("/Home");
  }

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
              <div className="btn my-2 justify-center flex">
                <Link to="/Chats">
                  <button className="btn-submit bg-primary text-comp-1 px-6 py-0.5" > Ingresar </button>
                </Link>
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
}

export default LogIn;