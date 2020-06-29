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
import { deleteBannerRequest } from '~/store/modules/banner/actions';

export default function Banner() {
  const dispatch = useDispatch();
  const [banners, setBanner] = useState([]);
  const [limitView, setLimiteView] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [bannersCount, setBannersCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [idDeleteBanner, setIdDeleteBanner] = useState(0);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (bannersCount) {
      setTotalPages(Math.trunc(bannersCount / limitView) + 1);
    }
  }, [bannersCount, limitView]);

  async function getBanner() {
    const response = await apiBack.get(
      `banner?page=${page}&limit=${limitView}`,
    );
    setBanner(response.data);
    setBannersCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getBanner();
  }, [limitView, page]);

  async function handleDeleteBanner() {
    setOpen(false);
    dispatch(deleteBannerRequest(idDeleteBanner));
    setTimeout(() => {
      getBanner();
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

  const handleClickOpen = (idBannerClicked) => {
    setOpen(true);
    setIdDeleteBanner(idBannerClicked);
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
            <TitleTable>Banners</TitleTable>
            <Link to="/admin/banner/store">
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
                <TableCell>Imagem</TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Ação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {banners.map((banner) => (
                <TableRow key={banner.name}>
                  <TableCell component="th" scope="row">
                    <img src={banner.file.url} alt={banner.name} height="100px;" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {banner.name}
                  </TableCell>
                  <TableCell>
                    <Link to={`/admin/banner/update/${banner.id}`}>
                      <Button size="small" variant="contained" color="primary">
                        <MdEdit size={16} />
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleClickOpen(banner.id)}
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
          <b>Deseja realmente deletar o banner?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteBanner()}
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
