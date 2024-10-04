import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

interface Product {
  id: number; // Supondo que você tenha um ID
  name: string;
  barcode: string;
  quantity: number;
  value: number;
  tagNames: string[];
}

const Dashboard = () => {
  const [products, setProducts] = useState<Product[]>([]); // Estado para armazenar produtos
  const [loading, setLoading] = useState<boolean>(true); // Estado para controle de carregamento

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/product"); // URL da API
        setProducts(response.data); // Atualiza o estado com os produtos recebidos
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
      } finally {
        setLoading(false); // Define o carregamento como falso ao final
      }
    };

    fetchProducts(); // Chama a função para buscar os produtos
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Gerenciamento de Estoque</h2>

      <div className="dashboard-summary">
        <div className="summary-item">
          <h3>Total de Produtos</h3>
          <p>{products.length}</p> {/* Total de produtos */}
        </div>
        <div className="summary-item">
          <h3>Produtos em Falta</h3>
          <p>{products.filter(product => product.quantity === 0).length}</p> {/* Produtos em falta */}
        </div>
        <div className="summary-item">
          <h3>Última Atualização</h3>
          <p>{new Date().toLocaleDateString()}</p> {/* Exibe a data atual */}
        </div>
      </div>

      <div className="product-list">
        <h3>Lista de Produtos</h3>
        {loading ? ( // Exibe um carregamento enquanto busca os produtos
          <p>Carregando produtos...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome do Produto</th>
                <th>Quantidade</th>
                <th>Valor</th>
                <th>Categoria</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.barcode}> {/* Usando o código de barras como chave única */}
                  <td>{product.barcode}</td> {/* Exibe o código de barras como ID */}
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.value}</td> {/* Adiciona o valor do produto */}
                  <td>{product.tagNames.join(", ")}</td> {/* Exibe as categorias como uma string */}
                  <td>
                    <button>Editar</button> <button>Excluir</button>
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
