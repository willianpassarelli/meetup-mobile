import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  background: #fff;
  border-radius: 4px;
  margin-bottom: 20px;
`;

export const Banner = styled.Image.attrs({
  overflow: 'hidden',
})`
  height: 150px;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const Text = styled.Text`
  color: #999999;
  font-size: 13px;
  margin-left: 5px;
`;

export const Content = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 5px 0 0 5px;
`;

export const CancelButton = styled(Button)`
  height: 40px;
  background: #d44059;
  margin-top: 10px;
`;
