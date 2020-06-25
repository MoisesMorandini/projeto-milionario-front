import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { AiOutlineMail } from 'react-icons/ai';
import qs from 'qs';
import { toast } from 'react-toastify';
import apiBack from '../../services/apiBack';
import enterpriseImage from '~/assets/images/github.png';

export default function SignIn() {
  const [email, setEmail] = useState();

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

  return (
    <>
      <div className="resetPasswordContainer">
        <img src={enterpriseImage} alt="GitHub" />
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
