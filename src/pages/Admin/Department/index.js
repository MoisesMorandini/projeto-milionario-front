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
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdEdit, MdDelete } from 'react-icons/md';
import apiBack from '../../../services/apiBack';
import { TitleTable, ContainerTable, CustomPagination } from './style';
import { deleteDepartmentRequest } from '~/store/modules/department/actions';

export default function Department() {
  const dispatch = useDispatch();
  const [departments, setDepartment] = useState([]);
  const [limitView, setLimiteView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [departmentsCount, setDepartmentsCount] = useState(0);

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

  async function handleDeleteDepartment(id) {
    dispatch(deleteDepartmentRequest(id));
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
            <TitleTable>Departamentos</TitleTable>
            <Link to="/admin/department/store">
              <Button
                className={classes.marginTopRight}
                variant="contained"
                color="primary"
              >
                Adicionar
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
              {departments.map((depart) => (
                <TableRow key={depart.name}>
                  <TableCell component="th" scope="row">
                    {depart.name}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteDepartment(depart.id)}
                      variant="contained"
                      color="secondary"
                    >
                      <MdDelete />
                    </Button>
                    <Link to={`/admin/department/update/${depart.id}`}>
                      <Button
                        className={classes.marginLeft}
                        variant="contained"
                        color="primary"
                      >
                        <MdEdit />
                      </Button>
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
    </ContainerTable>
  );
}
