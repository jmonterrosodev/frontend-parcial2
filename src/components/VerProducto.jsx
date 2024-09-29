import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstancia from "../axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const VerProducto = () => {
    const { id } = useParams();
    const [producto, setProducto] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstancia
            .get(`/productos/${id}`)
            .then((response) => setProducto(response.data))
            .catch((error) =>
                console.error("Error al obtener el producto:", error)
            );
    }, [id]);

    const handleEdit = () => {
        navigate(`/editar-producto/${id}`);
    };

    const handleDelete = () => {
        if (
            window.confirm(
                "¿Estás seguro de que deseas eliminar este producto?"
            )
        ) {
            axiosInstancia
                .delete(`/productos/${id}`)
                .then((response) => {
                    toast.success("Producto eliminado exitosamente");
                    navigate("/");
                })
                .catch((error) => {
                    console.error("Error al eliminar producto:", error);
                    toast.error("Error al eliminar producto");
                });
        }
    };

    const handleBack = () => {
        navigate('/');
      };

    if (!producto) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold mb-4">Detalles del Producto</h1>
            
          <button 
            onClick={handleBack} 
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Regresar a la Lista
          </button>
            <div className="p-4 border rounded shadow-sm">
                <p>
                    <strong>Nombre:</strong> {producto.nombre}
                </p>
                <p>
                    <strong>Descripción:</strong> {producto.descripcion}
                </p>
                <p>
                    <strong>Precio:</strong> Q{producto.precio}
                </p>
                <p>
                    <strong>Estado:</strong>{" "}
                    {producto.estado == "disponible" ? (
                        <span className="text-green-500">Disponible</span>
                    ) : (
                        <>
                            {" "}
                            <span className="text-red-500">Agotado</span>
                        </>
                    )}{" "}
                </p>
                <div className="flex space-x-2 mt-4">
                    <button
                        onClick={handleEdit}
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-700"
                    >
                        Editar
                    </button>
                    <button
                        onClick={handleDelete}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                        Eliminar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerProducto;
