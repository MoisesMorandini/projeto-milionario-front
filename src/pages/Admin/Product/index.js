import React, { useState, useEffect } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  makeStyles,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  MdEdit, MdDelete, MdAdd, MdRemoveRedEye,
} from 'react-icons/md';

import { toast } from 'react-toastify';
import apiBack from '../../../services/apiBack';
import { TitleTable, ContainerTable, CustomPagination } from './style';


export default function Product() {
  const [products, setProducts] = useState([]);
  const [limitView, setLimiteView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [idDeleteProduct, setIdDeleteProduct] = useState(0);


  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (productsCount) {
      setTotalPages(Math.trunc(productsCount / limitView) + 1);
    }
  }, [productsCount, limitView]);

  async function getProducts() {
    const response = await apiBack.get(
      `products?page=${page}&limit=${limitView}`,
    );
    setProducts(response.data);
    setProductsCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getProducts();
  }, [limitView, page]);

  async function handleDeleteProduct() {
    setOpen(false);
    try {
      await apiBack.delete(
        `product/${idDeleteProduct}`,
      );
      toast.success('Produto excluído com sucesso!');
      getProducts();
    } catch (error) {
      toast.error('Erro ao excluir Produto!');
    }
  }
  const useStyles = makeStyles(() => ({
    marginLeft: {
      marginLeft: 10,
    },
    marginTopRight: {
      marginTop: 30,
      marginRight: 30,
    },
  }));

  const classes = useStyles();

  const handleClickOpen = (idProduct) => {
    setOpen(true);
    setIdDeleteProduct(idProduct);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ContainerTable>
      <Container>
        <TableContainer className="tableContainer" component={Paper}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <TitleTable>Produtos</TitleTable>
            <Link to="/admin/products/store">
              <Button
                className={classes.marginTopRight}
                variant="contained"
                color="primary"
              >
                <MdAdd size={22} /> Adicionar
              </Button>
            </Link>
          </Grid>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Nome</TableCell>
                <TableCell>Categoria</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Estoque</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.name}>
                  <TableCell component="th" scope="row">
                    {product.file_products.length ? <img src={product.file_products[0].file.url} alt={product.name} height="100px;" /> : <></>}

                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.category.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    R$ {product.price},00
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {product.stock}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/products/update/${product.id}`}>
                      <Button size="small" variant="contained" color="primary">
                        <MdEdit size={16} />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleClickOpen(product.id)}
                      className={classes.marginLeft}
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      <MdDelete size={16} />
                    </Button>
                    <Link
                      to={`/product/${product.id}`}
                      className={classes.marginLeft}
                      onClick={() => handleClickOpen(product.id)}
                      size="small"
                      variant="contained"
                    >
                      <MdRemoveRedEye size={16} />
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <CustomPagination
            count={totalPages}
            color="primary"
            page={page}
            size="large"
            onChange={handlePaginationChange}
            className="pagination"
          />
        </TableContainer>
      </Container>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja realmente deletar o produto?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteProduct()}
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
