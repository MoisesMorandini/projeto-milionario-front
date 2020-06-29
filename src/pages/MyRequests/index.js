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

export default function MyRequests() {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [limitView, setLimiteView] = useState(50);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [requestsCount, setRequestsCount] = useState(0);
  const classes = useStyles();

  const handlePaginationChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    if (requestsCount) {
      setTotalPages(Math.trunc(requestsCount / limitView) + 1);
    }
  }, [requestsCount, limitView]);

  async function getDepartment() {
    const response = await apiBack.get(
      `department?page=${page}&limit=${limitView}`,
    );
    setRequests(response.data);
    setRequestsCount(response.headers.x_total_count);
  }

  useEffect(() => {
    getDepartment();
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
            <TitleTable>Meus pedidos</TitleTable>
          </Grid>
          <ExpansionPanel className={classes.marginTop}>
            <ExpansionPanelSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>
                <b>Pedido: n° 000045</b>
              </Typography>
              <Typography className={classes.secondaryHeading}>
                comprado dia <span> 26/jun</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                <Table aria-label="simple table">
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <img
                          src="https://a-static.mlcdn.com.br/618x463/smartphone-samsung-galaxy-s10-azul-g973f-1dl-61-128gb-tripla-12mp-16mp-12mp/onofre-agora/789810/c32b7ed3e7aa27147188409605ecd16b.jpg"
                          alt=""
                          height="100px;"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to="/">
                          Smartphone Motorola Moto E5 Play 16GB Dual Chip
                          Android - 8.1.0 - versão Go Tela 5.4" Qualcomm
                          Snapdragon 425 4G Câmera 8MP - Preto
                        </Link>
                        <div>
                          <b>1 unidade - R$ 1500,00</b>
                        </div>
                      </TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell component="th" scope="row">
                        <img
                          src="https://a-static.mlcdn.com.br/618x463/smartphone-samsung-galaxy-s10-azul-g973f-1dl-61-128gb-tripla-12mp-16mp-12mp/onofre-agora/789810/c32b7ed3e7aa27147188409605ecd16b.jpg"
                          alt=""
                          height="100px;"
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Link to="/">
                          Smartphone Motorola Moto E5 Play 16GB Dual Chip
                          Android - 8.1.0 - versão Go Tela 5.4" Qualcomm
                          Snapdragon 425 4G Câmera 8MP - Preto
                        </Link>
                        <div>
                          <b>1 unidade - R$ 1500,00</b>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <Box color="success.main" align="right">
                  <b>Total do pedido: R$3000,00</b>
                </Box>
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>
                <b>Pedido: n° 000063</b>
              </Typography>
              <Typography className={classes.secondaryHeading}>
                comprado dia <span> 23/jun</span>
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Suspendisse malesuada lacus ex, sit amet blandit leo lobortis
                eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>
                <b>Pedido: n° 000063</b>
              </Typography>
              <Typography className={classes.secondaryHeading}>
                comprado dia <span> 11/mai</span>
              </Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>

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
