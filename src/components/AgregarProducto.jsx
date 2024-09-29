import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstancia from "../axiosConfig";
import { toast } from "react-toastify";

const AgregarProducto = () => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [estado, setEstado] = useState("disponible");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const nuevoProducto = { nombre, descripcion, precio, estado };

        axiosInstancia
            .post("/productos", nuevoProducto)
            .then((response) => {
                toast.success("Producto agregado exitosamente");
                navigate("/");
            })
            .catch((error) => {
                toast.error("Error al agregar el producto");
            });
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Agregar Producto</h1>

            <button
                onClick={handleBack}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
                Regresar a la Lista
            </button>
            <form
                onSubmit={handleSubmit}
                className="p-4 border rounded shadow-sm"
            >
                <div className="mb-4">
                    <label className="block text-gray-700">Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Descripción</label>
                    <textarea
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Precio</label>
                    <input
                        type="number"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Estado</label>
                    <select
                        value={estado}
                        onChange={(e) => setEstado(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        required
                    >
                        <option value="disponible">Disponible</option>
                        <option value="agotado">Agotado</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                    Guardar
                </button>
            </form>
        </div>
    );
};

export default AgregarProducto;
