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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import ReviewAssignments from './Pages/ReviewAssignments.jsx';

function App() {
    return (
        <Router>
            <Main />
        </Router>
    );
}

function Main() {
    const location = useLocation();

    const NoSideBar = ["/", "/Register"];

    return (<div className='App w-screen h-screen'>
        <div className="flex w-full h-full">
            {!NoSideBar.includes(location.pathname) && <SideBar />}
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/Register" element={<Register />} />
                <Route path="/ModifyUser" element={<ModifyUser />} />
                <Route path="/Chats" element={<Chats />} />
                <Route path="/Shop" element={<Shop />} />
                <Route path="/Assignments" element={<Assignments />} />
                <Route path="/Test" element={<Test />} />
                <Route path="/VideoChat" element={<VideoChat />} />
                <Route path="/ReviewAssignments" element={<ReviewAssignments />} />
            </Routes>
        </div>
    </div>
    );
}
export default App;
