import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Grid, Button,
} from '@material-ui/core';
import { MdNavigateBefore, MdSave } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Form } from '@rocketseat/unform';
import {
  TitleTable,
  ContainerTable,
  TableContain,
  InputDefault,
  Id,
} from './style';
import { updateBannerRequest } from '~/store/modules/banner/actions';
import apiBack from '../../../../services/apiBack';
import ImageInput from '../../../../components/ImageInput';

export default function UpdateBanner() {
  const dispatch = useDispatch();
  const [banner, setBanner] = useState({});
  const { id } = useParams();

  useEffect(() => {
    async function getBanner() {
      const response = await apiBack.get(`/banner/${id}`);
      setBanner(response.data);
    }
    getBanner();
  }, []);

  function handleUpdateBanner(data) {
    dispatch(updateBannerRequest(data));
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
            Editar banner
          </TitleTable>
          <Grid container direction="row" justify="center" alignItems="center">
            <Form
              initialData={banner}
              key={banner.id}
              onSubmit={handleUpdateBanner}
            >
              <Id name="id" />
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <ImageInput file={banner.file} name="file_id" />
                </Grid>
                <Grid item xs={4}>
                  <InputDefault defaultValue={banner.name} name="name" placeholder="Nome do banner" />
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
          </Grid>
        </TableContain>
      </Container>
    </ContainerTable>
  );
}
