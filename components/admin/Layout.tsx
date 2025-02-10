"use client"
import React from 'react';
import SideBar from "@/components/admin/AdminSideBar";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

function Layout({ children }) {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='flex h-full w-1/4'>
                    <SideBar />
                </div>
                <div className='w-2/3 p-8'>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;