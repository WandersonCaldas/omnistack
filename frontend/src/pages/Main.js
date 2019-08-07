import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './Main.css';

import api from '../services/api';

import logo from '../assets/logo.png';
import like from '../assets/like.png';
import dislike from '../assets/dislike.png';

export default function Main({ match }) {
    const [users, setUsers] = useState([]);

    useEffect(() =>{
        async function loadusers() {
            const response = await api.get('/devs', {
                headers: { 
                    user: match.params.id,
                }
            })

            setUsers(response.data);
        }

        loadusers();
    }, [match.params.id])

    async function handleLike(id) {
        await api.post(`/devs/${id}/likes`, null, {
            headers: { user: match.params.id },
        })

        setUsers(users.filter(user => user._id != id));
    }

    async function handleDislike(id) {
        await api.post(`/devs/${id}/dislikes`, null, {
            headers: { user: match.params.id },
        })
        
        setUsers(users.filter(user => user._id != id));
    }

    return(
        <div className="main-container">
            <Link to="/">
                <img src={logo} alt="logo" width="200px" />
            </Link>             
             { users.length > 0 ? (
                    <ul>
                        {users.map(user => (
                            <li key={user._id}>
                                <img src={user.avatar} alt={user.name} />
                                <footer>
                                    <strong>{user.name}</strong>
                                    <p>{user.bio}</p>
                                </footer>
            
                                <div className="buttons">
                                    <button type="button" onClick={() => handleDislike(user._id)}>
                                        <img src={dislike} alt="Dislike" width="50px" />
                                    </button>
                                    <button type="button" onClick={() => handleLike(user._id)}>
                                        <img src={like} alt="Like" width="50px" />
                                    </button>
                                </div>
                            </li>
                        ))}     
                    </ul>
                ) : (
                    <div className="empty">Acabou</div>
                ) }
        </div>
        //<h1>{ match.params.id }</h1>
    );
}