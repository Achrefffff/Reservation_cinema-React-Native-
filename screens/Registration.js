import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { doc, setDoc } from 'firebase/firestore'
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'
const Registration = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const registerUser = async () => {
    const auth = getAuth();
    const db = getFirestore();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: `${firstName} ${lastName}`,
      });
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        firstName: firstName,
        lastName: lastName,
        email: email});
      await sendEmailVerification(auth.currentUser);
        alert('Le lien de vérification par e-mail a été envoyé à ' + email);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enregistrez-vous ici ..</Text>
      <View style={styles.inputContainer}>
        <TextInput 
        style={styles.textInput} placeholder='Prénom'  placeholderTextColor='white' autoCorrect={false}
        onChangeText={(firstName) => setFirstName(firstName)}/>
        <TextInput
        style={styles.textInput} placeholder='Nom' placeholderTextColor='white' autoCorrect={false}
        onChangeText={(lastName) => setLastName(lastName)} />
        <TextInput
          style={styles.textInput} placeholder='E-mail' placeholderTextColor='white' autoCapitalize='none'  autoCorrect={false}
          onChangeText={(email) => setEmail(email)}
          keyboardType='email-address'/>
        <TextInput
          style={styles.textInput} placeholder='Mot de passe' placeholderTextColor='white' autoCapitalize='none'
          onChangeText={(password) => setPassword(password)}
          autoCorrect={false}
          secureTextEntry={true}/>
        </View>
      <TouchableOpacity
        onPress={registerUser}
        style={styles.button}>
          <Text style={styles.buttonText}>Enregistrez-vous</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 23,
    color: 'white',
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 40,
  },
  textInput: {
    paddingTop: 20,
    paddingBottom: 10,
    width: 400,
    fontSize: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 10,
    textAlign: 'center',
    color: 'white',
  },
  button: {
    marginTop: 50,
    height: 70,
    width: 250,
    backgroundColor: '#026efd',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor:'white',
    borderWidth:1,
    borderColor:'white'
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: 'black',
  },
});

export default Registration;
