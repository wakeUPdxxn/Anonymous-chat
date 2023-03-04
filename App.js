import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  Button,
  TouchableHighlight
} from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Button style={styles.searchButton}
        color='#dddded'
        backgroundColor='#3a3de0'
        title="Найти собеседника"
        onPress={() => FindСompanion()}/>
    </View>
  );
}

function FindСompanion(){

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchButton: {
    backgroundColor: '#3a3de0',
    color: '#dddded',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',      
 }
});
