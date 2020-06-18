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
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete, MdAdd } from 'react-icons/md';
import { toast } from 'react-toastify';
import apiBack from '../../../services/apiBack';
import { TitleTable, ContainerTable, CustomPagination } from './style';

export default function UserAddress() {
  const [userAddress, setUserAddress] = useState([]);
  const [limitView, setLimiteView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [userAddressCount, setUserAddresssCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [idDeleteUserAddress, setIdDeleteUserAddress] = useState(0);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (userAddressCount) {
      setTotalPages(Math.trunc(userAddressCount / limitView) + 1);
    }
  }, [userAddressCount, limitView]);

  async function getUserAddress() {
    const response = await apiBack.get(
      `users/address?page=${page}&limit=${limitView}`,
    );

    setUserAddress(response.data);
    setUserAddresssCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getUserAddress();
  }, [limitView, page]);

  async function handleDeleteUserAddress() {
    setOpenModal(false);
    try {
      await apiBack.delete(
        `users/address/${idDeleteUserAddress}`,
      );
      toast.success('Endereço excluído com sucesso!');
    } catch (error) {
      toast.error('Erro ao excluir endereço!');
    }

    setTimeout(() => {
      getUserAddress();
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

  const handleClickOpen = (idUserAddressClicked) => {
    setOpenModal(true);
    setIdDeleteUserAddress(idUserAddressClicked);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
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
            <TitleTable>Endereços</TitleTable>
            <Link to="/user/address/store">
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
                <TableCell>Rua</TableCell>
                <TableCell>Número</TableCell>
                <TableCell>Complemento</TableCell>
                <TableCell>Bairro</TableCell>
                <TableCell>CEP</TableCell>
                <TableCell>Cidade</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                userAddress.length ? (
                  <>
                    {userAddress.map((address) => (
                      <TableRow key={address.id}>
                        <TableCell component="th" scope="row">
                          {address.street}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {address.street_number}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {address.complement}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {address.neighborhood}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {address.zipcode}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {address.city}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {address.state}
                        </TableCell>
                        <TableCell>
                          <Link to={{
                            pathname: '/user/address/update',
                            state: { userAddress: address },

                          }}
                          >
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                            >
                              <MdEdit size={16} />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleClickOpen(address.id)}
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
                ) : (<div />)

              }

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
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja realmente deletar o endereço?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseModal} color="default">
            Cancelar
          </Button>
          <Button onClick={() => handleDeleteUserAddress()} color="secondary" autoFocus>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </ContainerTable>
  );
}
