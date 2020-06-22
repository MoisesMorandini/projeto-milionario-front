import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
import { TitleTable, CustomPagination } from './style';
import { deleteDepartmentRequest } from '~/store/modules/department/actions';

export default function Department() {
  const dispatch = useDispatch();
  const [departments, setDepartment] = useState([]);
  const [limitView, setLimiteView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [departmentsCount, setDepartmentsCount] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [idDeleteDepartment, setIdDeleteDepartment] = useState(0);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (departmentsCount) {
      setTotalPages(Math.trunc(departmentsCount / limitView) + 1);
    }
  }, [departmentsCount, limitView]);

  async function getDepartment() {
    const response = await apiBack.get(
      `department?page=${page}&limit=${limitView}`,
    );
    setDepartment(response.data);
    setDepartmentsCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getDepartment();
  }, [limitView, page]);

  async function handleDeleteDepartment() {
    setOpen(false);
    dispatch(deleteDepartmentRequest(idDeleteDepartment));
    setTimeout(() => {
      getDepartment();
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
    <div>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <TitleTable>Departamentos</TitleTable>
        <Link to="/admin/department/store">
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
            <TableCell>Ação</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
                departments.length ? (
                  <>
                    {departments.map((depart) => (
                      <TableRow key={depart.name}>
                        <TableCell component="th" scope="row">
                          {depart.name}
                        </TableCell>
                        <TableCell>
                          <Link to={`/admin/department/update/${depart.id}`}>
                            <Button
                              size="small"
                              variant="contained"
                              color="primary"
                            >
                              <MdEdit size={16} />
                            </Button>
                          </Link>
                          <Button
                            onClick={() => handleClickOpen(depart.id)}
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
                ) : ('')
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja realmente deletar o departamento?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancelar
          </Button>
          <Button
            onClick={() => handleDeleteDepartment()}
            color="secondary"
            autoFocus
          >
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
