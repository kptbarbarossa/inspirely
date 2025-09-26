
import React, { useState } from 'react';
import { Text, View, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { commonStyles, colors } from '../styles/commonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const motivationalQuotes = [
  "The only way to do great work is to love what you do.",
  "Life is what happens to you while you're busy making other plans.",
  "The future belongs to those who believe in the beauty of their dreams.",
  "It is during our darkest moments that we must focus to see the light.",
  "The only impossible journey is the one you never begin.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "The way to get started is to quit talking and begin doing.",
  "Don't let yesterday take up too much of today.",
  "You learn more from failure than from success. Don't let it stop you.",
  "It's not whether you get knocked down, it's whether you get up.",
  "If you are working on something that you really care about, you don't have to be pushed.",
  "People who are crazy enough to think they can change the world, are the ones who do.",
  "Failure will never overtake me if my determination to succeed is strong enough.",
  "We generate fears while we sit. We overcome them by action.",
  "Whether you think you can or you think you can't, you're right.",
  "Security is mostly a superstition. Life is either a daring adventure or nothing.",
  "The only person you are destined to become is the person you decide to be.",
  "Go confidently in the direction of your dreams.",
  "When you have a dream, you've got to grab it and never let go.",
  "I can't change the direction of the wind, but I can adjust my sails.",
  "No matter what you're going through, there's a light at the end of the tunnel.",
  "It is our attitude at the beginning of a difficult task which will affect its outcome.",
  "Life is like riding a bicycle. To keep your balance, you must keep moving.",
  "Just don't give up trying to do what you really want to do.",
  "Limit your 'always' and your 'nevers'.",
  "You are never too old to set another goal or to dream a new dream.",
  "Try to be a rainbow in someone else's cloud.",
  "You do not find the happy life. You make it.",
  "Inspiration comes from within yourself. One has to be positive.",
  "Sometimes you will never know the value of a moment until it becomes a memory."
];

const { width, height } = Dimensions.get('window');

export default function MainScreen() {
  const [currentQuote, setCurrentQuote] = useState("Tap the button for inspiration!");
  const [buttonScale] = useState(new Animated.Value(1));

  const handleButtonPress = () => {
    console.log('Button pressed - generating new quote');
    
    // Haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Button animation
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Get random quote
    const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
    const newQuote = motivationalQuotes[randomIndex];
    setCurrentQuote(newQuote);
    console.log('New quote selected:', newQuote);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Quote Display Area */}
        <View style={styles.quoteContainer}>
          <Text style={styles.quoteText}>{currentQuote}</Text>
        </View>

        {/* Large Button */}
        <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
          <TouchableOpacity 
            style={styles.button} 
            onPress={handleButtonPress}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Get Inspired</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  quoteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  quoteText: {
    fontSize: 24,
    fontWeight: '300',
    color: '#2c3e50',
    textAlign: 'center',
    lineHeight: 36,
    letterSpacing: 0.5,
  },
  button: {
    backgroundColor: '#3498db',
    width: width * 0.6,
    height: width * 0.6,
    borderRadius: (width * 0.6) / 2,
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: '0px 8px 20px rgba(52, 152, 219, 0.3)',
    elevation: 8,
    marginBottom: 100,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '600',
    textAlign: 'center',
  },
});
