/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from 'react';
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
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
import apiBack from '../../services/apiBack';


export default function Order() {
  const classes = useStyles();

  const [orders, setOrders] = useState([]);
  const [limitView, setLimiteView] = useState(3);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [ordersCount, setOrdersCount] = useState(0);

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    if (ordersCount) {
      setTotalPages(Math.trunc(ordersCount / limitView) + 1);
    }
  }, [ordersCount, limitView]);

  async function getOrders() {
    const response = await apiBack.get(
      `user/orders?page=${page}&limit=${limitView}`,
    );
    setOrders(response.data);
    console.log(response.data);

    setOrdersCount(response.headers.x_total_count);
  }

  function formatDate(orderDate) {
    const date = new Date(orderDate);
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const year = date.getFullYear();
    return `${day}/${year}`;
  }

  function sumTotal(orders) {
    let sum = 0;
    orders.checkoutList.forEach((checkoutList) => {
      sum += checkoutList.total;
    });
    return sum;
  }

  useEffect(() => {
    getOrders();
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

          {orders.map((order) => (
            <ExpansionPanel className={classes.marginTop}>
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  <b>Pedido: n° {order.transaction.id}</b>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  venda efetuada em <span>
                    {
                      formatDate(order.transaction.createdAt)
                    }
                                    </span>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <Table aria-label="simple table">
                    {order.checkoutList.map((checkoutList) => (
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <img
                              src={checkoutList.product.file_products[0].file.url}
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
                    <b>Total do pedido: R$ {sumTotal(order)},00</b>
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
