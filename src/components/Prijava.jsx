import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Prijava() {
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem("korisnici"));

        for (let i in users) {
            if (users[i].email === user.email &&
                users[i].password === user.password) {
                    localStorage.setItem("loggedIn", true);
                    navigate("/");
                    break;
            } else {
                const lastIndex = users.length - 1;
                if (i == lastIndex) {
                    alert("Neispravno korisničko ime ili lozinka");
                }
            }
        }
    }

    return (
        <>
            <div className="logged-out-wrapper">
                <h1>Prijava</h1>
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
                <p>Nemate korisnički račun?</p>
                <Link to="/registracija">Registrirajte se</Link>
            </div>
        </>
    )
}

export default Prijava;