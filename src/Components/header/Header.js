import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import './Header.css';

const Header = () => {
    const { user, dispatch } = useAuthContext();

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({ type: 'LOGOUT' })
    }

    const handleClick = () => {
        logout();
    };

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Qarz daftari</h1>
                </Link>
                <nav>
                    {user?.role === "root" ?
                        <div className='admin_link'>
                            <Link to="/archives">archives</Link>
                            <Link to="/admin">admin</Link>

                        </div>
                        : ""
                    }
                    {user ? (
                        <div>
                            <span>{user.email}</span>
                            <Link to="/signup">Signup</Link>
                            <button onClick={handleClick}>Log out</button>

                        </div>
                    ) : (
                        <div>
                            <Link to="/login">Login</Link>

                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
