import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  updateProductRequest,
  deleteProductRequest,
  insertProductRequest,
} from '../../store/modules/product/actions';
import { Container, Id, InputDefault, InputArea, Img } from './styles';
import { Avatar } from './AvatarInput/styles';
import { Form, Select } from '@rocketseat/unform';
import apiBack from '../../services/apiBack';
import AvatarInput from './AvatarInput';
export default function Product() {
  const dispatch = useDispatch();

  const [prods, setProds] = useState([]);
  useEffect(() => {
    async function findProduct() {
      const response = await apiBack.get(`productlist`);
      setProds(response.data);
    }

    findProduct();
  }, []);

  function handleInsertProduct(data) {
    dispatch(insertProductRequest(data));
  }

  function handleSubmit(data) {
    dispatch(updateProductRequest(data));
  }
  function handleDeleteProduct(id) {
    dispatch(deleteProductRequest(id));
  }
  const categorySelect = [
    { id: 8, title: 'tacos' },
    { id: 9, title: 'camisas' },
    { id: 10, title: 'mesas' },
    { id: 11, title: 'giz' },
    { id: 14, title: 'bolas' },
    { id: 12, title: 'outros' },
  ];

  return (
    <Container>
      <Form onSubmit={handleInsertProduct}>
        <InputDefault name="name" placeholder="Nome produto" />
        <InputArea name="description" placeholder="Descricao produto" />
        <AvatarInput name="file_id" />
        <Select name="category_id" options={categorySelect} />
        <InputDefault name="stock" placeholder="Estoque produto" />
        <InputDefault name="price" placeholder="Preco produto" />
        <button type="submit">Inserir produto</button>
      </Form>
      {prods.map(prod => (
        <Form initialData={prod} key={prod.id} onSubmit={handleSubmit}>
          <Id name="id" />
          <InputDefault name="name" placeholder="Nome produto" />
          <InputArea name="description" placeholder="Descricao produto" />
          <Avatar name="avatar_id" none>
            <label>
              <img src={prod.file.url} alt="falhou" />
            </label>
          </Avatar>
          <Select
            name="categorie_id"
            value={prod.category.id}
            options={categorySelect}
          />
          <InputDefault name="stock" placeholder="Estoque produto" />
          <InputDefault name="price" placeholder="Preco produto" />
          <button type="submit">Atualizar produto</button>
          <button type="button" onClick={() => handleDeleteProduct(prod.id)}>
            Excluir
          </button>
        </Form>
      ))}
    </Container>
  );
}
