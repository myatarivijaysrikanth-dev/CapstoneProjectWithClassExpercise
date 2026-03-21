import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import AddBookPage from "../pages/AddBookPage";

const AppRoutes = () => {

    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add-book" element={<AddBookPage />} />
        </Routes>

    );

};

export default AppRoutes;