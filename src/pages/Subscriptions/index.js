import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Card from '~/components/Card';

import api from '~/services/api';
import { Container, List } from './styles';

function Subscriptions({ isFocused }) {
  const [subscriptions, setSubscriptions] = useState([]);

  async function loadSubscriptions() {
    try {
      const response = await api.get('subscriptions');
      setSubscriptions(response.data);
    } catch (err) {
      console.tron.log('@err', err.message);
    }
  }

  useEffect(() => {
    loadSubscriptions();
  }, [isFocused]);

  async function handleCancel(id) {
    try {
      await api.delete(`subscriptions/${id}`);
      Alert.alert('Inscrições', 'Inscrição cancelada com sucesso!');
    } catch (err) {
      Alert.alert('Inscrições', 'Não foi possivel cancelar a inscrição.');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <List
          data={subscriptions}
          // extraData={loadSubscriptions()}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Card
              onSubmit={() => handleCancel(item.id)}
              textButton="Cancelar inscrição"
              data={item}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="local-offer" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Subscriptions);
