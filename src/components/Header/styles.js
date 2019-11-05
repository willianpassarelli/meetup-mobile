import styled from 'styled-components/native';

import logo from '~/assets/logo.png';

export const Container = styled.View`
  height: 64px;
  background: rgba(0, 0, 0, 0.3);
  align-items: center;
  justify-content: center;
`;

export const Logo = styled.Image.attrs({
  source: logo,
  resizeMode: 'cover',
})`
  width: 23px;
  height: 24px;
`;
