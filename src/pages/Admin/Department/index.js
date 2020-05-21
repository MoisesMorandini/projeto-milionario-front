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
import apiBack from '../../../services/apiBack';
import { styles, TitleTable, ContainerTable } from './style';

export default function Department() {
  const [departments, setDepartment] = useState([]);

  useEffect(() => {
    async function getDepartment() {
      const response = await apiBack.get('department');
      setDepartment(response.data);
    }

    getDepartment();
  }, []);

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
      <Container fluid>
        <TableContainer className="tableContainer" component={Paper}>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <TitleTable>Departamentos</TitleTable>

            <Button
              className={classes.marginTopRight}
              variant="contained"
              color="primary"
            >
              Adicionar
            </Button>
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
                    <Button size="small" variant="contained" color="secondary">
                      Deletar
                    </Button>
                    <Button
                      className={classes.marginLeft}
                      size="small"
                      variant="contained"
                      color="primary"
                    >
                      Editar
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </ContainerTable>
  );
}
