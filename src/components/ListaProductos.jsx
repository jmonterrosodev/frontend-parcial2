import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstancia from "../axiosConfig";
import { toast } from "react-toastify";

const ListaProductos = () => {
    const [productos, setProductos] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        axiosInstancia
            .get("/productos")
            .then((response) => setProductos(response.data))
            .catch((error) =>
                console.error("Error al obtener productos:", error)
            );
    }, []);

    const handleEdit = (id) => {
        navigate(`/editar-producto/${id}`);
    };

    const handleView = (id) => {
        navigate(`/ver/${id}`);
    };

    const handleDelete = (id) => {
        if (
            window.confirm(
                "¿Estás seguro de que deseas eliminar este producto?"
            )
        ) {
            axiosInstancia
                .delete(`/productos/${id}`)
                .then((response) => {
                    setProductos(
                        productos.filter((producto) => producto.id !== id)
                    );
                    toast.success("Producto eliminado exitosamente");
                })
                .catch((error) => {
                    console.error("Error al eliminar producto:", error);
                    toast.error("Error al eliminar producto");
                });
        }
    };

    const handleAdd = () => {
        navigate("/agregar-producto");
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>

            <button
                onClick={handleAdd}
                className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-700"
            >
                Agregar Producto
            </button>

            <ul>
                {productos.map((producto) => (
                    <li
                        key={producto.id}
                        className="mb-4 p-4 border rounded shadow-sm flex justify-between items-center"
                    >
                        <span>{producto.nombre}</span>
                        <div className="flex space-x-2">
                            <button
                                onClick={() => handleView(producto.id)}
                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Ver
                            </button>
                            <button
                                onClick={() => handleEdit(producto.id)}
                                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-700"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => handleDelete(producto.id)}
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Eliminar
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ListaProductos;
