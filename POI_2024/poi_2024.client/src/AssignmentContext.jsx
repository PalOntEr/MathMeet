import React, { createContext, useContext, useState } from 'react';

const AssignmentContext = createContext();

export const AssignmentProvider = ({ children }) => {

    const [idTarea, setIdTarea] = useState(null);

    return (
        <AssignmentContext.Provider value={{ setIdTarea,idTarea }}>
            {children}
        </AssignmentContext.Provider>
    );
};

export const useAssignment = () => useContext(AssignmentContext);
