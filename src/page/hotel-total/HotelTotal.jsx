import React from 'react';
import { Outlet } from 'react-router-dom';

function HotelTotal(props) {
    return (
        <div>
            <Outlet />
        </div>
    );
}

export default HotelTotal;