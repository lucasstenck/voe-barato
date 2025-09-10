import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl
} from 'react-native';
import { Title, FAB, Portal, Modal, Text } from 'react-native-paper';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import { alertAPI, Alert as AlertType, AlertCreate } from '../../services/api';

const AlertsScreen: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [targetPrice, setTargetPrice] = useState('');

  useEffect(() => {
    loadAlerts();
  }, []);

  const loadAlerts = async () => {
    setLoading(true);
    try {
      const alertsData = await alertAPI.getAlerts();
      setAlerts(alertsData);
    } catch (error) {
      console.error('Error loading alerts:', error);
      Alert.alert('Erro', 'Erro ao carregar alertas');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadAlerts();
    setRefreshing(false);
  };

  const handleCreateAlert = async () => {
    if (!origin || !destination || !targetPrice) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return;
    }

    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      Alert.alert('Erro', 'Preço deve ser um valor válido maior que zero');
      return;
    }

    try {
      const alertData: AlertCreate = {
        origin: origin.toUpperCase(),
        destination: destination.toUpperCase(),
        target_price: price,
      };

      await alertAPI.createAlert(alertData);
      setShowCreateModal(false);
      resetForm();
      loadAlerts();
      Alert.alert('Sucesso', 'Alerta criado com sucesso!');
    } catch (error) {
      console.error('Error creating alert:', error);
      Alert.alert('Erro', 'Erro ao criar alerta');
    }
  };

  const handleDeleteAlert = async (alertId: number) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este alerta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            try {
              await alertAPI.deleteAlert(alertId);
              loadAlerts();
              Alert.alert('Sucesso', 'Alerta excluído com sucesso!');
            } catch (error) {
              console.error('Error deleting alert:', error);
              Alert.alert('Erro', 'Erro ao excluir alerta');
            }
          },
        },
      ]
    );
  };

  const handleTestNotification = async (alertId: number) => {
    try {
      const result = await alertAPI.testNotification(alertId);
      Alert.alert('Notificação de Teste', result.message);
    } catch (error) {
      console.error('Error testing notification:', error);
      Alert.alert('Erro', 'Erro ao testar notificação');
    }
  };

  const resetForm = () => {
    setOrigin('');
    setDestination('');
    setTargetPrice('');
  };

  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2)}`;
  };

  const renderAlert = ({ item }: { item: AlertType }) => (
    <View style={styles.alertCard}>
      <View style={styles.alertHeader}>
        <Text style={styles.route}>
          {item.origin} → {item.destination}
        </Text>
        <Text style={styles.price}>{formatPrice(item.target_price)}</Text>
      </View>

      <View style={styles.alertActions}>
        <CustomButton
          title="Testar Notificação"
          onPress={() => handleTestNotification(item.id)}
          mode="outlined"
          style={styles.testButton}
        />
        <CustomButton
          title="Excluir"
          onPress={() => handleDeleteAlert(item.id)}
          mode="outlined"
          style={styles.deleteButton}
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Meus Alertas</Title>
      </View>

      <FlatList
        data={alerts}
        renderItem={renderAlert}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Você ainda não tem alertas cadastrados.
            </Text>
            <Text style={styles.emptySubtext}>
              Crie alertas para ser notificado quando os preços caírem!
            </Text>
          </View>
        }
        contentContainerStyle={alerts.length === 0 ? styles.emptyList : undefined}
      />

      <Portal>
        <Modal
          visible={showCreateModal}
          onDismiss={() => {
            setShowCreateModal(false);
            resetForm();
          }}
          contentContainerStyle={styles.modalContainer}
        >
          <Title style={styles.modalTitle}>Criar Novo Alerta</Title>

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
            label="Preço Alvo (R$)"
            value={targetPrice}
            onChangeText={setTargetPrice}
            placeholder="ex: 500.00"
            keyboardType="numeric"
          />

          <View style={styles.modalActions}>
            <CustomButton
              title="Cancelar"
              onPress={() => {
                setShowCreateModal(false);
                resetForm();
              }}
              mode="outlined"
              style={styles.modalButton}
            />
            <CustomButton
              title="Criar"
              onPress={handleCreateAlert}
              style={styles.modalButton}
            />
          </View>
        </Modal>
      </Portal>

      <FAB
        icon="plus"
        onPress={() => setShowCreateModal(true)}
        style={styles.fab}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    textAlign: 'center',
  },
  alertCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
  },
  alertHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  route: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  alertActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  testButton: {
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    flex: 1,
    marginLeft: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  emptyList: {
    flex: 1,
  },
  modalContainer: {
    backgroundColor: '#fff',
    margin: 20,
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#1976D2',
  },
});

export default AlertsScreen;
