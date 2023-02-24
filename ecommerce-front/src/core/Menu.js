import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import {signout, isAuthenricated} from '../auth/index';
import {itemTotal} from './cartHelpers';

const isActive = (history, path) => {
    if(history.location.pathname === path) {
        return {color: '#ff9900'}
    } else {
        return {color: '#ffffff'}
    }
}

const Menu = ({history}) => {
    return(
        <div>
            <ul className="nav nav-tabs bg-danger">

                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/shop')} to="/shop">Services</Link>
                </li>
                {isAuthenricated() && isAuthenricated().user.role === 0 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                    </li>
                )}
                {isAuthenricated() && isAuthenricated().user.role === 1 && (
                    <li className="nav-item">
                        <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                    </li>
                )}
                {!isAuthenricated() && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </>
                )}
                {isAuthenricated() && isAuthenricated().user.role === 1 && (
                                    <li className="nav-item">
                                          <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                                     </li>
                     )}

                {isAuthenricated() && (
                    <li className="nav-item">
                        <span className="nav-link" style={{cursor: 'pointer', color: '#ffffff'}} onClick={() => signout(() => {
                            history.push('/');
                            })
                        }>Signout</span>
                    </li>
                )}
            </ul>
        </div>
    );
}

export default withRouter(Menu);