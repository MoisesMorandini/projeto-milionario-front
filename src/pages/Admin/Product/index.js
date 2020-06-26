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
import { Carousel } from 'react-responsive-carousel';
import apiBack from '../../../services/apiBack';
import { TitleTable, ContainerTable, CustomPagination } from './style';
import { deleteDepartmentRequest } from '~/store/modules/department/actions';


export default function Department() {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [limitView, setLimiteView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [productsCount, setProductsCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [idDeleteDepartment, setIdDeleteDepartment] = useState(0);
  const [techSpecifications, setTechSpecifications] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);

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
    // for (let i = 0; i < response.data.length; i++) {
    //   setImageUrl(response.data[i].file_products);
    // }
    setImageUrl(response.data[0].file_products[2]);
    setTechSpecifications(response.data[0].technical_specifications);
    setProductsCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getProducts();
  }, [limitView, page]);

  async function handleDeleteDepartment() {
    setOpen(false);
    dispatch(deleteDepartmentRequest(idDeleteDepartment));
    setTimeout(() => {
      getProducts();
    }, 600);
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

  const handleClickOpen = (idDepartmentClicked) => {
    setOpen(true);
    setIdDeleteDepartment(idDepartmentClicked);
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
                    <img src={product.file_products[0].file.url} alt={product.name} height="100px;" />
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
                    <Link to={`/admin/banner/update/${product.id}`}>
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
          <b>Imagens do produto</b>
        </DialogTitle>
        <DialogActions>

          <div>
            <Carousel
              showThumbs={false}
              showStatus={false}
              showArrows
              useKeyboardArrows
              interval={false}
              stopOnHover
              infiniteLoop
              width="100%"
              showIndicators
            >
              {products.map((images) => (
                <div className="color">
                  <img src={images.file_products[0].file.url} alt={images} />
                </div>
              ))}
            </Carousel>
          </div>
          <Button onClick={handleClose} color="default">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </ContainerTable>
  );
}
