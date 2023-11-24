import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import React, { useState } from 'react'
import { firebase } from '../config';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const Mdp = () => {
    const [email, setEmail] = useState('');

    const forgetPassword = () => {
        sendPasswordResetEmail(getAuth(firebase), email)
            .then(() => {
                alert('Un e-mail de réinitialisation de mot de passe a été envoyé à ' + email);
            })
            .catch((error) => {
                alert(error.message);
            });
    };
 return (
        <View style={styles.container}>
            <TextInput
                style={styles.textInput}
                placeholder="Entrez votre adresse e-mail"
                placeholderTextColor="#666" // Couleur du placeholder légèrement plus sombre
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
            />

            <TouchableOpacity
                onPress={forgetPassword}
                style={styles.button}
            >
                <Text style={styles.buttonText}>Réinitialiser le mot de passe</Text>
            </TouchableOpacity>
        </View>
    );
}

export default Mdp;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black',
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
        height: 50,
        width: 220,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        marginTop:15
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'black',
    },
});
