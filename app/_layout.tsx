import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerBackTitle: "Atrás" }}>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="category/[id]" options={{ headerShown: true }} />
      <Stack.Screen name="business/[id]" options={{ headerShown: true }} />
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  useEffect(() => {
    SplashScreen.hideAsync();
    
    let isMounted = true;
    
    async function loadAndPlaySound() {
      try {
        await Audio.setAudioModeAsync({
          playsInSilentModeIOS: true,
          staysActiveInBackground: true,
          shouldDuckAndroid: true,
        });

        const { sound: audioSound } = await Audio.Sound.createAsync(
          { uri: 'https://drive.google.com/uc?export=download&id=1W12YH0Co_VWhpT9Gnxo7JRgr9Gk0fzqs' },
          { shouldPlay: true, isLooping: true, volume: 0.3 }
        );
        
        if (isMounted) {
          setSound(audioSound);
          console.log('Background music loaded and playing');
        }
      } catch (error) {
        console.error('Error loading background music:', error);
      }
    }

    if (Platform.OS !== 'web') {
      loadAndPlaySound();
    }

    return () => {
      isMounted = false;
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <QueryClientProvider client={queryClient}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootLayoutNav />
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}