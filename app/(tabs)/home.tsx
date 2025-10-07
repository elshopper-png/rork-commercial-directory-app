import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';

import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import WhatsAppButton from '@/components/WhatsAppButton';
import { 
  GraduationCap,
  Dumbbell,
  Home,
  Wrench,
  Laptop,
  Heart,
  UtensilsCrossed,
  Calculator,
  Sparkles,
  Briefcase,
  Armchair,
  Hammer,
  Megaphone,
  Pill,
  Shirt
} from 'lucide-react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2;

const categories = [
  { id: 'beauty', name: 'Belleza & Spa', icon: Sparkles, color: '#EC407A' as const, count: 1 },
  { id: 'food', name: 'Comida & Snacks', icon: UtensilsCrossed, color: '#F4511E' as const, count: 2 },
  { id: 'legal', name: 'Contadores', icon: Calculator, color: '#6D4C41' as const, count: 1 },
  { id: 'education', name: 'Educación & Cursos', icon: GraduationCap, color: '#1976D2' as const, count: 2 },
  { id: 'jobs', name: 'Empleos', icon: Briefcase, color: '#8E24AA' as const, count: 1 },
  { id: 'fitness', name: 'Fitness & Deportes', icon: Dumbbell, color: '#43A047' as const, count: 2 },
  { id: 'home-services', name: 'Hogar & Servicios', icon: Home, color: '#009688' as const, count: 1 },
  { id: 'it-repair', name: 'Informática & Reparación', icon: Laptop, color: '#5C6BC0' as const, count: 1 },
  { id: 'legal-services', name: 'Legal', icon: Calculator, color: '#6D4C41' as const, count: 1 },
  { id: 'marketing', name: 'Marketing & Imprenta', icon: Megaphone, color: '#039BE5' as const, count: 1 },
  { id: 'fashion', name: 'Moda & Joyería', icon: Shirt, color: '#E91E63' as const, count: 0 },
  { id: 'furniture', name: 'Muebles & Decoración', icon: Armchair, color: '#7E57C2' as const, count: 1 },
  { id: 'nutrition', name: 'Nutrición & Bienestar', icon: Pill, color: '#4CAF50' as const, count: 1 },
  { id: 'construction', name: 'Obras & Ferretería', icon: Hammer, color: '#F9A825' as const, count: 1 },
  { id: 'health', name: 'Salud Integral', icon: Heart, color: '#0288D1' as const, count: 1 },
  { id: 'technical-service', name: 'Servicio Técnico', icon: Wrench, color: '#9E9E9E' as const, count: 1 }
];

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  
  const handleCategoryPress = (categoryId: string, categoryName: string) => {
    router.push({
      pathname: '/category/[id]',
      params: { id: categoryId, name: categoryName }
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.header, { paddingTop: insets.top + 20 }]}>
          <Image 
            source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/35ruqwvu8tvh4k0wldg3j' }}
            style={styles.logo}
            resizeMode="contain"
          />
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>EL SHOPPER DE</Text>
            <Text style={styles.appTitle}>LOS OLIVOS DIGITAL</Text>
          </View>
          <Text style={styles.slogan}>En Los Olivos tenemos los mejores productos y servicios a un clic de distancia.</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.categoriesGrid}>
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => handleCategoryPress(category.id, category.name)}
                  testID={`category-${category.id}`}
                  activeOpacity={0.7}
                >
                  <View style={[styles.categoryButton, { backgroundColor: category.color }]}>
                    <IconComponent size={36} color="white" strokeWidth={2.5} />
                    <Text style={styles.categoryName}>{category.name}</Text>
                    <View style={styles.countBadge}>
                      <Text style={styles.countText}>{category.count}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <WhatsAppButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  header: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: '900' as const,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 38,
    fontFamily: 'System',
    textShadowColor: 'rgba(153, 153, 153, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  slogan: {
    fontSize: 18,
    color: '#d62828',
    textAlign: 'center',
    fontWeight: '600' as const,
    fontStyle: 'italic' as const,
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  content: {
    padding: 20,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: cardWidth,
    marginBottom: 16,
  },
  categoryButton: {
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#bdbdbd',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: 'white',
    textAlign: 'center',
    marginTop: 12,
    letterSpacing: 0.3,
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    lineHeight: 18,
  },
  countBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: 'white',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontSize: 14,
    fontWeight: '700' as const,
    color: '#000000',
    fontFamily: 'monospace',
  },
});