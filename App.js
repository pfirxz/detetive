import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CadastroSuspeito from './CadastroSuspeito';
import ListagemSuspeitos from './ListagemSuspeitos';
import DetalhesSuspeito from './DetalhesSuspeito';
import EditarSuspeito from './EditarSuspeito';
import Evidencias from './Evidencias';
import MapScreen from './MapScreen';
import RecorderScreen from './RecorderScreen'; // Importe a nova página de gravação

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeTabs = () => (
  <Tab.Navigator>
    <Tab.Screen name="ListagemSuspeitos" component={ListagemSuspeitos} />
    <Tab.Screen name="CadastroSuspeito" component={CadastroSuspeito} />
    <Tab.Screen
      name="Evidencias"
      component={Evidencias}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="book" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Mapa"
      component={MapScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="magnify" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Gravação"
      component={RecorderScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="microphone" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen name="DetalhesSuspeito" component={DetalhesSuspeito} />
      <Stack.Screen name="EditarSuspeito" component={EditarSuspeito} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;


