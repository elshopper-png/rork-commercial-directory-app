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
  const isMedicinaRegenerativa = params.id === '12';
  const isGasLaBala = params.id === '19';
  const videoRef = React.useRef<Video>(null);

  const handleCall = () => {
    if (params.phone) {
      Linking.openURL(`tel:${params.phone}`);
    }
  };

  const handleWhatsApp = () => {
    if (params.phone) {
      const message = isMedicinaRegenerativa 
        ? encodeURIComponent('Hola, quiero solicitar una cita')
        : isGasLaBala
        ? encodeURIComponent('Hola, quiero hacer un pedido de gas')
        : encodeURIComponent('Hola, quiero información sobre Renova Plus');
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
    if (isMedicinaRegenerativa) {
      Linking.openURL('https://www.google.com/maps/place/Av.+Santiago+Antunez+de+Mayolo+848,+Los+Olivos+15301/@-11.9924519,-77.0719698,17.25z/data=!4m6!3m5!1s0x9105ce5963606bd1:0x44f4712ae588f03c!8m2!3d-11.9926661!4d-77.0716667!16s%2Fg%2F11q2ng_sww?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D');
    } else if (params.address) {
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

  const handleEmail = () => {
    Linking.openURL('mailto:mashaburga@yahoo.com');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Stack.Screen 
        options={{ 
          title: params.name || 'Negocio',
          headerStyle: { backgroundColor: isMedicinaRegenerativa ? '#E91E63' : isGasLaBala ? '#FF6B35' : '#667eea' },
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
        ) : isMedicinaRegenerativa ? (
          <View>
            <Image source={{ uri: params.image }} style={styles.heroImage} />
            <View style={styles.medicinaNameOverlay}>
              <Text style={styles.medicinaName}>CENTRO DE MEDICINA{"\n"}REGENERATIVA Y ESTÉTICA INTEGRAL</Text>
            </View>
          </View>
        ) : isGasLaBala ? (
          <Image source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/oaohlh6q9sd3n3o41ymsz' }} style={styles.gasHeroImage} />
        ) : (
          <Image source={{ uri: params.image }} style={styles.heroImage} />
        )}
        
        <View style={styles.content}>
          {isMedicinaRegenerativa ? (
            <>
              <View style={styles.medicinaHeader}>
                <Text style={styles.medicinaSubtitle}>Tratamiento con Plasma Rico en Plaquetas PRP (Células Madre)</Text>
                <Text style={styles.medicinaSubtitle2}>APLICACIÓN DE BOTOX - MAQUILLAJE PERMANENTE - OZONOTERAPIA</Text>
              </View>

              <View style={styles.medicinaContent}>
                <Text style={styles.medicinaQuestion}>🤔 ¿Vives con dolor?</Text>
                <Text style={styles.medicinaText}>Recupera tu movilidad y calidad de vida.</Text>
                
                <Text style={styles.medicinaSectionTitle}>Tratamos eficazmente afecciones como:</Text>
                <View style={styles.medicinaList}>
                  <Text style={styles.medicinaListItem}>• Artritis y Artrosis</Text>
                  <Text style={styles.medicinaListItem}>• Lesiones Deportivas</Text>
                  <Text style={styles.medicinaListItem}>• Tendinitis y Lumbalgia</Text>
                  <Text style={styles.medicinaListItem}>• Síndrome de Hombro Doloroso</Text>
                  <Text style={styles.medicinaListItem}>• Dolor de Columna</Text>
                </View>

                <View style={styles.medicinaSolution}>
                  <Text style={styles.medicinaSolutionTitle}>💉 La solución: Terapia con Plasma Rico en Plaquetas (PRP)</Text>
                  <Text style={styles.medicinaText}>Un tratamiento regenerativo y natural que utiliza tu propio plasma para estimular la curación de:</Text>
                  <View style={styles.medicinaList}>
                    <Text style={styles.medicinaListItem}>• Cartílagos</Text>
                    <Text style={styles.medicinaListItem}>• Huesos</Text>
                    <Text style={styles.medicinaListItem}>• Ligamentos y tendones</Text>
                  </View>
                </View>

                <View style={styles.medicinaEstheticSection}>
                  <Text style={styles.medicinaEstheticTitle}>✨ Además, es la elección perfecta para la Medicina Estética:</Text>
                  <View style={styles.medicinaList}>
                    <Text style={styles.medicinaListItem}>• Rejuvenecimiento Facial</Text>
                    <Text style={styles.medicinaListItem}>• Tratamiento del Acné</Text>
                    <Text style={styles.medicinaListItem}>• Combate la Calvicie</Text>
                  </View>
                  <Text style={styles.medicinaTagline}>💖 Una solución avanzada. Un futuro sin dolor.</Text>
                </View>

                <View style={styles.doctorCard}>
                  <Image 
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/0smjbq9dpor1bved8bzdr' }} 
                    style={styles.doctorImage}
                  />
                  <View style={styles.doctorInfo}>
                    <Text style={styles.doctorName}>DRA. MARÍA DEL SOCORRO BURGA DIOS</Text>
                    <Text style={styles.doctorTitle}>Médico Cirujano - Especialista en{"\n"}Medicina Regenerativa y Estética Integral</Text>
                    <Text style={styles.doctorSchedule}>📅 Atención: lunes a sábado previa cita</Text>
                    <Text style={styles.doctorConsulta}>🎉 CONSULTA GRATIS</Text>
                  </View>
                </View>

                <View style={styles.offerCard}>
                  <Image 
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/wfa59m8d3l10vhhqfd95w' }} 
                    style={styles.offerImage}
                  />
                  <View style={styles.offerContent}>
                    <Text style={styles.offerTitle}>Rejuvenecimiento Full Face</Text>
                    <Text style={styles.offerSubtitle}>¡Aprovecha nuestra Oferta:</Text>
                    <Text style={styles.offerPrice}>S/ 999.00!</Text>
                  </View>
                </View>

                <View style={styles.gallerySection}>
                  <Text style={styles.sectionTitle}>Galería de Tratamientos</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
                    <Image 
                      source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/s8nkfzakgp8f4kvugkzd1' }} 
                      style={styles.galleryImage} 
                    />
                    <Image 
                      source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/zmkrnd2spnvs7yb02hbow' }} 
                      style={styles.galleryImage} 
                    />
                    <Image 
                      source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/b1l18y358huzuq5f63uy2' }} 
                      style={styles.galleryImage} 
                    />
                    <Image 
                      source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/zbq89qkf9qu7uq8tp8xgc' }} 
                      style={styles.galleryImage} 
                    />
                  </ScrollView>
                </View>

                <View style={styles.contactSection}>
                  <Text style={styles.sectionTitle}>📍 Ubicación y Contacto</Text>
                  <Text style={styles.addressText}>Av. Antúnez de Mayolo 848 - 3er. piso, Urb. Mercurio{"\n"}(costado de la Municipalidad de Los Olivos)</Text>
                  
                  <View style={styles.contactButtons}>
                    <TouchableOpacity style={styles.contactButton} onPress={handleDirections}>
                      <MapPin size={24} color="#E91E63" />
                      <Text style={styles.contactButtonText}>Ver en Google Maps</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
                      <Text style={styles.emailIcon}>📧</Text>
                      <Text style={styles.contactButtonText}>Email</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.whatsappButtonMedicina} onPress={handleWhatsApp}>
                      <LinearGradient
                        colors={['#25D366', '#128C7E']}
                        style={styles.buttonGradient}
                      >
                        <Text style={styles.whatsappIcon}>💬</Text>
                        <Text style={styles.buttonText}>Solicitar Cita</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </View>


              </View>
            </>
          ) : isRenovaPlus ? (
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
                        <Facebook size={48} color="#1877F2" fill="#1877F2" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={[styles.socialButton, styles.instagramButton]}
                        onPress={() => handleSocialMedia('instagram')}
                        activeOpacity={0.7}
                      >
                        <Instagram size={48} color="#E4405F" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            </>
          ) : isGasLaBala ? (
            <>
              <View style={styles.gasContent}>
                <View style={styles.gasLogosSection}>
                  <View style={styles.gasLogosRow}>
                    <Image 
                      source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/qiljg70fhp105svc725nm' }} 
                      style={styles.gasLogo}
                      resizeMode="contain"
                    />
                    <Image 
                      source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/d8coubsomy0rbiv84qfw2' }} 
                      style={styles.gasLogo}
                      resizeMode="contain"
                    />
                    <Image 
                      source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/6xkeillb7mxovuvnmrwng' }} 
                      style={styles.gasLogo}
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View style={styles.gasAuthSection}>
                  <Text style={styles.gasAuthText}>Autorizado por</Text>
                  <Image 
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/9yjuipw45zw87zchd1pd1' }} 
                    style={styles.osinergminLogo}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.gasInfoCard}>
                  <Text style={styles.gasInfoTitle}>⏰ Horario de atención:</Text>
                  <Text style={styles.gasInfoText}>Lunes a domingo (incluido feriados){"\n"}de 6:30 am. a 10 pm.</Text>
                </View>

                <View style={styles.gasInfoCard}>
                  <Text style={styles.gasInfoTitle}>🔧 Venta de balones vacíos y válvulas</Text>
                  <Image 
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/dbwyvdw6e12hjiq20uu2l' }} 
                    style={styles.valvulaImage}
                    resizeMode="contain"
                  />
                </View>

                <View style={styles.gasPaymentSection}>
                  <Text style={styles.gasPaymentTitle}>Aceptamos</Text>
                  <View style={styles.paymentLogosRow}>
                    <Image 
                      source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Yape_text_app_icon.png/240px-Yape_text_app_icon.png' }} 
                      style={styles.paymentLogo}
                      resizeMode="contain"
                    />
                    <Image 
                      source={{ uri: 'https://seeklogo.com/images/P/plin-logo-969BEDA17C-seeklogo.com.png' }} 
                      style={styles.paymentLogo}
                      resizeMode="contain"
                    />
                  </View>
                </View>

                <View style={styles.gasContactSection}>
                  <Text style={styles.gasContactTitle}>📞 Pedidos y Contacto</Text>
                  <TouchableOpacity style={styles.gasWhatsappButton} onPress={handleWhatsApp}>
                    <LinearGradient
                      colors={['#25D366', '#128C7E']}
                      style={styles.buttonGradient}
                    >
                      <Text style={styles.whatsappIcon}>💬</Text>
                      <Text style={styles.buttonText}>WhatsApp</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={styles.gasPhoneButton} onPress={handleCall}>
                    <Phone size={24} color="#FF6B35" />
                    <Text style={styles.gasPhoneText}>Teléfono</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.gasDeliverySection}>
                  <Image 
                    source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/t0wxzg3okc645x4zhy71g' }} 
                    style={styles.deliveryImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
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
  medicinaNameOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  medicinaName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(233, 30, 99, 0.95)',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    overflow: 'hidden',
    textAlign: 'center',
    lineHeight: 26,
  },
  medicinaHeader: {
    marginBottom: 20,
  },
  medicinaSubtitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: '#E91E63',
    textAlign: 'center',
    marginBottom: 12,
    fontFamily: 'System',
  },
  medicinaSubtitle2: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#C2185B',
    textAlign: 'center',
    fontFamily: 'System',
  },
  medicinaContent: {
    backgroundColor: 'white',
    borderRadius: 16,
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
  medicinaQuestion: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#E91E63',
    marginBottom: 8,
  },
  medicinaText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 16,
  },
  medicinaSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    marginTop: 8,
  },
  medicinaList: {
    marginBottom: 16,
  },
  medicinaListItem: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 28,
    paddingLeft: 8,
  },
  medicinaSolution: {
    backgroundColor: '#FCE4EC',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  medicinaSolutionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C2185B',
    marginBottom: 12,
  },
  medicinaEstheticSection: {
    backgroundColor: '#F3E5F5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  medicinaEstheticTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#7B1FA2',
    marginBottom: 12,
  },
  medicinaTagline: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E91E63',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic' as const,
  },
  doctorCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#E91E63',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  doctorImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  doctorInfo: {
    alignItems: 'center',
  },
  doctorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C2185B',
    textAlign: 'center',
    marginBottom: 8,
  },
  doctorTitle: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 12,
    lineHeight: 22,
  },
  doctorSchedule: {
    fontSize: 16,
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 8,
  },
  doctorConsulta: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E91E63',
    textAlign: 'center',
  },
  offerCard: {
    backgroundColor: '#E91E63',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  offerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  offerContent: {
    padding: 20,
    alignItems: 'center',
  },
  offerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  offerSubtitle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  offerPrice: {
    fontSize: 36,
    fontWeight: 'bold' as const,
    color: '#FFD700',
    textAlign: 'center',
  },
  contactSection: {
    backgroundColor: 'white',
    borderRadius: 16,
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
  addressText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  contactButtons: {
    gap: 12,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E91E63',
    gap: 8,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#E91E63',
  },
  emailIcon: {
    fontSize: 24,
  },
  whatsappButtonMedicina: {
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
    gap: 16,
    justifyContent: 'center',
  },
  socialButton: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  whatsappIcon: {
    fontSize: 20,
  },
  gasHeroImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  gasContent: {
    backgroundColor: 'white',
    borderRadius: 16,
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
  gasLogosSection: {
    marginBottom: 24,
    paddingVertical: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f0f0f0',
  },
  gasLogosRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  gasLogo: {
    width: 90,
    height: 90,
  },
  gasAuthSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  gasAuthText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#2c3e50',
    marginBottom: 12,
  },
  osinergminLogo: {
    width: 150,
    height: 60,
  },
  gasInfoCard: {
    backgroundColor: '#FFF3E0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  gasInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF6B35',
    marginBottom: 8,
  },
  gasInfoText: {
    fontSize: 16,
    color: '#2c3e50',
    lineHeight: 24,
  },
  valvulaImage: {
    width: '100%',
    height: 150,
    marginTop: 12,
  },
  gasPaymentSection: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  gasPaymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 12,
  },
  paymentLogosRow: {
    flexDirection: 'row',
    gap: 24,
    alignItems: 'center',
  },
  paymentLogo: {
    width: 70,
    height: 70,
  },
  gasContactSection: {
    marginBottom: 16,
  },
  gasContactTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 16,
    textAlign: 'center',
  },
  gasWhatsappButton: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  gasPhoneButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B35',
    gap: 8,
  },
  gasPhoneText: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: '#FF6B35',
  },
  gasDeliverySection: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  deliveryImage: {
    width: '100%',
    height: 250,
  },
});
