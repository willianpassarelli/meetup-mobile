import React, { useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Banner,
  Info,
  Title,
  Text,
  Content,
  CancelButton,
} from './styles';

export default function Card({ data, onSubmit, textButton }) {
  const { meetup } = data;

  const dateFormatted = useMemo(
    () =>
      format(parseISO(meetup.date), "dd 'de' MMMM', às' HH'h'", {
        locale: pt,
      }),
    [meetup.date]
  );

  return (
    <Container>
      <Banner
        source={{
          uri: `http://192.168.31.124:3333/files/${meetup.banner.path}`,
        }}
      />

      <Info>
        <Title>{meetup.title}</Title>
        <Content>
          <Icon name="event" size={16} color="#999999" />
          <Text>{dateFormatted}</Text>
        </Content>
        <Content>
          <Icon name="place" size={16} color="#999999" />
          <Text>{meetup.location}</Text>
        </Content>
        <Content>
          <Icon name="person" size={16} color="#999999" />
          <Text>Organizador: {meetup.user.name}</Text>
        </Content>
        <CancelButton onPress={onSubmit} past={meetup.past}>
          {textButton}
        </CancelButton>
      </Info>
    </Container>
  );
}
