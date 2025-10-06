import React from 'react';
import { TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { MessageCircle } from 'lucide-react-native';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({ 
  phoneNumber = '51987654321',
  message = 'Hola, me gustaría obtener más información sobre El Shopper de Los Olivos Digital'
}: WhatsAppButtonProps) {
  const handlePress = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          console.log('WhatsApp is not installed');
        }
      })
      .catch((err) => console.error('Error opening WhatsApp:', err));
  };

  return (
    <TouchableOpacity
      style={styles.whatsappButton}
      onPress={handlePress}
      activeOpacity={0.8}
      testID="whatsapp-button"
    >
      <MessageCircle size={28} color="white" strokeWidth={2} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  whatsappButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#25D366',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    zIndex: 1000,
  },
});
