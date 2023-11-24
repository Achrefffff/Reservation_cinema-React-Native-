import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { Text, View } from "react-native";
import { MovieContext } from "./Context";
import Login from "./screens/Login";
import Registration from "./screens/Registration";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { firebase } from "./config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./config";
import HomeScreen from "./screens/HomeScreen";

import MovieScreen from './screens/MovieScreen';
import TheatreScreen from './screens/TheatreScreen';
import TicketScreen from './screens/TicketScreen';
import Mdp from "./screens/Mdp";

const Stack = createNativeStackNavigator();

initializeApp(firebaseConfig, {
  persistence: [AsyncStorage],
});

function App() {
  
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const auth = getAuth(firebase);

    // Écoute les changements d'état de l'utilisateur
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <View>
        <Text>Chargement...</Text>
      </View>
    );
    
  }
  
  return (
    
    <StripeProvider publishableKey="pk_test_51O526JG2004WV3tG6iZRta0NxWCljgWAHbkBGIXMDHPwJHRA6USJAwVobU7ta2uYQBFanEqMFmwTkxH9r4lVMqFv00fILjljiN">
      <MovieContext>
        <NavigationContainer>
          <Stack.Navigator>
            {user ? (
              <>
                 <Stack.Screen name="Home" component={HomeScreen} options={{headerShown:false}}/>
                  <Stack.Screen name="Movies" component={MovieScreen}  options={{headerShown:false}}/>
                  <Stack.Screen name="Theatre" component={TheatreScreen} options={{headerShown:false}}/>
                  <Stack.Screen name="Ticket" component={TicketScreen} options={{headerShown:false}}/>
              </>
            ) : (
              <>
                <Stack.Screen
                  name="Login"
                  component={Login}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Registration"
                  component={Registration}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Mdp"
                  component={Mdp}
                  options={{ headerShown: false }}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </MovieContext>
    </StripeProvider>
  );}

export default App;
