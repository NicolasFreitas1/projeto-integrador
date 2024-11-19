import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook useNavigate
import axios from "axios";
import "./styles.css";

interface Product {
  id: string;
  barcode: string;
  name: string;
  quantity: number;
  value: number;
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProductId, setEditingProductId] = useState<string | null>(null); 
  const navigate = useNavigate(); // Usado para navegação de página// Estado para controlar o produto sendo editado

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("Tem certeza que deseja excluir este produto?")) {
      try {
        await axios.delete(`http://localhost:5000/product/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(products.filter((product) => product.id !== id));
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
      }
    }
  };

  const handleSave = async (product: Product) => {
    try {
      await axios.put(`http://localhost:5000/product/${product.id}`, product, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setEditingProductId(null); // Fecha o modo de edição
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
  };

  const handleIncreaseQuantity = (product: Product) => {
    const updatedProduct = { ...product, quantity: product.quantity + 1 };
    setProducts(
      products.map((p) => (p.id === product.id ? updatedProduct : p))
    );
  };

  const handleDecreaseQuantity = (product: Product) => {
    if (product.quantity > 0) {
      const updatedProduct = { ...product, quantity: product.quantity - 1 };
      setProducts(
        products.map((p) => (p.id === product.id ? updatedProduct : p))
      );
    }
  };

  const handleAddProduct = () => {
    const newProduct: Product = {
      id: new Date().toISOString(), // Temporariamente até receber um ID do backend
      barcode: "novo-produto", // Isso seria gerado pelo usuário ou pela lógica de código de barras
      name: "Novo Produto",
      quantity: 1,
      value: 0,
    };

    setProducts([...products, newProduct]);
    setEditingProductId(newProduct.id); // Coloca o novo produto imediatamente em modo de edição
  };

  return (
    <div className="dashboard-container">
      <h2>Gerenciamento de Estoque</h2>

      <button
        className="add-product-button"
        onClick={() => navigate("/add-product")}
      >
        Adicionar Produto
      </button>

      <div className="dashboard-summary">
        <div className="summary-item">
          <h3>Total de Produtos</h3>
          <p>{products.length}</p>
        </div>
        <div className="summary-item">
          <h3>Produtos em Falta</h3>
          <p>{products.filter((product) => product.quantity === 0).length}</p>
        </div>
        <div className="summary-item">
          <h3>Última Atualização</h3>
          <p>{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      <div className="product-list">
        <h3>Lista de Produtos</h3>
        {loading ? (
          <p>Carregando produtos...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={product.quantity === 0 ? "out-of-stock" : ""}
                >
                  <td>{product.barcode}</td>
                  <td>
                    {editingProductId === product.id ? (
                      <input
                        type="text"
                        value={product.name}
                        onChange={(e) =>
                          setProducts(
                            products.map((p) =>
                              p.id === product.id
                                ? { ...p, name: e.target.value }
                                : p
                            )
                          )
                        }
                      />
                    ) : (
                      product.name
                    )}
                  </td>
                  <td>
                    <button onClick={() => handleDecreaseQuantity(product)}>
                      -
                    </button>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        value={product.quantity}
                        onChange={(e) =>
                          setProducts(
                            products.map((p) =>
                              p.id === product.id
                                ? { ...p, quantity: Number(e.target.value) }
                                : p
                            )
                          )
                        }
                      />
                    ) : (
                      product.quantity
                    )}
                    <button onClick={() => handleIncreaseQuantity(product)}>
                      +
                    </button>
                  </td>
                  <td>
                    {editingProductId === product.id ? (
                      <input
                        type="number"
                        value={product.value}
                        onChange={(e) =>
                          setProducts(
                            products.map((p) =>
                              p.id === product.id
                                ? { ...p, value: Number(e.target.value) }
                                : p
                            )
                          )
                        }
                      />
                    ) : (
                      product.value
                    )}
                  </td>
                  <td>
                    {editingProductId === product.id ? (
                      <button onClick={() => handleSave(product)}>Salvar</button>
                    ) : (
                      <button onClick={() => setEditingProductId(product.id)}>
                        Editar
                      </button>
                    )}
                    <button onClick={() => handleDelete(product.id)}>
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
