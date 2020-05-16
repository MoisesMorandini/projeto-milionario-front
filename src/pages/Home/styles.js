import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  z-index: 0;
  margin-top: 2%;
  margin-bottom: 100px;
  .container-carousel {
    position: relative;
    margin: 0 5%;
    height: 400px;
    width: 90%;
    padding: 0;
  }
  .carousel .thumb img {
    position: relative;
    padding: 0;
  }

  .carousel .slide img {
    background-color: none;
    height: 400px;
    width: 100%;
    margin: 0;
  }

  @media (max-width: 900px) {
    .container-carousel {
      height: 300px;
    }
    .carousel .slide img {
      height: 300px;
    }
  }
  @media (max-width: 500px) {
    .container-carousel {
      height: 200px;
    }
    .carousel .slide img {
      height: 200px;
    }
  }
  .indicator {
    background-color: #eaeaea;
    padding: 0px;
    margin: 0px;
  }

  .color {
    background-color: #eaeaea;
  }
`;
