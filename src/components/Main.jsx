// Hiển thị trang Navbar và các trang con
import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";

export const Main = () => {
    return (
        <div className="flex flex-col h-screen">
        <Navbar />
        <main className="flex-1 overflow-y-auto bg-bg-primary">
            <Outlet />
        </main>
        </div>
    );
};
