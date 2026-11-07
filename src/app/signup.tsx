import { useRouter } from 'expo-router';
import { MotiView } from 'moti';
import { useState } from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ThemeToggle from '../components/ThemeToggle';
import { useAuth } from '../context/AuthContext';

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const { signUp } = useAuth();
  const router = useRouter();

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      setErrorMsg('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    try {
      setErrorMsg('');
      setLoading(true);
      await signUp(email.trim(), password);
      alert('Registration successful!');
    } catch (err: any) {
      setErrorMsg(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1 bg-slate-50 dark:bg-[#090D16] justify-center px-6">
      <View className="absolute top-12 right-6">
        <ThemeToggle />
      </View>

      <MotiView from={{ opacity: 0, translateY: -30 }} animate={{ opacity: 1, translateY: 0 }} transition={{ type: 'spring', damping: 12 }} className="mb-6">
        <Text className="text-3xl font-extrabold text-slate-900 dark:text-white text-center">Create Account</Text>
        <Text className="text-sm text-slate-500 dark:text-slate-400 text-center mt-2">Join us and secure your digital workspace</Text>
      </MotiView>

      {errorMsg ? (
        <MotiView from={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
          <Text className="text-red-500 text-center text-sm font-medium">{errorMsg}</Text>
        </MotiView>
      ) : null}

      <View className="space-y-4">
        <View>
          <Text className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wider">Email</Text>
          <TextInput placeholder="name@example.com" placeholderTextColor="#94A3B8" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" className="w-full px-4 py-3.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white shadow-sm" />
        </View>

        <View className="mt-4">
          <Text className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wider">Password (Min 8 Chars)</Text>
          <TextInput placeholder="••••••••" placeholderTextColor="#94A3B8" value={password} onChangeText={setPassword} secureTextEntry className="w-full px-4 py-3.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white shadow-sm" />
        </View>

        <View className="mt-4">
          <Text className="text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1 ml-1 uppercase tracking-wider">Confirm Password</Text>
          <TextInput placeholder="••••••••" placeholderTextColor="#94A3B8" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry className="w-full px-4 py-3.5 bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-2xl text-slate-900 dark:text-white shadow-sm" />
        </View>

        <TouchableOpacity onPress={handleSignUp} disabled={loading} activeOpacity={0.85} className="w-full mt-6 py-4 bg-indigo-600 dark:bg-indigo-500 rounded-2xl items-center shadow-lg shadow-indigo-500/30">
          {loading ? <ActivityIndicator color="#fff" /> : <Text className="text-white font-bold text-base tracking-wide">Sign Up</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()} className="mt-4 items-center">
          <Text className="text-slate-600 dark:text-slate-400 text-sm">Already have an account? <Text className="text-indigo-600 dark:text-indigo-400 font-bold">Sign In</Text></Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}