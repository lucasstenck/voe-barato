import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl
} from 'react-native';
import { Title, FAB, Portal, Modal, Text } from 'react-native-paper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import FlightCard from '../../components/FlightCard';
import { flightAPI, Flight, FlightSearchRequest, alertAPI } from '../../services/api';
import NotificationsService from '../../services/NotificationsService';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';

const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDateBR, setDepartureDateBR] = useState('');
  const [returnDateBR, setReturnDateBR] = useState('');
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [targetPrice, setTargetPrice] = useState('');
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  const maskDateBR = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8);
    const parts = [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean);
    return parts.join('-');
  };

  const isValidDateBR = (value: string) => {
    const match = value.match(/^(\d{2})-(\d{2})-(\d{4})$/);
    if (!match) return false;
    const day = parseInt(match[1], 10);
    const month = parseInt(match[2], 10);
    const year = parseInt(match[3], 10);
    if (month < 1 || month > 12) return false;
    if (day < 1 || day > 31) return false;
    // Ajuste simples por mês
    const thirtyDays = [4, 6, 9, 11];
    if (thirtyDays.includes(month) && day > 30) return false;
    if (month === 2) {
      const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
      if (day > (isLeap ? 29 : 28)) return false;
    }
    return true;
  };

  const convertDateBRToISO = (value: string) => {
    const [d, m, y] = value.split('-');
    return `${y}-${m}-${d}`;
  };

  const handleSearch = async () => {
    if (!origin || !destination || !departureDateBR) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    // Basic validation for IATA codes
    if (origin.length !== 3 || destination.length !== 3) {
      Alert.alert('Erro', 'Use códigos IATA válidos (ex: GRU, SDU)');
      return;
    }

    if (!isValidDateBR(departureDateBR)) {
      Alert.alert('Erro', 'Data inválida. Use o formato DD-MM-AAAA');
      return;
    }
    if (isRoundTrip && (!returnDateBR || !isValidDateBR(returnDateBR))) {
      Alert.alert('Erro', 'Data de volta inválida. Use o formato DD-MM-AAAA');
      return;
    }

    setLoading(true);
    try {
      const searchData: FlightSearchRequest = {
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        departure_date: convertDateBRToISO(departureDateBR),
        round_trip: isRoundTrip,
        return_date: isRoundTrip ? convertDateBRToISO(returnDateBR) : undefined,
      };

      const response = await flightAPI.search(searchData);
      setFlights(response.flights);
      setShowResults(true);

      // Abre nova tela de resultados
      navigation.navigate('Results', {
        flights: response.flights,
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        isRoundTrip,
        returnDate: isRoundTrip ? returnDateBR : undefined,
      });

      // Notificação automática se houver preço abaixo do alvo informado
      const numericTarget = parseFloat(targetPrice.replace(',', '.'));
      if (!isNaN(numericTarget) && response.flights.length > 0) {
        const minPrice = Math.min(...response.flights.map(f => f.price));
        if (minPrice < numericTarget) {
          await NotificationsService.testAlertNotification(
            origin.toUpperCase(),
            destination.toUpperCase(),
            numericTarget
          );
        }
      }
    } catch (error) {
      console.error('Search error:', error);
      Alert.alert('Erro', 'Erro ao buscar voos. Verifique se o backend está rodando.');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const renderFlight = ({ item }: { item: Flight }) => (
    <FlightCard
      flight={item}
      onPress={() => {
        Alert.alert('Detalhes do Voo', `Voo ${item.flight_number} - ${item.airline}`);
      }}
    />
  );

  const formatDateForDisplay = (dateString: string) => {
    // Simple date formatting - you might want to use a date picker library
    return dateString; // For now, just return as is
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={styles.content}>
        <Title style={styles.title}>Buscar Voos</Title>

        <View style={styles.form}>
          <CustomInput
            label="Origem (código IATA)"
            value={origin}
            onChangeText={setOrigin}
            placeholder="ex: GRU"
            autoCapitalize="characters"
          />

          <CustomInput
            label="Destino (código IATA)"
            value={destination}
            onChangeText={setDestination}
            placeholder="ex: SDU"
            autoCapitalize="characters"
          />

          <CustomInput
            label="Data de Partida (DD-MM-AAAA)"
            value={departureDateBR}
            onChangeText={(t) => setDepartureDateBR(maskDateBR(t))}
            placeholder="ex: 25-12-2024"
            keyboardType="numeric"
          />

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <CustomButton
              title={isRoundTrip ? 'Ida e Volta' : 'Só Ida'}
              onPress={() => setIsRoundTrip(!isRoundTrip)}
              mode="outlined"
              style={{ flex: 1, marginRight: 8 }}
            />
            {isRoundTrip && (
              <View style={{ flex: 2 }}>
                <CustomInput
                  label="Data de Volta (DD-MM-AAAA)"
                  value={returnDateBR}
                  onChangeText={(t) => setReturnDateBR(maskDateBR(t))}
                  placeholder="ex: 05-01-2025"
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>

          <CustomInput
            label="Preço Alvo p/ Alerta (R$)"
            value={targetPrice}
            onChangeText={setTargetPrice}
            placeholder="ex: 500"
            keyboardType="numeric"
          />

          <CustomButton
            title="Buscar Voos"
            onPress={handleSearch}
            loading={loading}
            style={styles.searchButton}
          />

          <CustomButton
            title="Criar Alerta com dados acima"
            onPress={async () => {
              if (!origin || !destination || !targetPrice) {
                Alert.alert('Erro', 'Informe origem, destino e preço alvo');
                return;
              }
              const price = parseFloat(targetPrice.replace(',', '.'));
              if (isNaN(price) || price <= 0) {
                Alert.alert('Erro', 'Preço alvo inválido');
                return;
              }
              try {
                await alertAPI.createAlert({
                  origin: origin.toUpperCase(),
                  destination: destination.toUpperCase(),
                  target_price: price,
                });
                Alert.alert('Sucesso', 'Alerta criado com sucesso!');
              } catch (e) {
                console.error('Create alert error:', e);
                Alert.alert('Erro', 'Não foi possível criar o alerta');
              }
            }}
            style={styles.searchButton}
          />
        </View>

        {showResults && (
          <View style={styles.results}>
            <Text style={styles.resultsTitle}>
              {flights.length} voos encontrados
            </Text>

            <FlatList
              data={flights}
              renderItem={renderFlight}
              keyExtractor={(item) => item.id}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
            />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
    marginBottom: 24,
  },
  form: {
    marginBottom: 24,
  },
  searchButton: {
    marginTop: 16,
  },
  results: {
    flex: 1,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
});

export default SearchScreen;
