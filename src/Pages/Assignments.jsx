import SideBar from '../Components/SideBar.jsx'
import AddIcon from '@mui/icons-material/Add';
import './Assignments.css';

function Assignments() {
    return (
            <div className='Content-container flex flex-col justify-between w-full m-6'>
                <div className="flex flex-col text-5xl w-full">
                    <h2 className="text-3xl text-primary text-center font-bold">Group Name</h2>
                    <h1 className="text-5xl text-secondary text-center font-bold">Assignment Name</h1>
                    <div id="Description-Container" className=" space-y-2 my-8">
                        <h2 className="text-2xl font-bold text-color">Description:</h2>
                        <div className="w-full min-h-80 bg-comp-1 p-4 rounded-xl">
                            <p className="text-lg text-white">HOLAAAAAAAACOMO ESTAN TODOOOOOS JEEJEJEJEJ</p>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-color">Work:</h2>
                    <label className="w-full h-full flex" htmlFor="AddWork"><AddIcon id="Icon-Button" className="text-primary bg-comp-1 rounded-xl" /></label>
                    <input type="file" id="AddWork" hidden />
                </div>

                <div id="Status" className="flex justify-between w-full font-bold text-lg">
                    <h4 className="text-primary p-2 rounded-xl bg-comp-1">Status: Not Delivered</h4>
                    <h2 className="text-secondary">Reward: 25 CalCoins.</h2>
                </div>
            </div>
    );
}

export default Assignments;