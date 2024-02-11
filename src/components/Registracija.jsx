import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Registracija() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("korisnici")) {
            const userList = JSON.parse(localStorage.getItem("korisnici"));
            setUsers(userList);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (user) {
            const users = JSON.parse(localStorage.getItem("korisnici"));

            if (users) {
                for (let i in users) {
                    if (users[i].email === user.email) {
                        alert("Email je već registriran");
                        break;
                    } else {
                        const lastIndex = users.length - 1;
                        if (i == lastIndex) {
                            addNewUser();
                        }
                    }
                }
            } else {
                addNewUser();
            }
        }
    }

    function addNewUser() {
        const newUser = {email: user.email, password: user.password};
        setUsers([...users, newUser]);
        localStorage.setItem("korisnici", JSON.stringify([...users, newUser]));
        setUser("");
        navigate("/prijava");
    }

    return (
        <>
            <div className="logged-out-wrapper">
                <h1>Registracija</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="email" 
                        placeholder="Unesite email adresu" 
                        name="email" 
                        value={user.email} 
                        onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Unesite lozinku" 
                        name="password" 
                        value={user.password}
                        onChange={(e) => setUser({...user, [e.target.name]: e.target.value})}
                        required 
                    />
                    <button type="submit">Potvrda</button>
                </form>
            </div>
        </>
    )
}

export default Registracija;