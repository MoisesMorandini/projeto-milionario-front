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
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import apiBack from '../../../services/apiBack';
import { TitleTable, ContainerTable, CustomPagination } from './style';
import { deleteCategoryRequest } from '~/store/modules/category/actions';

export default function Category() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [limitView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [idDeleteCategory, setidDeleteCategory] = useState(0);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (categoriesCount) {
      setTotalPages(Math.trunc(categoriesCount / limitView) + 1);
    }
  }, [categoriesCount, limitView]);

  async function getCategories() {
    const response = await apiBack.get(
      `categories?page=${page}&limit=${limitView}`,
    );

    setCategories(response.data);
    setCategoriesCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getCategories();
  }, [limitView, page]);

  async function handleDeleteCategory() {
    setOpen(false);
    dispatch(deleteCategoryRequest(idDeleteCategory));
    setTimeout(() => {
      getCategories();
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

  const handleClickOpen = (idCategoryClick) => {
    setOpen(true);
    setidDeleteCategory(idCategoryClick);
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
            <TitleTable>Categorias</TitleTable>
            <Link to="/admin/categories/store">
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
                <TableCell>Nome</TableCell>
                <TableCell>Departamento</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {categories.map((category) => (
                <TableRow key={category.name}>
                  <TableCell component="th" scope="row">
                    {category.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {category.department.name}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/categories/update/${category.id}`}>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                      >
                        <MdEdit size={16} />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleClickOpen(category.id)}
                      className={classes.marginLeft}
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      <MdDelete size={16} />
                    </Button>
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
          <b>Deseja realmente deletar a categoria?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button onClick={() => handleDeleteCategory()} color="secondary" autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </ContainerTable>
  );
}
