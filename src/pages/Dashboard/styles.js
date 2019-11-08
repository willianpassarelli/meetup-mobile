import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Dates = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 30px 0 10px;
`;

export const DateText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  margin: 0 10px;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 25 },
})``;
