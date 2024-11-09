import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import DetailScreen2 from './screens/DetailScreen2';
import BookDetailScreen from './screens/BookDetailScreen';
import {StoryProvider} from './context/StoryContext';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <StoryProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{title: 'Home'}}
          />
          <Stack.Screen
            name="Detail"
            component={DetailScreen2}
            options={{title: 'Book List'}}
          />
          <Stack.Screen name="BookDetail" component={BookDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoryProvider>
  );
}

export default App;