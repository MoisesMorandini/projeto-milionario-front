import React, { useState, useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import {
  Container,
  TableContainer,
  Paper,
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
} from '@material-ui/core';
import { MdExpandMore } from 'react-icons/md';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import apiBack from '~/services/apiBack';
import { ContainerTable, TitleTable, useStyles } from './styles';

function CheckoutAddress() {
  const [loading, setLoading] = useState(false);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [userAddress, setUserAddress] = useState([]);
  const [idAddress, setIdAddress] = useState();

  const cartState = useSelector((state) => state.cart);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  useEffect(() => {
    setLoading(true);
    async function getAddress() {
      const response = await apiBack.get('users/address?limit=20');
      setUserAddress(response.data);
      setLoading(false);
    }
    getAddress();
  }, []);

  async function handleBuy() {
    let redirect = '';
    try {
      const cartIdAmount = [];
      cartState.forEach((c) => {
        cartIdAmount.push({ id: c.id, amount: c.amount });
      });
      const response = await apiBack.post('users/buy', {
        userAddress: idAddress,
        cart: cartIdAmount,
      });
      redirect = response.data;
    } finally {
      if (redirect.length) {
        window.location = redirect;
      } else {
        window.location = 'http://localhost:3000/users/checkout/cancel';
      }
    }
  }

  const handleClickOpen = (idAddressClicked) => {
    setExpanded(false);
    setOpenModal(true);
    setIdAddress(idAddressClicked);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <ContainerTable>
      {!loading ? (
        <Container>
          <TableContainer className="tableContainer" component={Paper}>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-start"
            >
              <TitleTable>Selecione o seu endereço de entregas</TitleTable>

              <Link to="/user/address/store/checkout">
                <Button
                  className="add-address"
                  size="small"
                  variant="contained"
                  color="primary"
                >
                  Adicionar novo endereço
                </Button>
              </Link>
            </Grid>
            <div className={classes.root}>

              {userAddress.length ? (
                <>{userAddress.map((address) => (

                  <ExpansionPanel
                    expanded={expanded === address.id}
                    onChange={handleChange(address.id)}
                  >
                    <ExpansionPanelSummary
                      expandIcon={<MdExpandMore />}
                      aria-controls="panel1bh-content"
                      id="panel1bh-header"
                    >
                      <Typography className={classes.heading}>
                        <b>{address.street}</b>
                      </Typography>
                      <Typography className={classes.secondaryHeading}>
                        <Button
                          size="small"
                          variant="contained"
                          color="primary"
                          onClick={() => handleClickOpen(address.id)}
                        >
                          Entregar neste endereço
                        </Button>
                      </Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <Typography>
                        <p><b>Rua: </b> {address.street}, n° {address.street_number}.</p>
                        <p><b>Bairro: </b> {address.neighborhood}</p>
                        <p><b>Cidade: </b> {address.city}</p>
                        <p><b>Estado: </b>  {address.state}</p>
                        <p><b>{address.state}: </b> {address.zipcode}</p>
                      </Typography>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>

                ))}
                </>
              ) : <div />}
            </div>
          </TableContainer>
        </Container>
      ) : <CircularProgress size={150} className="loading" />}


      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <b>Deseja realmente selecionar este endereço?</b>
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseModal} color="default">
            Cancelar
          </Button>
          <Button onClick={() => handleBuy()} color="secondary" autoFocus>
            Sim
          </Button>
        </DialogActions>
      </Dialog>
    </ContainerTable>
  );
}

export default connect()(CheckoutAddress);
