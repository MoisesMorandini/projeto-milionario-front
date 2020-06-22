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
import {
  MdEdit, MdDelete, MdAdd, MdExpandMore,
} from 'react-icons/md';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import { ContainerTable, TitleTable, useStyles } from './styles';

export default function Address() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
            <TitleTable>Selecione o seu endereço de entregas</TitleTable>
          </Grid>

          <div className={classes.root}>
            <ExpansionPanel
              expanded={expanded === 'panel1'}
              onChange={handleChange('panel1')}
            >
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <Typography className={classes.heading}>
                  <b>Rua da Marias das Dores, N° 20.</b>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Entregar neste endereço
                  </Button>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <p><b>Rua: </b> Rua da Marias das Dores, n° 20.</p>
                  <p><b>Bairro: </b> Vila dos Morcegos</p>
                  <p><b>Cidade: </b> Taquaritinga</p>
                  <p><b>Estado: </b> São Paulo</p>
                  <p><b>São Paulo: </b> 15900-000</p>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel2'}
              onChange={handleChange('panel2')}
            >
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel2bh-content"
                id="panel2bh-header"
              >
                <Typography className={classes.heading}>
                  <b>Users</b>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Entregar neste endereço
                  </Button>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <p><b>Rua: </b> Rua da Marias das Dores, n° 20.</p>
                  <p><b>Bairro: </b> Vila dos Morcegos</p>
                  <p><b>Cidade: </b> Taquaritinga</p>
                  <p><b>Estado: </b> São Paulo</p>
                  <p><b>São Paulo: </b> 15900-000</p>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel3'}
              onChange={handleChange('panel3')}
            >
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel3bh-content"
                id="panel3bh-header"
              >
                <Typography className={classes.heading}>
                  <b>Advanced settings</b>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Entregar neste endereço
                  </Button>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <p><b>Rua: </b> Rua da Marias das Dores, n° 20.</p>
                  <p><b>Bairro: </b> Vila dos Morcegos</p>
                  <p><b>Cidade: </b> Taquaritinga</p>
                  <p><b>Estado: </b> São Paulo</p>
                  <p><b>São Paulo: </b> 15900-000</p>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel
              expanded={expanded === 'panel4'}
              onChange={handleChange('panel4')}
            >
              <ExpansionPanelSummary
                expandIcon={<MdExpandMore />}
                aria-controls="panel4bh-content"
                id="panel4bh-header"
              >
                <Typography className={classes.heading}>
                  <b>Personal data</b>
                </Typography>
                <Typography className={classes.secondaryHeading}>
                  <Button
                    size="small"
                    variant="contained"
                    color="primary"
                  >
                    Entregar neste endereço
                  </Button>
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Typography>
                  <p><b>Rua: </b> Rua da Marias das Dores, n° 20.</p>
                  <p><b>Bairro: </b> Vila dos Morcegos</p>
                  <p><b>Cidade: </b> Taquaritinga</p>
                  <p><b>Estado: </b> São Paulo</p>
                  <p><b>São Paulo: </b> 15900-000</p>
                </Typography>
              </ExpansionPanelDetails>
            </ExpansionPanel>
          </div>
        </TableContainer>
      </Container>
    </ContainerTable>
  );
}
