import './App.css';
import LogIn from './LogIn.jsx';
import Chats from './Pages/Chats.jsx';
import Shop from './Pages/Shop.jsx';
import VideoChat from './Pages/VideoChat.jsx';
import Assignments from './Pages/Assignments.jsx';
import Register from './Register.jsx';
import Test from './Test.jsx';
import ModifyUser from './Pages/ModifyUser.jsx';
import SideBar from './Components/SideBar.jsx';
import {BrowserRouter as Router,Switch,Route } from 'react-router-dom';  
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min.js';

function App() {
  return (
      <Router>
        <Main />
    </Router>
  );
}

function Main()
{
  const location = useLocation();

  const NoSideBar = ["/", "/Register"];

  return( <div className='App'>
    <div className="flex w-full h-full">
    {!NoSideBar.includes(location.pathname) && <SideBar />}
      <Switch>
        <Route path="/" exact component ={LogIn}/>
        <Route path="/Register" exact component={Register}/>
        <Route path="/ModifyUser" exact component ={ModifyUser}/>
        <Route path="/Chats" exact component={Chats}/>
        <Route path="/Shop" exact component={Shop}/>
        <Route path="/Assignments" exact component={Assignments}/>
        <Route path="/Test" exact component={Test}/>
        <Route path="/VideoChat" exact component={VideoChat}/>
      </Switch>
      </div>
  </div>);
}
export default App;
