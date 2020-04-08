import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useField } from '@rocketseat/unform';
import { Avatar } from './styles';
import apiBack from '../../../services/apiBack';

function AvatarInput({ teste }) {
  const { defaultValue, registerField } = useField('');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'file_id',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
  }, [ref, registerField]);

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await apiBack.post('files', data);

    const { id, url } = response.data;

    setFile(id);
    setPreview(url);
  }

  return (
    <Avatar>
      <label htmlFor="avatar">
        <img
          src={
            preview ||
            'http://localhost:4000/files/9eba89ce136646c3677f677943a95431.jpg'
          }
          alt=""
        />
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Avatar>
  );
}

export default connect()(AvatarInput);
