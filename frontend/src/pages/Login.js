import React, { useState } from 'react';
import './Login.css';

import api from '../services/api';

import logo from '../assets/logo.png';

export default function Login({ history }) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();

        //console.log(username);

        const response = await api.post('/devs', {
            username, 
        });

        const { _id } = response.data;

        //console.log(response);
        history.push(`/dev/${_id}`);
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <img src={logo} alt='teste' />
                <input 
                    placeholder="Usuário1"
                    value={username} 
                    onChange={e => setUsername(e.target.value)}
                />
                <button type="submit">Enviar</button>
            </form>            
        </div>        
    );
}