// eslint-disable-next-line no-unused-vars
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ListaProductos from "./components/ListaProductos";
import VerProducto from "./components/VerProducto";
import AgregarProducto from "./components/AgregarProducto";
import EditarProducto from "./components/EditarProducto";

import "./index.css";

const App = () => {
    return (
        <BrowserRouter>
            <div className="container mx-auto">
                <Routes>
                    <Route path="/" element={<ListaProductos />} />
                    <Route path="/ver/:id" element={<VerProducto />} />
                    <Route
                        path="/agregar-producto"
                        element={<AgregarProducto />}
                    />
                    <Route
                        path="/editar-producto/:id"
                        element={<EditarProducto />}
                    />
                </Routes>
                <ToastContainer />
            </div>
        </BrowserRouter>
    );
};

export default App;
