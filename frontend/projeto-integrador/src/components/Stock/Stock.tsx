import React, { useState } from 'react';
import './styles.css';

const Stock = () => {
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Produto A', quantity: 100, status: 'Em estoque' },
    { id: 2, name: 'Produto B', quantity: 0, status: 'Fora de estoque' },
    { id: 3, name: 'Produto C', quantity: 30, status: 'Em estoque' }
  ]);

  const handleRestock = (id: number) => {
    console.log(`Reabastecendo item com ID: ${id}`);
    // Lógica de reabastecimento
  };

  const handleDelete = (id: number) => {
    console.log(`Excluindo item de estoque com ID: ${id}`);
    setStockItems(stockItems.filter(item => item.id !== id));
  };

  return (
    <div className="stock-container">
      <h2>Gerenciar Estoque</h2>

      <div className="stock-list">
        <h3>Lista de Estoque</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome do Produto</th>
              <th>Quantidade</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {stockItems.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.status}</td>
                <td>
                  <button onClick={() => handleRestock(item.id)}>Reabastecer</button>
                  <button onClick={() => handleDelete(item.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add-stock-item">Adicionar Item ao Estoque</button>
    </div>
  );
};

export default Stock;
