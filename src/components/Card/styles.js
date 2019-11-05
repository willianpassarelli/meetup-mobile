import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.View`
  flex: 1;
  height: 345px;
  background: #fff;
  border-radius: 4px;
`;

export const Banner = styled.Image.attrs({
  overflow: 'hidden',
})`
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  height: 150px;
`;

export const Info = styled.View`
  padding: 20px;
`;

export const Title = styled.Text`
  color: #333333;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Date = styled.Text`
  color: #999999;
  font-size: 13px;
`;

export const Location = styled.Text`
  color: #999999;
  font-size: 13px;
`;

export const Organizer = styled.Text`
  color: #999999;
  font-size: 13px;
`;

export const CancelButton = styled(Button)`
  height: 40px;
  background: #d44059;
  margin: 0 20px;
`;
