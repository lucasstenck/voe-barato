import React from 'react';
import { View, StyleSheet, Linking } from 'react-native';
import { Card, Title, Paragraph, Chip, Button } from 'react-native-paper';
import { Flight } from '../services/api';

interface FlightCardProps {
  flight: Flight;
  onPress?: () => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onPress }) => {
  const formatPrice = (price: number) => {
    return `R$ ${price.toFixed(2)}`;
  };

  const getStopsText = (stops: number) => {
    if (stops === 0) return 'Voo direto';
    if (stops === 1) return '1 parada';
    return `${stops} paradas`;
  };

  return (
    <Card style={styles.card} onPress={onPress}>
      <Card.Content>
        <View style={styles.header}>
          <Title style={styles.airline}>{flight.airline}</Title>
          <Chip style={styles.priceChip}>
            {flight.is_round_trip ? `Total ${formatPrice(flight.price)}` : formatPrice(flight.price)}
          </Chip>
        </View>

        <View style={styles.route}>
          <View style={styles.routeItem}>
            <Title style={styles.time}>{flight.departure_time}</Title>
            <Paragraph style={styles.airport}>{flight.origin}</Paragraph>
          </View>

          <View style={styles.routeSeparator}>
            <Paragraph style={styles.duration}>{flight.duration}</Paragraph>
            <Paragraph style={styles.stops}>{getStopsText(flight.stops)}</Paragraph>
          </View>

          <View style={styles.routeItem}>
            <Title style={styles.time}>{flight.arrival_time}</Title>
            <Paragraph style={styles.airport}>{flight.destination}</Paragraph>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerLeft}>
            <Paragraph style={styles.flightNumber} numberOfLines={1} ellipsizeMode="tail">
              Voo {flight.flight_number}
            </Paragraph>
            {flight.is_round_trip ? (
              <Paragraph style={styles.details} numberOfLines={1} ellipsizeMode="tail">
                Ida {formatPrice(flight.outbound_price || 0)}
                {flight.inbound_price ? ` · Volta ${formatPrice(flight.inbound_price)}` : ''}
              </Paragraph>
            ) : null}
          </View>
          {flight.url ? (
            <Button
              compact
              mode="contained-tonal"
              onPress={() => Linking.openURL(flight.url as string)}
              style={styles.linkButton}
              labelStyle={{ fontSize: 12 }}
              contentStyle={styles.linkButtonContent}
            >
              Ver oferta
            </Button>
          ) : null}
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 8,
    marginHorizontal: 16,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  airline: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  priceChip: {
    backgroundColor: '#1976D2',
  },
  route: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  routeItem: {
    alignItems: 'center',
    flex: 1,
  },
  routeSeparator: {
    alignItems: 'center',
    flex: 1,
  },
  time: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  airport: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  duration: {
    fontSize: 12,
    color: '#666',
  },
  stops: {
    fontSize: 10,
    color: '#666',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft: {
    flex: 1,
    paddingRight: 8,
  },
  flightNumber: {
    fontSize: 12,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  linkButton: {
    marginLeft: 8,
    alignSelf: 'center',
    borderRadius: 16,
  },
  linkButtonContent: {
    paddingHorizontal: 10,
    minWidth: 96,
  },
});

export default FlightCard;
