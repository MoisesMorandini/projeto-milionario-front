import React from 'react';
import { MdPersonPin } from 'react-icons/md';
import { TextHomePrimary, TextHomeSecondary, TextAlign } from './styles';

export default function HomeAdmin() {
  return (
    <div>
      <TextAlign>
        <MdPersonPin size={120} />
      </TextAlign>
      <TextHomePrimary>
        Seja bem vindo ao Painel Administrativo.
      </TextHomePrimary>
      <TextHomeSecondary>
        Aqui você pode alterar todas as informações, gerenciar os seus produtos
        e vendas.
      </TextHomeSecondary>
    </div>
  );
}
