import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RealToDollar from './screens/RealToDollar';
import RealToEuro from './screens/RealToEuro';
import RealToBitcoin from './screens/RealToBitcoin';

const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Dollar" component={RealToDollar} />
        <Tab.Screen name="Euro" component={RealToEuro} />
        <Tab.Screen name="Bitcoin" component={RealToBitcoin} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
