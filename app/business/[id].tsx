import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Linking, Modal } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Star, MapPin, Phone, Clock, Heart, Share2, ChevronDown, ChevronUp, Facebook, Instagram } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Video, ResizeMode } from 'expo-av';

export default function BusinessScreen() {
  const params = useLocalSearchParams<{
    id: string;
    name: string;
    description: string;
    rating: string;
    address: string;
    phone: string;
    hours: string;
    image: string;
  }>();

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isVideoFullscreen, setIsVideoFullscreen] = useState<boolean>(false);
  const isRenovaPlus = params.id === '18';
  const videoRef = React.useRef<Video>(null);

  const handleCall = () => {
    if (params.phone) {
      Linking.openURL(`tel:${params.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (params.phone) {
      const message = encodeURIComponent('Hola, quiero información sobre Renova Plus');
      Linking.openURL(`https://wa.me/${params.phone.replace(/[^0-9]/g, '')}?text=${message}`);
    }
  };

  const handleVideoPress = () => {
    setIsVideoFullscreen(true);
  };

  const handleCloseFullscreen = () => {
    setIsVideoFullscreen(false);
    if (videoRef.current) {
      videoRef.current.pauseAsync();
    }
  };

  const handleDirections = () => {
    if (params.address) {
      const encodedAddress = encodeURIComponent(params.address);
      Linking.openURL(`https://maps.google.com/?q=${encodedAddress}`);
    }
  };

  const handleSocialMedia = (platform: string) => {
    const urls: Record<string, string> = {
      facebook: 'https://www.facebook.com/profile.php?id=61580116620066',
      instagram: 'https://www.instagram.com/renovaconjuan'
    };
    if (urls[platform]) {
      Linking.openURL(urls[platform]);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen 
        options={{ 
          title: params.name || 'Negocio',
          headerStyle: { backgroundColor: '#667eea' },
          headerTintColor: 'white',
          headerTitleStyle: { fontWeight: 'bold' },
          headerRight: () => (
            <View style={styles.headerActions}>
              <TouchableOpacity style={styles.headerButton}>
                <Heart size={24} color="white" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.headerButton}>
                <Share2 size={24} color="white" />
              </TouchableOpacity>
            </View>
          )
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {isRenovaPlus ? (
          <View>
            <Image source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/i3gdkrzhkuynayvqymm7y' }} style={styles.heroImage} />
            <View style={styles.storeNameOverlay}>
              <Text style={styles.storeName}>TIENDA RENOVA PLUS</Text>
            </View>
          </View>
        ) : (
          <Image source={{ uri: params.image }} style={styles.heroImage} />
        )}
        
        <View style={styles.content}>
          {isRenovaPlus ? (
            <>
              <TouchableOpacity 
                style={styles.accordionHeader}
                onPress={() => setIsExpanded(!isExpanded)}
                activeOpacity={0.7}
              >
                <Text style={styles.accordionTitle}>{params.name}</Text>
                {isExpanded ? (
                  <ChevronUp size={24} color="#4CAF50" />
                ) : (
                  <ChevronDown size={24} color="#4CAF50" />
                )}
              </TouchableOpacity>

              {isExpanded && (
                <View style={styles.accordionContent}>
                  <Text style={styles.problemText}>{params.description}</Text>
                  
                  <View style={styles.benefitsSection}>
                    <Text style={styles.benefitsTitle}>Beneficios:</Text>
                    <View style={styles.benefitItem}>
                      <Text style={styles.benefitEmoji}>💪</Text>
                      <Text style={styles.benefitText}>Energía renovada</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Text style={styles.benefitEmoji}>💅</Text>
                      <Text style={styles.benefitText}>Cabello y uñas fuertes</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Text style={styles.benefitEmoji}>✨</Text>
                      <Text style={styles.benefitText}>Piel revitalizada</Text>
                    </View>
                    <View style={styles.benefitItem}>
                      <Text style={styles.benefitEmoji}>🕒</Text>
                      <Text style={styles.benefitText}>Fácil de usar, solo una dosis al día</Text>
                    </View>
                  </View>

                  <View style={styles.mediaSection}>
                    <Text style={styles.sectionTitle}>Video del Producto</Text>
                    <TouchableOpacity 
                      style={styles.videoContainer}
                      onPress={handleVideoPress}
                      activeOpacity={0.8}
                    >
                      <Video
                        source={{ uri: 'https://drive.google.com/uc?export=download&id=1fdP7F5Kpd5BM29MylmK_uTr-mJQJQedg' }}
                        style={styles.video}
                        useNativeControls={false}
                        resizeMode={ResizeMode.COVER}
                        isLooping
                        shouldPlay={false}
                      />
                      <View style={styles.playOverlay}>
                        <View style={styles.playButton}>
                          <Text style={styles.playIcon}>▶</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.gallerySection}>
                    <Text style={styles.sectionTitle}>Galería</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
                      <Image 
                        source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/pp6hvw0m1tjsarto04uy3' }} 
                        style={styles.galleryImage} 
                      />
                      <Image 
                        source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/lpqkhadv4be67pzezjme8' }} 
                        style={styles.galleryImage} 
                      />
                      <Image 
                        source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/zhmn8j63704uqixjh4kcw' }} 
                        style={styles.galleryImage} 
                      />
                    </ScrollView>
                  </View>

                  <View style={styles.ctaSection}>
                    <Text style={styles.ctaTitle}>Haz tu pedido con delivery GRATIS</Text>
                    <TouchableOpacity style={styles.whatsappButton} onPress={handleWhatsApp}>
                      <LinearGradient
                        colors={['#25D366', '#128C7E']}
                        style={styles.buttonGradient}
                      >
                        <Phone size={20} color="white" />
                        <Text style={styles.buttonText}>📱 WhatsApp</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.socialSection}>
                    <Text style={styles.sectionTitle}>Síguenos en redes</Text>
                    <View style={styles.socialButtons}>
                      <TouchableOpacity 
                        style={[styles.socialButton, styles.facebookButton]}
                        onPress={() => handleSocialMedia('facebook')}
                        activeOpacity={0.7}
                      >
                        <Facebook size={40} color="#1877F2" fill="#1877F2" />
                        <Text style={styles.socialText}>Facebook</Text>
                        <Text style={styles.socialHandle}>Renova Plus</Text>
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.socialButton, styles.instagramButton]}
                        onPress={() => handleSocialMedia('instagram')}
                        activeOpacity={0.7}
                      >
                        <View style={styles.instagramIconContainer}>
                          <Instagram size={40} color="#E4405F" />
                        </View>
                        <Text style={styles.socialText}>Instagram</Text>
                        <Text style={styles.socialHandle}>@renovaconjuan</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.businessHeader}>
                <Text style={styles.businessName}>{params.name}</Text>
                {parseFloat(params.rating) > 0 && (
                  <View style={styles.ratingContainer}>
                    <Star size={20} color="#FFD700" fill="#FFD700" />
                    <Text style={styles.rating}>{params.rating}</Text>
                  </View>
                )}
              </View>
              
              <Text style={styles.description}>{params.description}</Text>
              
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Información</Text>
                
                <View style={styles.infoItem}>
                  <MapPin size={20} color="#667eea" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Dirección</Text>
                    <Text style={styles.infoValue}>{params.address}</Text>
                  </View>
                </View>
                
                <View style={styles.infoItem}>
                  <Phone size={20} color="#667eea" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Teléfono</Text>
                    <Text style={styles.infoValue}>{params.phone}</Text>
                  </View>
                </View>
                
                <View style={styles.infoItem}>
                  <Clock size={20} color="#667eea" />
                  <View style={styles.infoContent}>
                    <Text style={styles.infoLabel}>Horarios</Text>
                    <Text style={styles.infoValue}>{params.hours}</Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.actionsSection}>
                <TouchableOpacity style={styles.primaryButton} onPress={handleCall}>
                  <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.buttonGradient}
                  >
                    <Phone size={20} color="white" />
                    <Text style={styles.buttonText}>Llamar</Text>
                  </LinearGradient>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.secondaryButton} onPress={handleDirections}>
                  <MapPin size={20} color="#667eea" />
                  <Text style={styles.secondaryButtonText}>Cómo llegar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <Modal
        visible={isVideoFullscreen}
        transparent={false}
        animationType="fade"
        onRequestClose={handleCloseFullscreen}
      >
        <View style={styles.fullscreenContainer}>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={handleCloseFullscreen}
          >
            <Text style={styles.closeButtonText}>✕</Text>
          </TouchableOpacity>
          <Video
            ref={videoRef}
            source={{ uri: 'https://drive.google.com/uc?export=download&id=1fdP7F5Kpd5BM29MylmK_uTr-mJQJQedg' }}
            style={styles.fullscreenVideo}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay={true}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
  },
  headerButton: {
    padding: 4,
  },
  heroImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
  },
  businessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  businessName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 16,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
  },
  description: {
    fontSize: 16,
    color: '#7f8c8d',
    lineHeight: 24,
    marginBottom: 24,
  },
  infoSection: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    gap: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  actionsSection: {
    gap: 12,
  },
  primaryButton: {
    borderRadius: 12,
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
  buttonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#667eea',
    gap: 8,
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#667eea',
  },
  accordionHeader: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  accordionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4CAF50',
    flex: 1,
    marginRight: 12,
  },
  accordionContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  problemText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
    fontStyle: 'italic',
  },
  benefitsSection: {
    marginBottom: 24,
  },
  benefitsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 12,
  },
  benefitEmoji: {
    fontSize: 24,
  },
  benefitText: {
    fontSize: 16,
    color: '#2c3e50',
    flex: 1,
  },
  mediaSection: {
    marginBottom: 24,
  },
  videoContainer: {
    backgroundColor: '#000',
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 9 / 16,
    width: '25%',
    maxWidth: 150,
    alignSelf: 'center',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  gallerySection: {
    marginBottom: 24,
  },
  gallery: {
    marginTop: 8,
  },
  galleryImage: {
    width: 260,
    height: 260,
    borderRadius: 12,
    marginRight: 12,
    resizeMode: 'cover',
  },
  storeNameOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
  },
  playOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    fontSize: 30,
    color: '#4CAF50',
    marginLeft: 5,
  },
  fullscreenContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenVideo: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#000',
    fontWeight: 'bold',
  },
  instagramIconContainer: {
    marginBottom: 8,
  },
  facebookButton: {
    borderColor: '#1877F2',
    borderWidth: 2,
  },
  instagramButton: {
    borderColor: '#E4405F',
    borderWidth: 2,
  },
  ctaSection: {
    marginBottom: 24,
  },
  ctaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  whatsappButton: {
    borderRadius: 12,
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
  socialSection: {
    marginBottom: 16,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  socialText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  socialHandle: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});