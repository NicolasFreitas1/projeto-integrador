import React, { useState } from 'react';
import './styles.css';

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Produto A', quantity: 50, category: 'Eletrônicos' },
    { id: 2, name: 'Produto B', quantity: 20, category: 'Roupas' },
    { id: 3, name: 'Produto C', quantity: 70, category: 'Alimentos' }
  ]);

  const handleEdit = (id: number) => {
    console.log(`Editando produto com ID: ${id}`);
    // Lógica para edição do produto
  };

  const handleDelete = (id: number) => {
    console.log(`Excluindo produto com ID: ${id}`);
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <div className="products-container">
      <h2>Gerenciar Produtos</h2>

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
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.category}</td>
                <td>
                  <button onClick={() => handleEdit(product.id)}>Editar</button>
                  <button onClick={() => handleDelete(product.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="add-product">Adicionar Produto</button>
    </div>
  );
};

export default Products;
