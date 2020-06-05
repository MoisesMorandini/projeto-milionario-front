import React from 'react';
import {
  Container, Paper, Grid, Button,
} from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
} from './style';
import { insertBannerRequest } from '~/store/modules/banner/actions';
import ImageInput from '../../../../components/ImageInput';

export default function StoreBanner() {
  const dispatch = useDispatch();

  function handleInsertBanner(data) {
    dispatch(insertBannerRequest(data));
  }

  return (
    <ContainerTable>
      <Container>
        <TableContain className="tableContainer" component={Paper}>
          <TitleTable>
            <Link to="/admin/banner/">
              <Button color="default">
                <MdNavigateBefore size={28} />
              </Button>
            </Link>
            Adicionar banner
          </TitleTable>

          <Form onSubmit={handleInsertBanner}>
            <Grid
              container
              direction="row"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <ImageInput name="file_id" />
              </Grid>
              <Grid item xs={4}>
                <InputDefault name="name" placeholder="Nome do banner" />
              </Grid>
            </Grid>
            <Grid container item justify="center" alignItems="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<MdSave />}
              >
                Salvar
              </Button>
            </Grid>
          </Form>
        </TableContain>
      </Container>
    </ContainerTable>
  );
}
