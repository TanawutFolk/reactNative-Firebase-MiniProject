import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
// If you use Expo, install: expo install expo-linear-gradient
// Bare RN: yarn add react-native-linear-gradient && npx pod-install
import { LinearGradient } from 'expo-linear-gradient'; // or: import LinearGradient from 'react-native-linear-gradient';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <LinearGradient
          colors={["#064D00","#0EB300"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.9 }}
          style={styles.headerBg}
        />

        <View style={styles.scroll}>
          <Text style={styles.welcome}>Welcome</Text>

          {/* Logo / App mark area (you will place your own image here) */}
          <View style={styles.logoCard}>
            {/* Replace this box with <Image source={...}/> and keep the same style */}
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoText}>Habit{"\n"}Tracker</Text>
            </View>
          </View>

          {/* Sign in Block */}
          <View style={styles.signinCardWrapper}>
            <View style={styles.signinCard}>
              <Text style={styles.signinTitle}>Sigh in</Text>

              {/* Email field row (icon will be your image) */}
              <View style={styles.inputRow}>
                <View style={styles.iconPlaceholder} />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#7aa07a"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Password field row (icon will be your image) */}
              <View style={[styles.inputRow, { marginTop: 14 }]}>
                <View style={styles.iconPlaceholder} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#7aa07a"
                  secureTextEntry
                />
              </View>

              <Pressable style={styles.forgotBtn} onPress={() => {}}>
                <Text style={styles.forgotText}>Forgot Password</Text>
              </Pressable>

              <LinearGradient
                colors={["#34C759", "#1EA84A", "#0D7B2E"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.loginBtn}
              >
                <Pressable style={styles.loginBtnPressable} onPress={() => {}}>
                  <Text style={styles.loginText}>Login</Text>
                </Pressable>
              </LinearGradient>

              <View style={styles.registerRow}>
                <Text style={styles.registerHint}>Don’t have an accout?</Text>
                <Pressable onPress={() => {}}>
                  <Text style={styles.registerLink}> Register</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CARD_BG = "rgba(255,255,255,0.65)"; // glassy light card

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3F8E6', // pale green base to match lower area
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
  },
  root: {
    flex: 1,
  },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scroll: {
    paddingBottom: 40,
  },
  welcome: {
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: '700',
    marginTop: 55,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  logoCard: {
    alignSelf: 'center',
    marginTop: 24,
    width: 220,
    height: 120,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  logoPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  logoText: {
    color: '#ffffff',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 36,
  },
  signinCardWrapper: {
    paddingHorizontal: 18,
    marginTop: 12,
  },
  signinCard: {
    backgroundColor: CARD_BG,
    borderRadius: 18,
    padding: 16,
    paddingTop: 18,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.18,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 6 },
    }),
  },
  signinTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    textShadowColor: 'rgba(0,0,0,0.15)',
    textShadowRadius: 6,
    marginBottom: 14,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 48,
  },
  iconPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#3CB371', // placeholder circle where you drop your icon image
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#153E15',
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginTop: 8,
    marginBottom: 8,
  },
  forgotText: {
    color: '#1E7CC1',
    fontWeight: '700',
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  loginBtn: {
    borderRadius: 24,
    height: 48,
    justifyContent: 'center',
  },
  loginBtnPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowRadius: 4,
  },
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
  registerHint: {
    color: '#2B4B2B',
  },
  registerLink: {
    color: '#1E7CC1',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
