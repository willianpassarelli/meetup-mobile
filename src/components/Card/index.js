import React from 'react';

import {
  Container,
  Banner,
  Info,
  Title,
  Date,
  Location,
  Organizer,
  CancelButton,
} from './styles';

export default function Card({ data, handleCancel }) {
  return (
    <Container>
      <Banner
        source={{
          uri:
            'https://cdn.logojoy.com/wp-content/uploads/2017/07/Meetup_logo.png',
        }}
      />

      <Info>
        <Title>{data.title}</Title>
        <Date>{data.date}</Date>
        <Location>{data.location}</Location>
        <Organizer>Organizador: Jédina Melo</Organizer>
      </Info>

      <CancelButton onPress={handleCancel}>Cancelar inscrição</CancelButton>
    </Container>
  );
}
