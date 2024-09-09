CREATE TABLE usuario (
    id BIGSERIAL PRIMARY KEY,
    nome varchar(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(20) NOT NULL,
    tipo varchar(50),
    telefone varchar(15),
    endereco varchar(150)
);

CREATE TABLE categoria (
    id BIGSERIAL PRIMARY KEY,
    nome varchar(50) NOT NULL,
    descricao varchar(50),
);

CREATE TABLE fornecedor (
    id BIGSERIAL PRIMARY KEY,
    nome varchar(100) NOT NULL,
    telefone varchar(15),
    data_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
);

CREATE TABLE produto (
    id BIGSERIAL PRIMARY KEY,
    nome varchar(100) NOT NULL,
    quantidade numeric,
    valor numeric(15, 2),
    codigo_de_barras varchar(12) NOT NULL,
    id_categoria BIGSERIAL NOT NULL,
    id_fornecedor BIGSERIAL NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id),
    FOREIGN KEY (id_fornecedor) REFERENCES fornecedor(id)
);

CREATE TABLE notificação (
    id BIGSERIAL PRIMARY KEY,
    titulo varchar(50) NOT NULL,
    descricao varchar(100),
    destinatario BIGSERIAL NOT NULL,
    data_criada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_lida TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (destinatario) REFERENCES usuario(id)
);

CREATE TABLE venda (
    id BIGSERIAL PRIMARY KEY,
    data_venda TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    quantidade numeric,
    valor_total numeric(15, 2),
    id_produto BIGSERIAL NOT NULL,
    id_cliente BIGSERIAL NOT NULL,
    FOREIGN KEY (id_produto) REFERENCES produto(id),
    FOREIGN KEY (id_clinete) REFERENCES usuario(id)
);