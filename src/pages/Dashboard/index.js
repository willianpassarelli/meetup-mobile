import React, { useEffect, useState, useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { format, addDays, subDays } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '~/components/Background';
import Header from '~/components/Header';
import Card from '~/components/Card';

import api from '~/services/api';
import { Container, Dates, DateText, List } from './styles';

function Dashboard({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [date, setDate] = useState(new Date());

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadMeetups(paginate = 1) {
    try {
      const response = await api.get('meetups', {
        params: {
          page: paginate,
          date: format(date, 'yyyy-MM-dd'),
        },
      });
      setRefreshing(false);
      setPage(paginate);
      setMeetups(
        paginate >= 2 ? [...meetups, ...response.data] : response.data
      );
    } catch (err) {
      console.tron.log('@err', err.message);
    }
  }

  useEffect(() => {
    loadMeetups();
  }, [date, isFocused]);

  function loadMore() {
    const next = page + 1;
    loadMeetups(next);
  }

  function refreshList() {
    setRefreshing(true);
    setMeetups([]);
    loadMeetups();
  }

  function handlNextDay() {
    setDate(addDays(date, 1));
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
  }

  async function handleSubscription(id) {
    try {
      await api.post(`subscriptions/${id}/subscriptions`);
      Alert.alert('Inscrições', 'Inscrição realizada com sucesso!');
    } catch (err) {
      Alert.alert('Inscrições', 'Não foi possivel realizar a inscrição.');
    }
  }

  return (
    <Background>
      <Header />
      <Container>
        <Dates>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="chevron-left" size={35} color="#FFF" />
          </TouchableOpacity>
          <DateText>{dateFormatted}</DateText>
          <TouchableOpacity onPress={handlNextDay}>
            <Icon name="chevron-right" size={35} color="#FFF" />
          </TouchableOpacity>
        </Dates>
        <List
          data={meetups}
          onRefresh={refreshList}
          refreshing={refreshing}
          onEndReachedThreshold={0.2}
          onEndReached={loadMore}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <Card
              onSubmit={() => handleSubscription(item.id)}
              textButton="Realizar inscrição"
              data={{ meetup: item }}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="format-list-bulleted" size={20} color={tintColor} />
  ),
};

export default withNavigationFocus(Dashboard);
