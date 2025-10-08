import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

import { SafeAreaView } from 'react-native-safe-area-context';

interface Business {
  id: string;
  name: string;
  description: string;
  rating: number;
  address: string;
  phone: string;
  hours: string;
  image: string;
}

const mockBusinesses: Record<string, Business[]> = {
  'home-services': [
    {
      id: '19',
      name: 'Gas La Bala',
      description: 'Venta de gas Lima Gas, Solgas y Rinde Gas. Balones vacíos y válvulas. Delivery gratis.',
      rating: 0,
      address: 'Los Olivos',
      phone: '942604451',
      hours: 'Lunes a domingo (incluido feriados) de 6:30 am. a 10 pm.',
      image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/oaohlh6q9sd3n3o41ymsz'
    },
    {
      id: '22',
      name: 'El Caserito Regalón',
      description: '¡Siempre con el peso exacto! Venta de gas autorizado por Osinergmin.',
      rating: 0,
      address: 'Los Olivos',
      phone: '+51979743597',
      hours: 'Lunes a domingo y feriados de 6 am. a 10 pm.',
      image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/wmcfm587ip5lj5ic7nx13'
    }
  ],
  'technical-service': [
    {
      id: '20',
      name: 'Electric-Gas',
      description: 'Servicio técnico garantizado de Línea Blanca',
      rating: 0,
      address: 'Las Agatas 1376, Cooperativa Cajabamba, al lado de Cooperativa Angélica Gamarra, Los Olivos',
      phone: '993982439',
      hours: 'Trabajos en taller y a domicilio',
      image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/pg9hzfbgggq0eji3klur4'
    }
  ],
  beauty: [
    {
      id: '12',
      name: 'CENTRO DE MEDICINA REGENERATIVA Y ESTÉTICA INTEGRAL',
      description: 'Tratamiento con Plasma Rico en Plaquetas PRP (Células Madre)',
      rating: 5.0,
      address: 'Av. Antúnez de Mayolo 848 - 3er. piso, Urb. Mercurio',
      phone: '991405449',
      hours: 'Lunes a sábado previa cita',
      image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/q1pzc9tmi5kqigsz1s4ow'
    }
  ],

  nutrition: [
    {
      id: '18',
      name: '✨ Renova Plus: energía, fuerza y vitalidad',
      description: '¿Cansancio diario? ¿Cabello y uñas débiles? ¿Piel sin vida? Son señales de que tu cuerpo pide ayuda.',
      rating: 0,
      address: 'Delivery GRATIS - Los Olivos',
      phone: '+51993490886',
      hours: 'Pedidos por WhatsApp',
      image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/i3gdkrzhkuynayvqymm7y'
    }
  ],
  marketing: [
    {
      id: '21',
      name: 'La Imprenta del Shopper',
      description: 'Todo lo que imaginas en papel, cartón o cartulina',
      rating: 0,
      address: 'Lima Metropolitana',
      phone: '+51993490886',
      hours: 'Servicio rápido y económico',
      image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/a08xmljl78hiqhstkft7c'
    }
  ]
};

export default function CategoryScreen() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const businesses = mockBusinesses[id as string] || [];

  const handleBusinessPress = (business: Business) => {
    router.push({
      pathname: '/business/[id]',
      params: { 
        id: business.id,
        name: business.name,
        description: business.description,
        rating: business.rating.toString(),
        address: business.address,
        phone: business.phone,
        hours: business.hours,
        image: business.image
      }
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen 
        options={{ 
          title: name || 'Categoría',
          headerStyle: { backgroundColor: '#667eea' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' }
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.header}
        >
          <Text style={styles.headerTitle}>{name}</Text>
          <Text style={styles.headerSubtitle}>{businesses.length} negocios encontrados</Text>
        </LinearGradient>

        <View style={styles.content}>
          <View style={styles.businessGrid}>
            {businesses.map((business) => (
              <TouchableOpacity
                key={business.id}
                style={styles.businessCard}
                onPress={() => handleBusinessPress(business)}
                testID={`business-${business.id}`}
                activeOpacity={0.8}
              >
                <Image source={{ uri: business.image }} style={styles.businessImage} />
                <View style={styles.businessOverlay}>
                  <Text style={styles.businessName} numberOfLines={2}>{business.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  businessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  businessCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    marginBottom: 12,
  },
  businessImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  businessOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    padding: 12,
  },
  businessName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    lineHeight: 18,
  },
});