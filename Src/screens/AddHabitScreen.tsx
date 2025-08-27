import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Animated, // Import Animated API
  Easing,     // Import Easing for smooth animations
  Modal,      // Import Modal for the tooltip
  TouchableWithoutFeedback, // To detect taps outside the tooltip
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Expo's built-in icons
// Make sure you have run: npx expo install expo-linear-gradient
import { LinearGradient } from 'expo-linear-gradient';
// Make sure you have run: npx expo install expo-haptics
import * as Haptics from 'expo-haptics';

// Create an Animated version of the LinearGradient component
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

// --- Custom Hook for Typing Animation with Blinking Cursor ---
const useTypingAnimation = (phrases, typeSpeed = 150, deleteSpeed = 100, delay = 1000) => {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  // Blinking cursor effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const handleTyping = () => {
      const currentPhrase = phrases[phraseIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setText(currentPhrase.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
      } else {
        if (charIndex < currentPhrase.length) {
          setText(currentPhrase.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const typingTimeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);
    return () => clearTimeout(typingTimeout);
  }, [text, isDeleting, charIndex, phraseIndex, phrases, typeSpeed, deleteSpeed, delay]);

  return `${text}${showCursor ? '|' : ''}`;
};


// This is the main component for the screen
export default function AddHabitScreen({ navigation }) {
  // State to hold the values from the input fields
  const [title, setTitle] = useState('');
  const [motivation, setMotivation] = useState('');

  // State for Custom Time Picker
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(15);
  const [period, setPeriod] = useState('PM');

  // --- State for Tooltip ---
  const [isTooltipVisible, setTooltipVisible] = useState(false);

  // --- Ref for press and hold interval ---
  const intervalRef = useRef(null);

  // --- Animation Setup ---
  const gradientAnimatedValue = useRef(new Animated.Value(0)).current;
  const cardAnimatedValue = useRef(new Animated.Value(0)).current; // For card entrance animation

  // --- Placeholder Animation Setup ---
  const titlePlaceholders = ["e.g., Reading a book", "e.g., Go for a run", "e.g., Drink 8 glasses of water"];
  const motivationPlaceholders = ["e.g., To learn something new", "e.g., For a healthy body", "e.g., To stay hydrated"];
  const animatedTitlePlaceholder = useTypingAnimation(titlePlaceholders);
  const animatedMotivationPlaceholder = useTypingAnimation(motivationPlaceholders);

  useEffect(() => {
    // Start gradient animation loop
    Animated.loop(
      Animated.timing(gradientAnimatedValue, { toValue: 1, duration: 3000, easing: Easing.linear, useNativeDriver: false })
    ).start();

    // Start card entrance animation
    Animated.timing(cardAnimatedValue, { toValue: 1, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true }).start();

    // Cleanup interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Interpolate values for gradient animation
  const startX = gradientAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [-0.2, 1.2] });
  const endX = gradientAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [0.2, 2.2] });

  // Interpolate values for card entrance animation
  const cardTranslateY = cardAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [50, 0] });
  const cardOpacity = cardAnimatedValue.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  // Initialize time
  useEffect(() => {
    const now = new Date();
    let currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    let currentPeriod = 'AM';
    if (currentHour >= 12) {
      currentPeriod = 'PM';
      if (currentHour > 12) currentHour -= 12;
    }
    if (currentHour === 0) currentHour = 12;
    setHour(currentHour);
    setMinute(currentMinute);
    setPeriod(currentPeriod);
  }, []);

  // --- Functions to handle time changes with haptics ---
  const handleTimeChange = (setter, amount, value, min, max, circular = false) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    let newValue = value + amount;
    if (circular) {
      if (newValue > max) newValue = min;
      if (newValue < min) newValue = max;
    } else {
      newValue = Math.max(min, Math.min(max, newValue));
    }
    setter(newValue);
  };

  // --- New functions for press and hold ---
  const startChangingTime = (setter, amount, value, min, max, circular = false) => {
    // Change time immediately on first press
    handleTimeChange(setter, amount, value, min, max, circular);
    // Then set an interval to keep changing it
    intervalRef.current = setInterval(() => {
      // We need to use the setter's callback form to get the latest state value inside an interval
      setter(currentValue => {
          let newValue = currentValue + amount;
          if (circular) {
              if (newValue > max) newValue = min;
              if (newValue < min) newValue = max;
          } else {
              newValue = Math.max(min, Math.min(max, newValue));
          }
          return newValue;
      });
    }, 150); // Change time every 150ms
  };

  const stopChangingTime = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  };

  const togglePeriod = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPeriod(period === 'AM' ? 'PM' : 'AM');
  };

  const formatNumber = (num) => num.toString().padStart(2, '0');

  const handleAddHabit = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const formattedTime = `${formatNumber(hour)}:${formatNumber(minute)} ${period}`;
    console.log('Habit Title:', title);
    console.log('Motivation:', motivation);
    console.log('Time:', formattedTime);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Tooltip Modal --- */}
      <Modal
        transparent={true}
        visible={isTooltipVisible}
        animationType="fade"
        onRequestClose={() => setTooltipVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setTooltipVisible(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.tooltipContainer}>
              <Text style={styles.tooltipText}>
                ตั้งเวลาเพื่อรับการแจ้งเตือนสำหรับ Habit ของคุณในแต่ละวัน
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="chevron-back" size={32} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Habit</Text>
      </View>

      <Animated.View style={[styles.card, { opacity: cardOpacity, transform: [{ translateY: cardTranslateY }] }]}>
        <Text style={styles.label}>Habit Title</Text>
        <TextInput
          style={styles.input}
          placeholder={animatedTitlePlaceholder}
          placeholderTextColor="#A5D6A7"
          value={title}
          onChangeText={setTitle}
        />

        <Text style={styles.label}>Motivations</Text>
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder={animatedMotivationPlaceholder}
          placeholderTextColor="#A5D6A7"
          multiline
          numberOfLines={4}
          value={motivation}
          onChangeText={setMotivation}
        />

        {/* --- Label with Help Icon --- */}
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Time notification</Text>
          <TouchableOpacity onPress={() => setTooltipVisible(true)}>
            <Ionicons name="help-circle-outline" size={22} color="black" style={styles.helpIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.timePickerContainer}>
            <View style={styles.timeColumn}>
                <TouchableOpacity
                  onPressIn={() => startChangingTime(setHour, 1, hour, 1, 12, true)}
                  onPressOut={stopChangingTime}
                >
                    <Ionicons name="chevron-up" size={32} color="#1B5E20" />
                </TouchableOpacity>
                <Text style={styles.timeText}>{formatNumber(hour)}</Text>
                <TouchableOpacity
                  onPressIn={() => startChangingTime(setHour, -1, hour, 1, 12, true)}
                  onPressOut={stopChangingTime}
                >
                    <Ionicons name="chevron-down" size={32} color="#1B5E20" />
                </TouchableOpacity>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeColumn}>
                <TouchableOpacity
                  onPressIn={() => startChangingTime(setMinute, 1, minute, 0, 59, true)}
                  onPressOut={stopChangingTime}
                >
                    <Ionicons name="chevron-up" size={32} color="#1B5E20" />
                </TouchableOpacity>
                <Text style={styles.timeText}>{formatNumber(minute)}</Text>
                <TouchableOpacity
                  onPressIn={() => startChangingTime(setMinute, -1, minute, 0, 59, true)}
                  onPressOut={stopChangingTime}
                >
                    <Ionicons name="chevron-down" size={32} color="#1B5E20" />
                </TouchableOpacity>
            </View>
            <Text style={styles.timeSeparator}>:</Text>
            <View style={styles.timeColumn}>
                <TouchableOpacity onPress={togglePeriod}>
                    <Ionicons name="chevron-up" size={32} color="#1B5E20" />
                </TouchableOpacity>
                <Text style={styles.timeText}>{period}</Text>
                <TouchableOpacity onPress={togglePeriod}>
                    <Ionicons name="chevron-down" size={32} color="#1B5E20" />
                </TouchableOpacity>
            </View>
        </View>

        <TouchableOpacity style={styles.addButtonWrapper} onPress={handleAddHabit}>
          <AnimatedLinearGradient
            colors={['#4CAF50', '#81C784', '#4CAF50']}
            style={styles.addButton}
            start={{ x: startX, y: 0 }}
            end={{ x: endX, y: 1 }}
          >
            <Text style={styles.addButtonText}>Add Habit</Text>
          </AnimatedLinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

// StyleSheet for all the components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    paddingBottom: 15,
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 50,
  },
  headerTitle: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#E8F5E9',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 20,
    padding: 25,
    flex: 1,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 8,
  },
  label: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  // --- New Styles for Label with Icon ---
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  helpIcon: {
    marginLeft: 8,
    marginBottom: 8,
  },
  // --- New Styles for Tooltip Modal ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tooltipContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 40,
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  tooltipText: {
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#388E3C',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: 'white',
    marginBottom: 20,
  },
  multilineInput: {
    height: 120,
    textAlignVertical: 'top',
  },
  timePickerContainer: {
    backgroundColor: '#388E3C',
    borderRadius: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeColumn: {
    alignItems: 'center',
    marginHorizontal: 10,
  },
  timeText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  timeSeparator: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  addButtonWrapper: {
    marginTop: 30,
    borderRadius: 50,
    overflow: 'hidden',
    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Elevation for Android
    elevation: 5,
  },
  addButton: {
    borderRadius: 50,
    paddingVertical: 18,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
