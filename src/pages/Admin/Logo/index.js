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
import {
  deleteLogoRequest,
  updateLogoRequest,
} from '~/store/modules/logo/actions';

export default function Logo() {
  const dispatch = useDispatch();
  const [logos, setLogo] = useState([]);
  const [limitView, setLimiteView] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [logosCount, setLogosCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [idDeleteLogo, setIdDeleteLogo] = useState(0);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (logosCount) {
      setTotalPages(Math.trunc(logosCount / limitView) + 1);
    }
  }, [logosCount, limitView]);

  async function getLogo() {
    const response = await apiBack.get(`logo?page=${page}&limit=${limitView}`);
    setLogo(response.data);
    setLogosCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getLogo();
  }, [limitView, page]);

  async function handleDeleteLogo() {
    setOpen(false);
    dispatch(deleteLogoRequest(idDeleteLogo));
    setTimeout(() => {
      getLogo();
    }, 600);
  }

  async function handleUpdateLogo() {
    setOpenUpdate(false);
    dispatch(updateLogoRequest({ id: idDeleteLogo }));
    setTimeout(() => {
      getLogo();
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

  const handleDeleteClickOpen = (idLogoClicked) => {
    setOpen(true);
    setIdDeleteLogo(idLogoClicked);
  };

  const handleUpdateClickOpen = (idLogoClicked) => {
    setOpenUpdate(true);
    setIdDeleteLogo(idLogoClicked);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenUpdate(false);
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
            <TitleTable>Logotipo</TitleTable>
            <Link to="/admin/logo/store">
              <Button
                className={classes.marginTopRight}
                variant="contained"
                color="primary"
                disable={setLogosCount >= 1}
              >
                <MdAdd size={22} /> Adicionar
              </Button>
            </Link>
          </Grid>

          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Imagem</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {logos ? (
                <>{logos.map((logo) => (
                  <TableRow key={logo.name}>
                    <TableCell component="th" scope="row">
                      <img src={logo.file.url} alt={logo.name} height="100px;" />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {logo.name}
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleUpdateClickOpen(logo.id)}
                        className={classes.marginLeft}
                        size="small"
                        variant="contained"
                        color="primary"
                      >
                        <MdEdit size={16} />
                      </Button>
                      <Button
                        onClick={() => handleDeleteClickOpen(logo.id)}
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
                </>
              ) : <></>}

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
          <b>Deseja realmente deletar o logo?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteLogo()}
            color="secondary"
            autoFocus
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={openUpdate}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja tornar a logotipo como a principal?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleUpdateLogo()}
            color="primary"
            autoFocus
          >
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </ContainerTable>
  );
}
