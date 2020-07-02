/* eslint-disable no-console */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Box,
  Container,
  Paper,
  TableContainer,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { MdExpandMore } from 'react-icons/md';
import { Link } from 'react-router-dom';
import {
  TitleTable, CustomPagination, ContainerTable, useStyles,
} from './styles';
import apiBack from '../../../services/apiBack';

export default function MyRequests() {
  const dispatch = useDispatch();
  const [sales, setSales] = useState([]);
  const [limitView, setLimiteView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [salesCount, setSalesCount] = useState(0);
  const classes = useStyles();

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (salesCount) {
      setTotalPages(Math.trunc(salesCount / limitView) + 1);
    }
  }, [salesCount, limitView]);

  async function getSales() {
    const response = await apiBack.get(
      `transactions?page=${page}&limit=${limitView}`,
    );

    console.log(response.data);

    setSales(response.data);

    setSalesCount(response.headers.x_total_count);
  }

  function formatDate(saleDate) {
    const date = new Date(saleDate);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const year = date.getFullYear();
    return `${day}/${year}`;
  }

  function sumTotal(sales) {
    let sum = 0;
    sales.checkoutList.forEach((checkoutList) => {
      sum += checkoutList.total;
    });
    return sum;
  }

  useEffect(() => {
    getSales();
  }, [limitView, page]);

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
            <TitleTable>Relatório de Vendas</TitleTable>
          </Grid>

          {sales.map((sale) => (
            <ExpansionPanel className={classes.marginTop}>
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <b>Pedido: n° {sale.transaction.id}</b>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  venda efetuada em <span>
                    {
                      formatDate(sale.transaction.createdAt)
                    }
                  </span>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <Table aria-label="simple table">
                    {sale.checkoutList.map((checkoutList) => (
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <img
                              src={checkoutList.product.file.url}
                              alt="Product image"
                              height="100px;"
                            />
                          </TableCell>
                          <TableCell component="th" scope="row">
                            <Link to={`/product/${checkoutList.product.id}`}>
                              {checkoutList.product.name}
                            </Link>
                            <div>
                              <b>{checkoutList.amount} unidade(s) - R$ {checkoutList.product.price},00</b>
                            </div>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    ))}
                  </Table>
                  <Box color="success.main" align="right">
                    <b>Total do pedido: R$ {sumTotal(sale)},00</b>
                  </Box>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ))}


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