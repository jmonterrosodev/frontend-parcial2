import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axiosInstancia from "../axiosConfig";

const EditarProducto = () => {
    const { id } = useParams();
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [estado, setEstado] = useState("disponible");
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstancia
            .get(`/productos/${id}`)
            .then((response) => {
                const producto = response.data;
                setNombre(producto.nombre);
                setDescripcion(producto.descripcion);
                setPrecio(producto.precio);
                setEstado(producto.estado);
            })
            .catch((error) => {
                console.error("Error al obtener el producto:", error);
                toast.error("Error al obtener el producto");
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const productoActualizado = { nombre, descripcion, precio, estado };

        axiosInstancia
            .put(`/productos/${id}`, productoActualizado)
            .then((response) => {
                toast.success("Producto actualizado exitosamente");
                navigate(-1);
            })
            .catch((error) => {
                console.error("Error al actualizar el producto:", error);
                toast.error("Error al actualizar el producto");
            });
    };

    const handleBack = () => {
        navigate("/");
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
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
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                >
                    Actualizar
                </button>
            </form>
        </div>
    );
};

export default EditarProducto;
