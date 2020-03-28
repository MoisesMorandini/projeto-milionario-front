import React, { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Form, Input, Scope } from '@rocketseat/unform';
import 'react-credit-cards/es/styles-compiled.css';
import Cards from 'react-credit-cards';
import pagarme from 'pagarme';
import CreditCard from './CreditCard/index';
import initialFormData from './data';
import apiBack from '../../services/apiBack';
import showError from '../../services/error';
import { Address, PaymentData, CheckoutButton, Loading, Id } from './styles';

function Payment() {
  const [data, setData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);
  const [saveCard, setSaveCard] = useState(false);
  const [isFinish, setIsFinish] = useState(false);
  const [card, setCard] = useState({
    holder_name: 'TESTE DO TESTE',
    number: '5262 3591 8646 4931',
    expiration_date: '1220',
    cvv: '574',
    id: '1',
  });
  const installments = useSelector(state => state.purchase.installments);
  const totalRaw = useSelector(state => state.purchase.total);
  const cart = useSelector(state => state.cart);
  const id = useSelector(state => state.user.profile.id);

  async function handleSubmit(formData) {
    setLoading(true);
    // RECEBE OS DADOS
    const { card: cardForm } = formData;
    // EXCLUIR A INFORMACAO PARA NAO ENVIAR AO SERVIDOR
    delete formData.card;
    console.tron.log('teste', id);
    console.tron.log(formData);
    try {
      // CRIAR HASH DOS DADOS
      const client = await pagarme.client.connect({
        encryption_key: process.env.REACT_APP_PAGARME_ENCRYPTION_KEY,
      });
      // CRIANDO A CRIPTOGRAFIA
      // EH ADICIONADO OS DADOS DO CARTAO NESTA ENCRYPT
      // NESTE CASO SO FOI PASSADO 'cardForm', POIS TODOS OS DADOS
      const card_hash = await client.security.encrypt(cardForm);

      // chamamos a API para passar os dados do cliente e os produtos
      await apiBack.post(`checkouts/${id}`, {
        ...formData,
        installments,
        items: cart,
        amount: totalRaw,
        save_card: saveCard,
        card_hash,
      });
      toast.success('Pagamento realizada com sucesso');
      setIsFinish(true);
    } catch (err) {
      toast.error('Erro ao finalizar pagamento, por favor verifique os dados!');
      showError(err);
    } finally {
      setLoading(false);
    }
  }

  function handleChangeCard(e) {
    const name = e.target.name.split('.')[1].replace(/card_/, '');
    const { value } = e.target;

    setCard({ ...card, [name]: value, id: '' });
  }

  function handleSelectCard({ id, holder_name, number, expiration_date }) {
    setData({
      ...data,
      card: {
        card_holder_name: holder_name,
        card_number: number,
        card_expiration_date: expiration_date,
        card_cvv: '',
      },
    });

    setCard({
      holder_name,
      number,
      expiration_date,
      cvv: '',
      id,
    });
  }

  return (
    <>
      <Form onSubmit={handleSubmit} initialData={data}>
        <Address>
          <div>
            <h3>Informações pessoais</h3>
            <Scope path="customer">
              <Input name="name" label="Nome" />
              <Input name="email" label="E-mail" />
              <Input name="cpf" label="CPF" />
              <Input name="rg" label="RG" />
              <Input name="phone" label="Celular" />
              <Input name="birthday" label="Data de aniversário" />
            </Scope>
          </div>
          <div>
            <h3>Endereço</h3>
            <Scope path="address">
              <Input name="zipcode" label="CEP" />
              <Input name="street" label="Logradouro" />
              <Input name="street_number" label="Número" />
              <Input name="neighborhood" label="Bairro" />
              <Input name="city" label="Cidade" />
              <Input name="state" label="Estado" />
            </Scope>
          </div>
        </Address>

        <PaymentData>
          <h3 className="title">Dados bancários</h3>

          <div className="cards">
            <CreditCard onChange={handleSelectCard} />
          </div>
          <div className="form-area">
            <Scope path="card">
              <Input
                name="card_holder_name"
                label="Nome no cartão"
                onChange={handleChangeCard}
              />
              <Input
                name="card_number"
                label="Número do cartão"
                onChange={handleChangeCard}
              />
              <div className="group">
                <div>
                  <Input
                    name="card_expiration_date"
                    label="Data de expiração"
                    onChange={handleChangeCard}
                  />
                </div>
                <div>
                  <Input
                    name="card_cvv"
                    label="Código de segurança"
                    onChange={handleChangeCard}
                  />
                </div>
              </div>
            </Scope>
          </div>

          <div className="credit-card">
            <Cards
              number={card.number}
              name={card.holder_name}
              expiry={card.expiration_date}
              cvc={card.cvv}
              focused="number"
            />
          </div>
          <CheckoutButton>
            {isFinish ? (
              <button className="checkout-button">
                Pagamento realizada com sucesso
              </button>
            ) : (
              <button type="submit" className="checkout-button">
                {loading ? <Loading /> : 'Finalizar pagamento'}
              </button>
            )}
          </CheckoutButton>
        </PaymentData>
      </Form>
    </>
  );
}
export default connect()(Payment);
