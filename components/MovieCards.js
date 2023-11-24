import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Pressable,
    Image,
  } from "react-native";
  import React ,{useContext} from "react";
  import movies from "../data/movies";
  import Header from "./Header";
  import { useNavigation } from "@react-navigation/native";
  import { MoviesCards } from "../Context";
  import TicketComponent from "./TicketComponent";
  const MovieCards = () => {
    const data = movies;
    const navigation = useNavigation();
    const { ticket } = useContext(MoviesCards);
  
    return (
      <View style={{backgroundColor:'black'}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          ListHeaderComponent={ticket.length > 0 ? TicketComponent : Header}
          data={data}
          renderItem={({ item }) => (
            <Pressable style={{ margin: 10, marginHorizontal: 15 }}>
              <Image
                style={{
                  aspectRatio: 2 / 3,
                  height: 230,
                  borderRadius: 15,
                }}
                source={{ uri: item.image }}
              />
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  width: 170,
                  marginTop: 10,
                  color:'white'
                }}
              >
                {item.name.substr(0.16)}
              </Text>
  
              <Text style={{ marginTop: 4, fontSize: 15, color: "lightgray" }}>
                VR • {item.language}
              </Text>
  
              <Text style={{ marginTop: 4, fontSize: 14, fontWeight: "500",color:'white' }}>
                {item.genre}
              </Text>
  
              <Pressable
              onPress={() => navigation.navigate("Movies",{
                  name:item.name,
                  image:item.image,
              })}
                style={{
                  backgroundColor: "#E0FFFF",
                  padding: 10,
                  borderRadius: 6,
                  marginRight: 10,
                  width: 100,
                  marginTop:10,
                }}
              >
                <Text
                  style={{ fontSize: 14, fontWeight: "500", textAlign: "center" }}
                >
                  Réserver
                </Text>
              </Pressable>
            </Pressable>
          )}
        />
      </View>
    );
  };
  
  export default MovieCards;
  
  const styles = StyleSheet.create({});