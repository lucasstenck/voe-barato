import React from 'react';
import { View, StyleSheet, Alert, ScrollView } from 'react-native';
import { Title, Card, Paragraph, Button, Text } from 'react-native-paper';
import { useAuth } from '../../services/AuthContext';

const ProfileScreen: React.FC = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Sair da conta',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: logout,
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Title style={styles.title}>Perfil</Title>
      </View>

      <Card style={styles.profileCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Informações da Conta</Title>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user?.email}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>ID do Usuário:</Text>
            <Text style={styles.value}>{user?.id}</Text>
          </View>
        </Card.Content>
      </Card>

      <Card style={styles.infoCard}>
        <Card.Content>
          <Title style={styles.cardTitle}>Sobre o App</Title>

          <Paragraph style={styles.paragraph}>
            Plataforma de Monitoramento de Passagens Aéreas
          </Paragraph>

          <Paragraph style={styles.paragraph}>
            Esta é uma aplicação MVP para monitoramento de preços de passagens aéreas.
            Você pode buscar voos, criar alertas de preço e receber notificações quando
            os preços caírem.
          </Paragraph>

          <View style={styles.features}>
            <Text style={styles.featureTitle}>Funcionalidades:</Text>
            <Text style={styles.feature}>• Busca de voos com dados mockados</Text>
            <Text style={styles.feature}>• Criação de alertas de preço</Text>
            <Text style={styles.feature}>• Histórico de buscas</Text>
            <Text style={styles.feature}>• Previsão de preços com IA</Text>
            <Text style={styles.feature}>• Notificações push</Text>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.logoutContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          style={styles.logoutButton}
          buttonColor="#D32F2F"
        >
          Sair da Conta
        </Button>
      </View>
    </ScrollView>
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
  profileCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  infoCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    marginBottom: 16,
    color: '#1976D2',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
  },
  paragraph: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    lineHeight: 20,
  },
  features: {
    marginTop: 16,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  feature: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    marginLeft: 8,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  logoutButton: {
    marginTop: 16,
  },
});

export default ProfileScreen;
