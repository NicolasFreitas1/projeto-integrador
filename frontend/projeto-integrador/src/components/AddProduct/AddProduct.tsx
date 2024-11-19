import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./styles.css";

const AddProduct: React.FC = () => {
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [value, setValue] = useState(0);
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/product",
        {
          name,
          barcode,
          quantity,
          value,
          tagNames: [name], // Você pode modificar isso conforme necessário
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Adiciona o token se necessário
          },
        }
      );

      console.log("Produto adicionado:", response.data);
      navigate("/dashboard"); // Redireciona para o Dashboard após a criação
    } catch (error) {
      console.error("Erro ao adicionar produto:", error);
    }
  };

  return (
    <div className="add-product-container">
      <h2>Adicionar Produto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label>Código de Barras:</label>
          <input
            type="text"
            required
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
          />
        </div>
        <div>
          <label>Quantidade:</label>
          <input
            type="number"
            required
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            required
            value={value}
            onChange={(e) => setValue(Number(e.target.value))}
          />
        </div>
        <button type="submit">Adicionar Produto</button>
      </form>
    </div>
  );
};

export default AddProduct;
