import React from 'react';
import Menu from './Menu';
import '../styles.css';

const Layout = ({title='Title', description='Description', className, children}) => {
    return(
        <div>
            <Menu />
            <br/><br/>
            <div className={className}>
                {children}
            </div>
        </div>
    );
}

export default Layout;