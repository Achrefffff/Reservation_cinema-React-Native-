import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    FlatList,
    Pressable,
    Alert
  } from "react-native";
  import { FontAwesome } from "@expo/vector-icons";
  import React, { useContext } from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import { Ionicons } from "@expo/vector-icons";
  import { AntDesign } from "@expo/vector-icons";
  import { MoviesCards } from "../Context";
  import { useStripe } from "@stripe/stripe-react-native";
  
  const TheatreScreen = () => {
    const route = useRoute();
    //   console.log(route.params);
    const navigation = useNavigation();
    const { seats, setSeats, occupied } = useContext(MoviesCards);
    const onSeatSelect = (item) => {
      const seatSelected = seats.find((seat) => seat === item);
  
      console.log(seatSelected, "you pressed on");
      if (seatSelected) {
        setSeats(seats.filter((seat) => seat !== item));
      } else {
        setSeats([...seats, item]);
      }
    };
    const displaySeats = [...seats]
    const fee = 1.78;
    const noOfSeats = seats.length;
    const priceValue = noOfSeats * 14;
    const total = seats.length > 0 ? fee + priceValue : 0;
    console.log(total);
    console.log(seats, "seats selected");
    const showSeats = () => {
      return (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {seats.map((seat, index) => (
  
            <Text
              key={index}
              style={{ marginTop: 4, fontSize: 17, paddingHorizontal: 4,color:'#48D1CC' }}>
              {seat}
            </Text>
          ))}
        </View>
      );
    };
    const stripe = useStripe();
    const subscribe = async() => {
      const response = await fetch("http://192.168.1.38:8000/payment", {
        method: "POST",
        body: JSON.stringify({
          amount:Math.floor(total * 100)}),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
      if (!response.ok) return Alert.alert(data.message);
      const clientSecret = data.clientSecret;
      const initSheet = await stripe.initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "achch"
      });
      if (initSheet.error) return Alert.alert(initSheet.error.message);
      const presentSheet = await stripe.presentPaymentSheet({
        clientSecret,
      });
      if (presentSheet.error) return Alert.alert(presentSheet.error.message);
        else{ occupied.push(...seats);
              navigation.navigate("Ticket",{
              name:route.params.name,
              mall:route.params.mall,
            timeSelected:route.params.timeSelected,
            total:total,
            image:route.params.image,
            date:route.params.date,
            selectedSeats:displaySeats,
            priceValue:priceValue,})
      setSeats([]);
      }
    }
    return (
      <SafeAreaView style={{ backgroundColor: 'black'}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: 'black'
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons
              onPress={() => navigation.goBack()}
              style={{ marginLeft: 5 }}
              name="arrow-back"
              size={24}
              color="#48D1CC"
            />
            <View style={{ marginLeft: 6 }}>
              <Text style={{ fontSize: 20, fontWeight: "600", color: '#48D1CC', marginTop: 10 }}>
                {route.params.name}
              </Text>
              <Text
                style={{
                  marginTop: 10,
                  color: "#48D1CC",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                {route.params.mall}
              </Text>
            </View>
          </View>
  
          <AntDesign
            style={{ marginRight: 12 }}
            name="sharealt"
            size={25}
            color="#48D1CC"
          />
        </View>
  
        <Text
          style={{
            textAlign: "center",
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 10,
            color:'#48D1CC',
            
            
            borderRadius:10
          }}
        >
          {route.params.timeSelected}
        </Text>
  
        
        <View style={{ marginTop: 20 }} />
        <FlatList
        style={{backgroundColor:'black'}}
          numColumns={7}
          data={route.params.tableSeats}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => onSeatSelect(item)}
              style={{
                margin: 10,
  
                borderColor: "#48D1CC",
                borderWidth: 1,
  
                borderRadius: 3,
              }}
            >
              {
                seats.includes(item) ? (
                  <Text style={{ backgroundColor: "lightgreen", padding: 8 }}>{item}</Text>
                )
                  :
                  occupied.includes(item) ? (
                    <Text style={{ backgroundColor: "red", padding: 8 }}>{item}</Text>
                  )
                    :
                    (
                      <Text style={{ padding: 8 , color:'white'}}>{item}</Text>
                    )
              }
            </Pressable>
          )}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingLeft: 100,
            marginTop: 20,
            backgroundColor: "black",
            padding: 10,
          }}
        >
          <View>
            <FontAwesome
              style={{ textAlign: "center", marginBottom: 4 }}
              name="square"
              size={24}
              color="lightgreen"
            />
            <Text style={{color:'lightgreen'}}>selectionné</Text>
          </View>
  
          <View style={{ marginHorizontal: 20 }}>
            <FontAwesome
              style={{ textAlign: "center", marginBottom: 4 }}
              name="square"
              size={24}
              color="white"
            />
            <Text style={{color:'white'}}>Libre</Text>
          </View>
  
          <View>
            <FontAwesome
              style={{ textAlign: "center", marginBottom: 4 }}
              name="square"
              size={24}
              color="red"
            />
            <Text style={{color:'red'}}>Occupé</Text>
          </View>
        </View>
  
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 14,
            backgroundColor:'black',
            borderColor:'black',
            borderWidth:2
          }}
        >
          <View style={{ padding: 5 ,}}>
            
  
            {seats.length > 0 ? (
              showSeats()
            ) : (
              <Text style={{ fontSize: 18 ,color:'white'}}>Aucun siége selectionné</Text>
            )}
          </View>
  
          
        </View>
        <Pressable
          style={{
            backgroundColor: "black",
            padding: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginVertical: 20,
            
          }}
        >
          {seats.length > 0 ? (
            <Text style={{ fontSize: 17, fontWeight: "500",color:'#48D1CC' }}>
              {seats.length} siége selectionné
            </Text>
          ) : (
            <Text ></Text>
          )}
  
          <Pressable onPress={subscribe}>
            <Text style={{ fontSize: 17, fontWeight: "bold",backgroundColor:'#48D1CC',color:'white',borderRadius:7,padding:10,}}>Payer {total} €</Text>
          </Pressable>
        </Pressable>
      </SafeAreaView>
    );
  };
  
  export default TheatreScreen;
  
  