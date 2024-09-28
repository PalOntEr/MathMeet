import GroupImg from '../Images/DAMN.png'

import { Link } from 'react-router-dom'

function ReviewAssignments()
{
    return(
        <div id="Review-Container" className="w-2/3 h-full justify-center items-center flex">
            <div id="Assignments-Container" className="flex bg-comp-1 w-5/6 h-5/6 p-4 rounded-xl">
                <ul className="w-full overflow-y-auto h-full">
                        <Link to="/Assignments">
                    <li className="flex h-24 justify-between border-b-2 border-[var(--primary-color)] py-2">
                        <div className="flex space-x-4">
                        <img src={GroupImg} className="w-auto h-auto rounded-full"/>
                        <h1 className="text-3xl font-bold text-primary self-center">STUDENTS NAME</h1>
                        </div>
                        <h2 className="flex items-center font-bold text-primary text-2xl">DELIVERED</h2>

                    </li>
                        </Link>
                </ul>
            </div>
        </div>
    );
}

export default ReviewAssignments;