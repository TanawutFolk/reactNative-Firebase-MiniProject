import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  const onRegister = () => {
    // TODO: เชื่อมกับ authService.registerWithEmail(...)
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.root}>
        <LinearGradient
          colors={['#064D00', '#0EB300']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.9 }}
          style={styles.headerBg}
        />

        <View style={styles.scroll}>
          <Text style={styles.welcome}>Create Account</Text>
          <View style={styles.logoCard}>
            <Image
              source={require('../../assets/appLogo.png')}
              style={styles.logoImage}
            />
          </View>

          {/* Register Block */}
          <View style={styles.cardWrapper}>
            <View style={styles.card}>
              <Text style={styles.title}>Register</Text>

              {/* Email */}
              <View style={styles.inputRow}>
                <View style={styles.iconPlaceholder} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor="#7aa07a"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                />
              </View>

              {/* Username */}
              <View style={styles.inputRow}>
                <View style={styles.iconPlaceholder} />
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#7aa07a"
                  autoCapitalize="none"
                  value={username}
                  onChangeText={setUsername}
                />
              </View>

              {/* Password */}
              <View style={styles.inputRow}>
                <View style={styles.iconPlaceholder} />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#7aa07a"
                  secureTextEntry
                  value={password}
                  onChangeText={setPassword}
                />
              </View>

              {/* Confirm Password */}
              <View style={styles.inputRow}>
                <View style={styles.iconPlaceholder} />
                <TextInput
                  style={styles.input}
                  placeholder="Confirm Password"
                  placeholderTextColor="#7aa07a"
                  secureTextEntry
                  value={confirm}
                  onChangeText={setConfirm}
                />
              </View>

              {/* Register Button */}
              <LinearGradient
                colors={['#34C759', '#1EA84A', '#0D7B2E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.actionBtn}
              >
                <Pressable style={styles.actionBtnPressable} onPress={onRegister}>
                  <Text style={styles.actionBtnText}>Register</Text>
                </Pressable>
              </LinearGradient>

              {/* Already have account */}
              <View style={styles.loginRow}>
                <Text style={styles.loginHint}>Already have an account?</Text>
                <Pressable onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.loginLink}> Sign in</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#E3F8E6',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight || 0) : 0,
  },
  root: { flex: 1 },
  headerBg: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '47%',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  scroll: { paddingBottom: 40 },
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
  logoImage: { width: 100, height: 60 },
  cardWrapper: {
    paddingHorizontal: 18,
    marginTop: 22,
  },
  card: {
    backgroundColor: '#AED7AB',
    borderRadius: 28,
    padding: 20,
    borderWidth: 10,
    borderColor: '#ffffff',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: { elevation: 10 },
    }),
  },
  title: {
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
    height: 44,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 12,
  },
  iconPlaceholder: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#3CB371',
    marginRight: 10,
  },
  input: { flex: 1, fontSize: 16, color: '#153E15' },
  actionBtn: {
    borderRadius: 24,
    height: 48,
    width: '90%',   // ✅ ปุ่มสั้นลงตามช่อง input
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  actionBtnPressable: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionBtnText: {
    color: '#ffffff',
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 0.2,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowRadius: 4,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 12,
  },
  loginHint: { color: '#2B4B2B' },
  loginLink: {
    color: '#1E7CC1',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
