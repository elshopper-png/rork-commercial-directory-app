import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, MapPin, Clock } from 'lucide-react-native';
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
      id: '5',
      name: 'Servicios del Hogar Express',
      description: 'Limpieza, gasfitería, electricidad y más',
      rating: 4.6,
      address: 'Av. Naranjal 456, Los Olivos',
      phone: '987-901-234',
      hours: 'Lun-Sáb: 8:00 AM - 6:00 PM',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=300&fit=crop'
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
      name: 'Spa & Belleza Glamour',
      description: 'Tratamientos faciales, masajes y manicure',
      rating: 4.9,
      address: 'Av. Naranjal 1234, Los Olivos',
      phone: '987-123-890',
      hours: 'Lun-Sáb: 10:00 AM - 8:00 PM',
      image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop'
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
          {businesses.map((business) => (
            <TouchableOpacity
              key={business.id}
              style={styles.businessCard}
              onPress={() => handleBusinessPress(business)}
              testID={`business-${business.id}`}
            >
              <Image source={{ uri: business.image }} style={styles.businessImage} />
              
              <View style={styles.businessInfo}>
                <Text style={styles.businessName}>{business.name}</Text>
                <Text style={styles.businessDescription}>{business.description}</Text>
                
                <View style={styles.businessDetails}>
                  {business.rating > 0 && (
                    <View style={styles.ratingContainer}>
                      <Star size={16} color="#FFD700" fill="#FFD700" />
                      <Text style={styles.rating}>{business.rating}</Text>
                    </View>
                  )}
                  
                  <View style={styles.detailItem}>
                    <MapPin size={14} color="#666" />
                    <Text style={styles.detailText}>{business.address}</Text>
                  </View>
                  
                  <View style={styles.detailItem}>
                    <Clock size={14} color="#666" />
                    <Text style={styles.detailText}>{business.hours}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
    padding: 20,
  },
  businessCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  businessImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  businessInfo: {
    padding: 16,
  },
  businessName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  businessDescription: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  businessDetails: {
    gap: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});