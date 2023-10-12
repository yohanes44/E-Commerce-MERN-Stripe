import React from 'react';
import Sidebar from '../../../components/admin/sidebar/Sidebar';
import Navbar from '../../../components/admin/navbar/Navbar';

import "./list.scss"
import Datatable from '../../../components/admin/datatable/Datatable';

export default function ListAdmin() {
    return (
        <div className='list'>
            <Sidebar />
            <div className="listContainer">
                <Navbar />
                <Datatable />
            </div>
        </div>
    );
}
