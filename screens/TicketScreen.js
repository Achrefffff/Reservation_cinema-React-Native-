
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    Pressable,
  } from "react-native";
  import React ,{useEffect,useContext} from "react";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import moment from "moment";
  import SvgQRCode from "react-native-qrcode-svg";
  import { AntDesign } from '@expo/vector-icons';
  import { MoviesCards } from "../Context";
  import * as Print from "expo-print";
  import * as Sharing from "expo-sharing"

  const TicketScreen = () => {
    const navigation = useNavigation();
    const { ticket } = useContext(MoviesCards);
    const route = useRoute();
    const ticketDetails = route.params;
    const downloadTicket = async () => {
      try {
        const ticketData = {
          name: route.params.name,
          selectedSeats: route.params.selectedSeats.join(', '),
          timeSelected: route.params.timeSelected,
          date: moment(route.params.date).utc().format("DD/MM/YYYY"),
          mall:route.params.mall
          
        };
        const ticketHTML = `
        <html>
          <head>
            <style>
              body {font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
                    text-align: center;
                    background-color: #f0f0f0;}
              .ticket {
                border: 2px solid #000;
                padding: 20px;
                max-width: 300px;
                margin: 0 auto;
                background-color: #fff;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                border-radius: 5px;
              }
              h1 {font-size: 24px;
                margin-bottom: 10px;
                color: #333;
              }
              p {
                font-size: 16px;
                margin: 5px 0;
                color: #555;
              } .info {font-size: 18px; margin-top: 15px;  color: #ff5733;}
              </style>
          </head>
          <body>
            <div class="ticket">
              <h1>Nom du film: ${ticketData.name}</h1>
              <p>Sièges sélectionnés: ${ticketData.selectedSeats}</p>
              <p>Date et heure: ${ticketData.timeSelected}, ${ticketData.date}</p>
              <h1> ${ticketData.mall}</h1>
              <p class="info">Cinéma XYZ</p>
            </div>
          </body>
        </html> `;
      
        const { uri } = await Print.printToFileAsync({ html: ticketHTML });
        Sharing.shareAsync(uri);
      } catch (error) {
        console.error('Erreur lors du téléchargement du billet :', error);
      }
    };
  
    useEffect(() => {
      const loadTicket = () => {
        ticket.push(ticketDetails);
      }
      loadTicket();
    },[])
    console.log(route.params.selectedSeats.length);
    return (
      <SafeAreaView style={{backgroundColor:'black', marginTop:26}}> 
        <View
          style={{
            backgroundColor: "white",
            height: "90%",
            margin: 10,
            borderRadius: 6,
          }}
          
      
        >
          
          <View
            style={{
              padding: 10,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            
            <Text style={{ fontSize: 16, fontWeight: "900" ,color:'black'}}>
              {route.params.name}
              
            </Text>
           
            <Text style={{color:'black',fontWeight: "900"}}>{route.params.selectedSeats.length}</Text>
             <AntDesign name="download" size={24} color='black' onPress={downloadTicket} />
          </View>
  
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginHorizontal: 10,
            }}
          >
           
  
            <Text style={{ color: "black", fontSize: 25 }}>Ton TICKET</Text>
          </View>
  
          <Text
            style={{
              fontSize: 15,
              fontWeight: "600",
              marginHorizontal: 10,
              marginTop: 9,
              color: "black"
            }}
          >
            {route.params.mall}
          </Text>
  
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "black",
              height: 0.5,
              borderWidth: 1.5,
              margin: 10,
            }}
          />
  
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ marginTop: 10, marginLeft: 10 }}>
              <Text style={{ color: "black", fontSize: 15, fontWeight: "500" }}>
                DATE & HEURE
              </Text>
              <Text style={{ marginVertical: 4, fontSize: 16 , color: "black"}}>
                {route.params.timeSelected}
              </Text>
              <Text style={{ color: "black"}}>{moment(route.params.date).utc().format("DD/MM/YYYY")}</Text>
            </View>
  
            <Image
              style={{ aspectRatio: 4 / 2, height: 80, borderRadius: 6, marginRight:20 }}
              source={{ uri: route.params.image }}
            />
          </View>
  
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "black",
              height: 0.5,
              borderWidth: 1.5,
              margin: 10,
            }}
          />
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            
  
            <View style={{marginLeft:50}}>
              <Text style={{ color: "black"}}>TICKETS</Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "bold",
                  marginTop: 6,
                  color:'black'
                }}
              >
                {route.params.selectedSeats.length}
              </Text>
            </View>
  
            <View style={{ marginRight: 50
             }}>
              <Text style={{ color: "black"}}>SIEGES</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {route.params.selectedSeats.map((item, index) => (
                  <Text
                    key={index}
                    style={{
                      margin: 3,
                      fontSize: 15,
                      fontWeight: "bold",
                      marginTop: 6,
                      color: "black"
                    }}
                  >
                    {item}
                  </Text>
                ))}
              </View>
            </View>
          </View>
  
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "black",
              height: 0.5,
              borderWidth: 1.5,
              margin: 10,
            }}
          />
  
          <View
            style={{
              height: 140,
              backgroundColor: "#DCDCDC",
              borderRadius: 6,
              margin: 10,
            }}
          >
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: "black" }}>
                Prix
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ color: "white", fontSize: 16, fontWeight: "500" , color: "black"}}>
                  prix siéges
                </Text>
                <Text style={{ color: "white", fontSize: 16, fontWeight: "500" , color: "black"}}>
                €{route.params.priceValue}
                </Text>
              </View>
  
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{  color: "black", fontSize: 16, fontWeight: "500" }}>
                   taxe
                </Text>
                <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                1.78
                </Text>
              </View>
  
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                   Total à payer
                </Text>
                <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                €{route.params.total}
                </Text>
              </View>
  
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 4,
                }}
              >
                <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                  ID 
                </Text>
                <Text style={{ color: "black", fontSize: 16, fontWeight: "500" }}>
                  FGSJSDN3493943
                </Text>
              </View>
            </View>
          </View>
  
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "black",
              height: 0.5,
              borderWidth: 1.5,
              margin: 10,
            }}
          />
  
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
              marginBottom: 20,
            }}
          >
            <SvgQRCode value={"hello"} />
          </View>
  
          <Text style={{ fontSize: 16, fontWeight: "500", textAlign: "center" }}>
            W33JNK3
          </Text>
          <Text
            style={{
              borderRadius: 1,
              borderStyle: "dashed",
              borderColor: "black",
              height: 0.5,
              borderWidth: 1.5,
              margin: 10,
            }}
          />
        </View>
        <Pressable
        onPress={() => navigation.navigate("Home")}
          style={{
            backgroundColor: "white",
            marginLeft: "auto",
            marginRight: "auto",
            width: 120,
            borderRadius: 4,
            padding:10,
          }}
        >
          <Text style={{textAlign:"center",color:"black",fontSize:15}}>Accueil</Text>
        </Pressable>
      </SafeAreaView>
    );
  };
  
  export default TicketScreen;
  
  const styles = StyleSheet.create({});