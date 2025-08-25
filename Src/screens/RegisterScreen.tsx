// src/screens/RegisterScreen.tsx
import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  navigation: any;
};

export default function RegisterScreen({ navigation }: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const onRegister = () => {
    // TODO: ผูกกับ services/authService.registerWithEmail(...)
    // ตอนนี้ทำเป็น UI อย่างเดียว
  };

  const onGoLogin = () => {
    navigation.replace("Login");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.select({ ios: "padding", android: undefined })}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          {/* ===== Top Gradient Header ===== */}
          <LinearGradient
            colors={["#0BB229", "#0A8A1F"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.header}
          >
            <View style={styles.brand}>
              <View style={styles.logoBox}>
                {/* ใส่โลโก้/ไอคอนเช็คที่นี่ได้ */}
              </View>
              <View>
                <Text style={styles.appNameTop}>Habit</Text>
                <Text style={styles.appNameBottom}>Tracker</Text>
              </View>
            </View>
          </LinearGradient>

          {/* ===== Card ===== */}
          <View style={styles.cardWrap}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Register</Text>

              {/* Email */}
              <View style={styles.inputWrap}>
                <View style={styles.iconSlot}>
                  {/* ICON HERE (mail) */}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#b8c2bb"
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                  returnKeyType="next"
                />
              </View>

              {/* Username */}
              <View style={styles.inputWrap}>
                <View style={styles.iconSlot}>
                  {/* ICON HERE (user) */}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Username"
                  placeholderTextColor="#b8c2bb"
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  returnKeyType="next"
                />
              </View>

              {/* Password */}
              <View style={styles.inputWrap}>
                <View style={styles.iconSlot}>
                  {/* ICON HERE (lock) */}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  placeholderTextColor="#b8c2bb"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  returnKeyType="next"
                />
              </View>

              {/* Confirm Password */}
              <View style={styles.inputWrap}>
                <View style={styles.iconSlot}>
                  {/* ICON HERE (lock) */}
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  placeholderTextColor="#b8c2bb"
                  value={confirm}
                  onChangeText={setConfirm}
                  secureTextEntry
                  returnKeyType="done"
                />
              </View>

              {/* Register Button (Gradient) */}
              <Pressable onPress={onRegister} style={{ borderRadius: 14, overflow: "hidden", marginTop: 12 }}>
                <LinearGradient
                  colors={["#19B83A", "#0A8A1F"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  style={styles.primaryBtn}
                >
                  <Text style={styles.primaryBtnText}>Register</Text>
                </LinearGradient>
              </Pressable>

              {/* Sign in Button (outlined/soft) */}
              <Pressable onPress={onGoLogin} style={styles.secondaryBtn}>
                <Text style={styles.secondaryBtnText}>Sign in</Text>
              </Pressable>
            </View>
          </View>

          {/* Bottom soft background */}
          <View style={styles.bottomSoft} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const CARD_RADIUS = 18;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#DBF9E5" },

  header: {
    height: 210,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    paddingHorizontal: 24,
    justifyContent: "flex-end",
    paddingBottom: 18,
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },

  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },

  appNameTop: {
    color: "white",
    fontSize: 28,
    fontWeight: "800",
    lineHeight: 28,
  },
  appNameBottom: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
  },

  cardWrap: {
    marginTop: -40,
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: "#CBE8D2",
    borderRadius: CARD_RADIUS,
    padding: 16,
    borderWidth: 2,
    borderColor: "#E9FAEF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#2B5132",
    marginBottom: 12,
  },

  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 14,
    paddingHorizontal: 12,
    height: 50,
    marginBottom: 12,
  },

  iconSlot: {
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    // คุณจะวาง <Icon .../> ตรงนี้ได้เลย
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#1d2b22",
  },

  primaryBtn: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
  },
  primaryBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "800",
  },

  secondaryBtn: {
    height: 52,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    marginTop: 10,
    backgroundColor: "#B9E0C1",
  },
  secondaryBtnText: {
    color: "#0A8A1F",
    fontSize: 18,
    fontWeight: "800",
  },

  bottomSoft: {
    height: 40,
  },
});
