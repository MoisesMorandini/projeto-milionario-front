import styled from 'styled-components';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';

export const styles = {
  button: {
    margin: 50,
  },
};

export const TitleTable = styled.div`
  margin-top: 30px;
  color: #2e2e2e;
  margin-left: 30px;
  display: block;
  font-size: 2em;
  font-weight: bold;
`;

export const ContainerTable = styled.div`
  margin-top: 100px;
  .tableContainer{
    margin-left: 2em;
  }
`;

export const CustomPagination = styled(Pagination)`
  margin-top: 2%
  margin-left: 35%;
  margin-bottom: 1%;
  @media (max-width: 400px) {
    margin-left: 25%;
  }
`;

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  marginTop: {
    marginTop: '30px',
  },
}));
