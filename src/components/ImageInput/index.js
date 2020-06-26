import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useField } from '@rocketseat/unform';
import { Image } from './styles';
import apiBack from '../../services/apiBack';
import DefaultImage from '~/assets/images/default-image.png';

function ImageInput(image) {
  const { defaultValue, registerField } = useField('');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (image.file) { setPreview(image.file.url); }
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
    <Image>
      <label htmlFor="avatar">
        <img src={preview || DefaultImage} alt="" />
        <h4>Carregar imagem</h4>
        <input
          type="file"
          id="avatar"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Image>
  );
}

export default connect()(ImageInput);
