import React, { useState, useEffect } from 'react';

const Test = () => {
    const [usuarios, setUsuarios] = useState(null);

    useEffect(() => {
        fetch('usuarios')
            .then(response => response.json())
            .then(data => {
                setUsuarios(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className="Test">
            <h1 className="text-white">HOLAAAA</h1>
            {usuarios && (
                <ul className="text-white">
                    {usuarios.map(usuario => (
                        <li key={usuario.matricula}>
                            <span>{usuario.nombreCompleto}</span>
                            <span>{usuario.contrasena}</span>
                            <span>{usuario.iD_ArchivoFoto}</span>
                            <span>{usuario.calCoins}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
export default Test;
