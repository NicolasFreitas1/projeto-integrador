import React from 'react';
import './styles.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Gerenciamento de Estoque</h2>

      <div className="dashboard-summary">
        <div className="summary-item">
          <h3>Total de Produtos</h3>
          <p>150</p>
        </div>
        <div className="summary-item">
          <h3>Produtos em Falta</h3>
          <p>10</p>
        </div>
        <div className="summary-item">
          <h3>Última Atualização</h3>
          <p>03/10/2024</p>
        </div>
      </div>

      <div className="product-list">
        <h3>Lista de Produtos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
              <th>Categoria</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Produto A</td>
              <td>50</td>
              <td>Eletrônicos</td>
              <td><button>Editar</button> <button>Excluir</button></td>
            </tr>
            <tr>
              <td>2</td>
              <td>Produto B</td>
              <td>20</td>
              <td>Roupas</td>
              <td><button>Editar</button> <button>Excluir</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
