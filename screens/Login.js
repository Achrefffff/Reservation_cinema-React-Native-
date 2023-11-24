import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
import { firebase } from '../config';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (email, password) => {
    try {
      const auth = getAuth(firebase);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Se connecter</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => setEmail(email)}
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor="white"
        />
        <TextInput
          style={styles.textInput}
          placeholder="Mot de Passe"
          onChangeText={(password) => setPassword(password)}
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry={true}
          placeholderTextColor="white"
        />
      </View>
      <TouchableOpacity onPress={() => loginUser(email, password)} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.registerText}>Pas De Compte ? Enregistrez Maintenant</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordLink} onPress={() => navigation.navigate('Mdp')}>
        <Text style={styles.forgotPasswordText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 26,
    color: 'white',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  textInput: {
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    textAlign: 'center',
    color:'white'
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
  },
  registerLink: {
    marginTop: 20,
  },
  registerText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  forgotPasswordLink: {
    marginTop: 20,
  },
  forgotPasswordText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
});
