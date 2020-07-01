
import React, { useState, useRef, useEffect } from 'react';
import { useField, Form } from '@rocketseat/unform';
import {
  Container, Paper, Grid, Button, TextField,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MdNavigateBefore, MdSave, MdExpandMore,
} from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, connect } from 'react-redux';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import DefaultImage from '~/assets/images/default-image.png';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
  ButtonAdd,
  Image,
  ContainerImages,
  FormContainer,
  SaveContainer,
} from './style';
import apiBack from '../../../../services/apiBack';

function StoreProduct() {
  const [loading, setLoading] = useState(false);
  const { defaultValue, registerField } = useField('');
  const [file, setFile] = useState(defaultValue && defaultValue.id);

  const ref = useRef();
  const [content, setContent] = useState([]);
  const [specifcationPlus, setSpecifcationPlus] = useState(1);
  const [contentSpecification, setContentSpecification] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryID] = useState(0);
  const dispatch = useDispatch();

  async function getDepartment() {
    const response = await apiBack.get(
      'categories',
    );
    setCategories(response.data);
  }
  useEffect(() => {
    const nameSpecification = `name_specification_${specifcationPlus}`;
    const descriptionSpecification = `description_specification_${specifcationPlus}`;
    const specification = (
      <div className="container-specifcation">
        <InputDefault className="specification" name={nameSpecification} placeholder="Nome especificação" />
        <InputDefault className="specification" name={descriptionSpecification} placeholder="Descrição especificação" />
      </div>
    );
    setContentSpecification([...contentSpecification, specification]);
  }, [specifcationPlus]);

  async function handleSubmit(data, { reset }) {
    setLoading(true);
    const technical_specifications = [];
    const keyData = Object.entries(data);
    for (let i = 4; i < keyData.length; i += 2) {
      technical_specifications.push({
        name: keyData[i][1],
        description: keyData[i + 1][1],
      });
    }
    const files_id = content.map((file) => file.id);
    try {
      await apiBack.post(
        'products', {
          category_id: categoryId,
          name: data.name,
          description: data.description,
          stock: data.stock,
          price: data.price,
          files_id,
          technical_specifications,
        },
      );
      toast.success('Produto cadastrado com sucesso1');
      setContent([]);
      setSpecifcationPlus(1);
      const specification = (
        <div className="container-specifcation">
          <InputDefault className="specification" name="name_specification_1" placeholder="Nome especificação" />
          <InputDefault className="specification" name="description_specification_1" placeholder="Descrição especificação" />
        </div>
      );
      setContentSpecification([specification]);
      document.getElementById('form').reset();
    } catch (error) {
      toast.error('Falha no cadastro. Verifique os dados!');
    }

    setLoading(false);
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
            <Link to="/admin/products">
              <Button color="default">
                <MdNavigateBefore size={28} />
              </Button>
            </Link>
            Adicionar produto
          </TitleTable>

          <Form id="form" onSubmit={handleSubmit}>
            <ExpansionPanel>
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Imagem</Typography>
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
                <Typography>Dados Produto</Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <FormContainer>
                  <InputDefault name="name" placeholder="Nome do produto" />
                  <InputDefault name="description" placeholder="Descrição" />
                  <InputDefault name="stock" placeholder="Quantidade em estoque" />
                  <InputDefault name="price" placeholder="Preço do produto" />
                  <Autocomplete
                    onFocus={getDepartment}
                    onChange={(event, value) => {
                      if (value != null) setCategoryID(value.id); else setCategoryID(0);
                    }}
                    getOptionLabel={(option) => `${option.name}`}
                    options={categories}
                    style={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label="Categoria" margin="normal" name="category_id" />}
                  />
                  <div>
                    <ButtonAdd type="button" onClick={() => (setSpecifcationPlus(specifcationPlus + 1))} className="specification-button" variant="contained" color="primary">
                      <AiOutlinePlus size="30" /> Nova especificação
                    </ButtonAdd>
                    {contentSpecification ? (
                      <>
                        {contentSpecification.map((specification) => (
                          specification
                        ))}
                      </>
                    ) : <></>}
                  </div>
                </FormContainer>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <SaveContainer>
              {loading ? <CircularProgress size={65} /> : (
                <ButtonAdd
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<MdSave />}
                >
                  Salvar
                </ButtonAdd>
              ) }
            </SaveContainer>
          </Form>
        </TableContain>
      </Container>
    </ContainerTable>
  );
}

export default connect()(StoreProduct);
