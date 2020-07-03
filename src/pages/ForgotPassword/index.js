import React, { useEffect, useState } from 'react';
import { Form, Input } from '@rocketseat/unform';
import { AiOutlineMail } from 'react-icons/ai';
import { toast } from 'react-toastify';
import apiBack from '../../services/apiBack';

export default function SignIn() {
  const [email, setEmail] = useState();
  const [logo, setLogo] = useState({});

  async function sendEmail() {
    await apiBack
      .post('/forgot_password', { email })
      .then(() => {
        toast.success('E-mail de recuperação enviado!');
      })
      .catch(() => {
        toast.error('E-mail não encontrado!');
      });
  }

  useEffect(() => {
    async function getLogo() {
      const response = await apiBack.get('/logo/main');
      setLogo(response.data.file);
    }
    getLogo();
  }, []);

  return (
    <>
      <div className="resetPasswordContainer">
        <img src={logo.url} alt="Projeto Milionário" />
        <Form>
          <div className="inputDiv">
            <AiOutlineMail />
            <Input
              name="email"
              type="email"
              placeholder="E-mail"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="button"
            disabled={!email}
            onClick={() => {
              sendEmail();
            }}
          >
            Recuperar senha
          </button>
        </Form>
      </div>
    </>
  );
}
