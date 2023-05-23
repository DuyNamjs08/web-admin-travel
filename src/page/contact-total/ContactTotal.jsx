import React from 'react';
import { Outlet } from 'react-router-dom';

function ContactTotal(props) {
    return (
        <div>
           <Outlet /> 
        </div>
    );
}

export default ContactTotal;