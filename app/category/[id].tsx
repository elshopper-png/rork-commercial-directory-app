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
  education: [
    {
      id: '1',
      name: 'Academia Excel Los Olivos',
      description: 'Cursos de computación, inglés y capacitación profesional',
      rating: 4.8,
      address: 'Av. Alfredo Mendiola 1234, Los Olivos',
      phone: '987-654-321',
      hours: 'Lun-Sáb: 9:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop'
    },
    {
      id: '2',
      name: 'Instituto de Idiomas Global',
      description: 'Inglés, francés, italiano - Todos los niveles',
      rating: 4.7,
      address: 'Av. Carlos Izaguirre 567, Los Olivos',
      phone: '987-123-456',
      hours: 'Lun-Vie: 8:00 AM - 9:00 PM',
      image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400&h=300&fit=crop'
    }
  ],
  fitness: [
    {
      id: '3',
      name: 'Gimnasio PowerFit',
      description: 'Entrenamiento funcional, pesas y cardio',
      rating: 4.9,
      address: 'Av. Universitaria 890, Los Olivos',
      phone: '987-789-012',
      hours: 'Lun-Dom: 6:00 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=300&fit=crop'
    },
    {
      id: '4',
      name: 'Yoga & Wellness Center',
      description: 'Clases de yoga, pilates y meditación',
      rating: 4.8,
      address: 'Calle Las Palmeras 234, Los Olivos',
      phone: '987-345-678',
      hours: 'Lun-Sáb: 7:00 AM - 9:00 PM',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop'
    }
  ],
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
    }
  ],
  'technical-service': [
    {
      id: '6',
      name: 'Servicio Técnico Multimarca',
      description: 'Reparación de electrodomésticos y equipos',
      rating: 4.7,
      address: 'Av. Tomás Valle 789, Los Olivos',
      phone: '987-567-890',
      hours: 'Lun-Vie: 9:00 AM - 7:00 PM',
      image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=400&h=300&fit=crop'
    },
    {
      id: '20',
      name: 'Electric-Gas',
      description: 'Servicio técnico garantizado de Línea Blanca',
      rating: 0,
      address: 'Las Agatas 1376, Cooperativa Cajabamba, al lado de Cooperativa Angélica Gamarra, Los Olivos',
      phone: '993982439',
      hours: 'Trabajos en taller y a domicilio',
      image: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/0gkngioxo91omvl8in308'
    }
  ],
  'it-repair': [
    {
      id: '7',
      name: 'TechFix Los Olivos',
      description: 'Reparación de laptops, PCs y celulares',
      rating: 4.8,
      address: 'Av. Antúnez de Mayolo 321, Los Olivos',
      phone: '987-234-567',
      hours: 'Lun-Sáb: 10:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=300&fit=crop'
    }
  ],
  health: [
    {
      id: '8',
      name: 'Clínica Salud Integral',
      description: 'Medicina general, especialidades y emergencias',
      rating: 4.9,
      address: 'Av. Universitaria 1122, Los Olivos',
      phone: '987-678-901',
      hours: '24 horas',
      image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop'
    }
  ],
  food: [
    {
      id: '9',
      name: 'Pollería El Sabor',
      description: 'Pollo a la brasa y parrillas',
      rating: 4.7,
      address: 'Av. Alfredo Mendiola 2345, Los Olivos',
      phone: '987-890-123',
      hours: 'Lun-Dom: 11:00 AM - 11:00 PM',
      image: 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=400&h=300&fit=crop'
    },
    {
      id: '10',
      name: 'Snacks & Café Express',
      description: 'Café, jugos, sándwiches y postres',
      rating: 4.6,
      address: 'Calle Los Rosales 678, Los Olivos',
      phone: '987-012-345',
      hours: 'Lun-Dom: 7:00 AM - 10:00 PM',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop'
    }
  ],
  legal: [
    {
      id: '11',
      name: 'Estudio Jurídico Lex',
      description: 'Asesoría legal en todas las áreas del derecho',
      rating: 4.8,
      address: 'Av. Carlos Izaguirre 901, Los Olivos',
      phone: '987-456-789',
      hours: 'Lun-Vie: 9:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=300&fit=crop'
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
  jobs: [
    {
      id: '13',
      name: 'Agencia de Empleos ProWork',
      description: 'Bolsa de trabajo y reclutamiento',
      rating: 4.5,
      address: 'Av. Universitaria 567, Los Olivos',
      phone: '987-789-456',
      hours: 'Lun-Vie: 8:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&h=300&fit=crop'
    }
  ],
  furniture: [
    {
      id: '14',
      name: 'Muebles & Deco Style',
      description: 'Muebles modernos para el hogar y oficina',
      rating: 4.7,
      address: 'Av. Tomás Valle 890, Los Olivos',
      phone: '987-234-901',
      hours: 'Lun-Sáb: 9:00 AM - 7:00 PM',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=300&fit=crop'
    }
  ],
  'real-estate': [
    {
      id: '15',
      name: 'Inmobiliaria Los Olivos',
      description: 'Venta y alquiler de propiedades',
      rating: 4.6,
      address: 'Av. Alfredo Mendiola 3456, Los Olivos',
      phone: '987-678-234',
      hours: 'Lun-Sáb: 9:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop'
    }
  ],
  construction: [
    {
      id: '16',
      name: 'Constructora & Anexos Pro',
      description: 'Construcción, remodelación y acabados',
      rating: 4.8,
      address: 'Av. Universitaria 2345, Los Olivos',
      phone: '987-901-567',
      hours: 'Lun-Sáb: 8:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=300&fit=crop'
    }
  ],
  marketing: [
    {
      id: '17',
      name: 'Imprenta & Marketing Digital',
      description: 'Diseño gráfico, impresión y publicidad',
      rating: 4.7,
      address: 'Av. Carlos Izaguirre 1234, Los Olivos',
      phone: '987-345-012',
      hours: 'Lun-Vie: 9:00 AM - 7:00 PM',
      image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=300&fit=crop'
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