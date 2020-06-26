
import React, { useState, useRef, useEffect } from 'react';
import { useField, Form } from '@rocketseat/unform';
import {
  Container, Paper, Grid, Button, TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { MdNavigateBefore, MdSave, MdExpandMore } from 'react-icons/md';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ImageInput from '../../../../components/ImageInput';
import { insertBannerRequest } from '~/store/modules/banner/actions';
import DefaultImage from '~/assets/images/default-image.png';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
  ButtonAdd,
  Image,
  ContainerImages,
} from './style';
import apiBack from '../../../../services/apiBack';


function StoreProduct(image) {
  const { defaultValue, registerField } = useField('');

  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();
  const [content, setContent] = useState([]);
  const [contentSpecification, setContentSpecification] = useState([]);
  const [categories, setCategories] = useState([]);
  const [idCategory, setId] = useState(0);
  const dispatch = useDispatch();

  async function getDepartment() {
    const response = await apiBack.get(
      'categories',
    );
    setCategories(response.data);
  }
  function handleInsertBanner(data) {
    dispatch(insertBannerRequest(data));
  }

  async function handleChange(e) {
    const data = new FormData();

    data.append('file', e.target.files[0]);

    const response = await apiBack.post('files', data);

    const { id, url, name } = response.data;

    setContent([...content, {
      id,
      url,
      name,
      ref: ref.current,
      path: 'dataset.file',
    }]);
  }
  return (
    <ContainerTable>
      <Container>
        <TableContain className="tableContainer" component={Paper}>
          <TitleTable>
            <Link to="/admin/banner/">
              <Button color="default">
                <MdNavigateBefore size={28} />
              </Button>
            </Link>
            Adicionar produto
          </TitleTable>

          <Form onSubmit={handleInsertBanner}>

            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Adicionar Imagem</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <ContainerImages>
                    <Image>
                      <label htmlFor="avatar">
                        <img src={DefaultImage} alt="" />
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
                    {content ? (
                      <> {content.map((cont) => (
                        <Image>
                          <img src={cont.url} alt="" />
                        </Image>
                      ))}
                      </>
                    ) : <></>}
                  </ContainerImages>


                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Adicionar Produto</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <InputDefault name="name" placeholder="Nome do produto" />
                  <InputDefault name="name" placeholder="Descrição" />
                  <InputDefault name="name" placeholder="Quantidade em estoque" />
                  <InputDefault name="name" placeholder="Preço do produto" />
                  <Autocomplete
                    onFocus={getDepartment}
                    onChange={(event, value) => {
                      if (value != null) setId(value.id); else setId(0);
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    options={categories}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Categoria" margin="normal" name="category_id" />}
                  />
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Adicionar Especificações Técnicas</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  {contentSpecification ? (
                    <>
                      {contentSpecification.map(() => (
                        <>
                          <InputDefault name="name" placeholder="Nome especificação" />
                          <InputDefault name="name" placeholder="Descrição especificação" />
                        </>
                      ))}
                    </>
                  ) : <></>}

                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <Grid container item justify="center" alignItems="center">
              <ButtonAdd
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<MdSave />}
              >
                Salvar
              </ButtonAdd>
            </Grid>
          </Form>
        </TableContain>
      </Container>
    </ContainerTable>
  );
}

export default connect()(StoreProduct);
