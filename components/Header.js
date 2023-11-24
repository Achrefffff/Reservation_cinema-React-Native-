import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import { getAuth, signOut } from 'firebase/auth';


const Header = () => {
  const navigation = useNavigation();
  const item = {
    name: "Oppenheimer",
    image:
      "https://img.nrj.fr/vQRSQH3sw860h1GXm9hPQYmm16M=/0x450/smart/medias%2F2022%2F12%2Fzso9y3a-1uf2-ij-enl-emexkef9yfdqvm4m4tvhb4i_63a066891a3b2.jpg",
  };
  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erreur lors de la déconnexion :', error.message);
    }
  };

  return (
    <View style={{ marginTop: 30, position: 'relative' }}>
      <View style={{ position: 'absolute', top: 20, right: 10, zIndex: 1 }}>
      <Pressable onPress={handleLogout}>
        <FontAwesome name="power-off" size={35} color="red" />
      </Pressable>
      </View>

      <ImageBackground
        style={{ aspectRatio: 5 / 2, height: 170 }}
        source={{
          uri: "https://parisjetaime.com/data/layout_image/fr-FR/Fauteuils-de-cin%C3%A9ma--630x405--%C2%A9-Fotolia.jpg",
        }}
      >
        <Pressable
        onPress={() => navigation.navigate("Movies", {
          name: item.name,
          image: item.image,
        })}
          style={{
            position: "absolute",
            height: 130,
            backgroundColor: "lightblue",
            padding: 10,
            borderRadius: 6,
            top: 140,
            left: 20,
            width: "82%",
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 14, fontWeight: "500", color: "black" }}>
            Sortie dans une semaine
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <View>
              <Text style={{ fontSize: 16, fontWeight: "bold", color: 'black' }}>
                OPPENHEIMER
              </Text>
              <Text style={{ fontSize: 16, fontWeight: "400", color: "gray", marginTop: 4, }}>
                VR • ENGLISH
              </Text>
            </View>

            <Pressable
              onPress={() => navigation.navigate("Movies", {
                name: item.name,
                image: item.image,
              })}
              style={{ backgroundColor: "white", padding: 10, borderRadius: 6, marginRight: 10 }}
            >
              <Text style={{ fontSize: 14, fontWeight: "500", textAlign: "center", color: 'black' }}>
                Réserver
              </Text>
            </Pressable>
          </View>
          <Text style={{ marginTop: 8, fontSize: 15, fontWeight: "500", color: 'black' }}>
            Thriller, action
          </Text>
        </Pressable>
      </ImageBackground>

      <View style={{ marginTop: 130 }} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
