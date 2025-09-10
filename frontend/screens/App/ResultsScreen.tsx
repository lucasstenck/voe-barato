import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Appbar, Text, Chip } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import FlightCard from '../../components/FlightCard';

type Props = NativeStackScreenProps<RootStackParamList, 'Results'>;

const ResultsScreen: React.FC<Props> = ({ route, navigation }) => {
  const { flights, origin, destination, isRoundTrip, returnDate } = route.params;

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Voos disponíveis" subtitle={`${origin} → ${destination}`} />
      </Appbar.Header>

      <View style={styles.badges}>
        <Chip style={styles.chip}>Ida {isRoundTrip ? 'e volta' : ''}</Chip>
        {isRoundTrip && returnDate ? <Chip style={styles.chip}>Volta: {returnDate}</Chip> : null}
      </View>

      {flights.length === 0 ? (
        <View style={styles.empty}>
          <Text>Nenhum voo encontrado.</Text>
        </View>
      ) : (
        <FlatList
          data={flights}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FlightCard flight={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  badges: { flexDirection: 'row', paddingHorizontal: 16, paddingTop: 8 },
  chip: { marginRight: 8 },
  list: { paddingBottom: 16 },
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default ResultsScreen;


