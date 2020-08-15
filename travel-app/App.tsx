import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider} from "react-native-paper"

//SCREENS
import { Places } from "./src/screens"


// APOLLO CLIENT
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from "./graphql"


const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3498db',
    accent: '#f1c40f',
  },
}



export default function App() {
  return (
  <PaperProvider theme={theme}>
    <ApolloProvider client={apolloClient}>

    <View style={styles.container}>
      <Places />
    </View>

    </ApolloProvider>
  </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 40
  },
});
