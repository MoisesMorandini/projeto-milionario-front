import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from './styles';

import apiBack from '../../services/apiBack';
import api from '../../services/api';
import { formatPrice } from '../../util/format';

export default function Orderview() {
  const user = useSelector(state => state.user.profile);
  const [loading, setLoading] = useState(false);
  const [prods, setProds] = useState([]);
  const [total, setTotal] = useState({});

  const [checkout, setCheckout] = useState([]);
  useEffect(() => {
    async function findCheckout() {
      console.tron.log(user);
      if (!user.administrator) {
        console.tron.log('amd', user.administrator);
        console.tron.log('ue');
        var { data } = await apiBack.get(`checkoutslist/${user.id}`);
      } else {
        var { data } = await apiBack.get(`checkoutslist`);
        console.tron.log('sou adm', data);
      }
      setCheckout(data);
      const pickData = data[0];
      setTotal(pickData[0].checkout);
    }
    findCheckout();
  }, []);

  function renderItems(check) {
    console.tron.log('check', check);
    return check.map(prod => (
      <tr key={prod.product.id}>
        <td>
          <img src={prod.product.file.url} alt={prod.product.name} />
        </td>
        <td>{prod.product.name}</td>
        <td>{prod.amount}</td>
        <td>{formatPrice(prod.total)}</td>
        <td>{formatPrice(prod.total * prod.amount)}</td>
      </tr>
    ));
  }

  async function handleRefund() {
    try {
      await api.delete(`transactions/${checkout.transaction.id}`);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    !loading && (
      <Container>
        {console.tron.log('checkout', checkout)}
        {checkout.map(ck => {
          return (
            <>
              <table>
                <thead>
                  <tr>
                    <th />
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Valor do produto</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>{renderItems(ck)}</tbody>
                <tfoot>
                  <tr>
                    <th>Subtotal</th>
                    <td>
                      {formatPrice(
                        (ck[0].checkout.amount / 100 - ck[0].checkout.fee) / 100
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Frete</th>
                    <td>{formatPrice(ck[0].checkout.fee / 100)}</td>
                  </tr>
                  <tr>
                    <th>Total</th>
                    <td>{formatPrice(ck[0].checkout.amount / 10000)}</td>
                  </tr>
                </tfoot>
              </table>
              <hr />
            </>
          );
        })}
      </Container>
    )
  );
}
