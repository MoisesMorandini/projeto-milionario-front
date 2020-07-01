
import React, { useState, useRef, useEffect } from 'react';
import { useField, Form } from '@rocketseat/unform';
import {
  Container, Paper, Button, TextField, Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  MdNavigateBefore, MdSave, MdExpandMore, MdDelete,
} from 'react-icons/md';
import { AiOutlinePlus } from 'react-icons/ai';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
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

function UpdateProduct() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const { defaultValue, registerField } = useField('');
  const [file, setFile] = useState(defaultValue && defaultValue.id);
  const [product, setProduct] = useState();
  const ref = useRef();
  const [content, setContent] = useState([]);
  const [specifcationPlus, setSpecifcationPlus] = useState(0);
  const [contentSpecification, setContentSpecification] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [defaultCategorie, setDefaultCategorie] = useState('Combo box');
  const [open, setOpen] = React.useState(false);
  const [nameDeleteProduct, setNameDeleteProduct] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const [idFileDelete, setIdFileDelete] = useState();
  async function getCategory() {
    const response = await apiBack.get(
      'categories',
    );
    setCategories(response.data);
  }
  function handleFile(fileProducts) {
    if (fileProducts) {
      const fileExists = [];
      fileProducts.map((files) => {
        fileExists.push({
          id: files.file.id,
          url: files.file.url,
          name: files.file.name,
          ref: ref.current,
          path: 'dataset.file',
        });
      });
      setContent(fileExists);
    }
  }
  function handleTechnicalSpecifications(technicalSpecifications) {
    if (technicalSpecifications) {
      let getPlus = specifcationPlus;
      const newContentSpecification = [];
      technicalSpecifications.map((technicalSpecification) => {
        getPlus++;
        const specification = (
          <div className="container-specifcation">
            <InputDefault value={technicalSpecification.name} className="specification" name={`name_specification_${getPlus}`} placeholder="Nome especificação" />
            <InputDefault value={technicalSpecification.description} className="specification" name={`description_specification_${getPlus}`} placeholder="Descrição especificação" />
            <button
              type="button"
              onClick={() => handleClickOpen(technicalSpecification.name)}
            >
              <MdDelete size={16} />
            </button>
          </div>
        );
        newContentSpecification.push(specification);
      });
      setContentSpecification([...newContentSpecification]);
      setSpecifcationPlus(getPlus + 1);
    }
  }

  async function getProduct() {
    try {
      const response = await apiBack.get(`/product/${id}`);
      handleFile(response.data.file_products);
      handleTechnicalSpecifications(response.data.technical_specifications);
      setCategoryId(response.data.category.id);
      setLoading(false);
    } catch (error) {
      toast.warn('Falha ao carregar o produto');
    }
  }
  useEffect(() => {
    setLoading(true);
    getCategory();
    getProduct();
  }, []);

  useEffect(() => {
    if (categories.length && categoryId > 0) {
      const cat = categories.find((categoriy) => categoriy.id === categoryId);
      setDefaultCategorie(cat.name);
    }
  }, [categories, categoryId]);

  useEffect(() => {
    if (specifcationPlus) {
      const nameSpecification = `name_specification_${specifcationPlus}`;
      const descriptionSpecification = `description_specification_${specifcationPlus}`;
      const specification = (
        <div className="container-specifcation">
          <InputDefault className="specification" name={nameSpecification} placeholder="Nome especificação" />
          <InputDefault className="specification" name={descriptionSpecification} placeholder="Descrição especificação" />
        </div>
      );
      setContentSpecification([...contentSpecification, specification]);
    }
  }, [specifcationPlus]);
  const handleClickOpen = (name) => {
    setOpen(true);
    setNameDeleteProduct(name);
  };
  const handleFileClickOpen = (id) => {
    setOpenDelete(true);
    setIdFileDelete(id);
  };

  const handleCloseFile = () => {
    setOpenDelete(false);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function cleanStates() {
    setContent([]);
    setSpecifcationPlus(0);
    const specification = (
      <div className="container-specifcation">
        <InputDefault className="specification" name="name_specification_1" placeholder="Nome especificação" />
        <InputDefault className="specification" name="description_specification_1" placeholder="Descrição especificação" />

      </div>
    );
    setContentSpecification([specification]);
  }
  async function handleDeleteSpecification() {
    setOpen(false);
    try {
      await apiBack.delete(
        `product/specification/${id}/${nameDeleteProduct}`,
      );
      toast.success('Especificação excluído com sucesso!');
      cleanStates();
      getProduct();
    } catch (error) {
      toast.error('Erro ao excluir Especificação!');
    }
  }
  async function handleDeleteFile() {
    setOpenDelete(false);
    try {
      await apiBack.delete(
        `files/${idFileDelete}`,
      );
      toast.success('Imagem excluída com sucesso!');
      cleanStates();
      getProduct();
    } catch (error) {
      toast.error('Erro ao excluir Imagem!');
    }
  }
  async function handleSubmit(data) {
    setLoading(true);
    const technical_specifications = [];
    const keyData = Object.entries(data);
    for (let i = 4; i < keyData.length; i += 2) {
      if (keyData[i][1].length && keyData[i + 1][1]) {
        technical_specifications.push({
          name: keyData[i][1],
          description: keyData[i + 1][1],
        });
      }
    }
    const files_id = content.map((file) => file.id);
    try {
      await apiBack.put(
        `product/${id}`, {
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
    } catch (error) {
      toast.error('Falha no cadastro. Verifique os dados!');
    } finally {
      setContent([]);
      getProduct();
    }

    setLoading(false);
  }

  async function handleChange(e) {
    const data = new FormData();
    data.append('file', e.target.files[0]);
    const response = await apiBack.post('files', data);
    console.log('responsefile', response);
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
            Alterar produto
          </TitleTable>
          {product ? (
            <Form id="form" initialData={product} onSubmit={handleSubmit}>
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
                            <button
                              type="button"
                              onClick={() => handleFileClickOpen(cont.id)}
                            >
                              <MdDelete size={16} />
                            </button>
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
                      onChange={(event, value) => {
                        if (value != null) setCategoryId(value.id); else setCategoryId(0);
                      }}
                      getOptionLabel={(option) => `${option.name}`}
                      options={categories}
                      style={{ width: 300 }}
                      renderInput={(params) => <TextField {...params} label={defaultCategorie} margin="normal" name="category_id" />}
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
          ) : <div />}

        </TableContain>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja realmente deletar a especificação?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteSpecification()}
            color="secondary"
            autoFocus
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openDelete}
        onClose={handleCloseFile}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja realmente deletar esta imagem?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseFile} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteFile()}
            color="secondary"
            autoFocus
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </ContainerTable>
  );
}

export default connect()(UpdateProduct);
