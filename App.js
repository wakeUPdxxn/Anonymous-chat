import React, { useRef } from 'react';
import { StyleSheet, Text,TextInput, View, TouchableOpacity} from 'react-native';
import { useState,useEffect} from 'react';

let ws=new WebSocket("ws://localhost:2323");
let nickValidationResult

export default function App() {
  const [membersCount, setMembersCount] = useState(0);
  useEffect(() => {
    const getMembersCount =async()=> {
      try {
        const response = await fetch(
          'http://wmessage.ddns.net:3232/api/members',{
            method: 'GET',
          });
        const json = await response.json();
        const membersCount=JSON.stringify(json);
        setMembersCount(membersCount);
      } catch (error) {
        console.error(error);
      }
    };
    getMembersCount();
  });
  const nickNameHandler = (nickName) =>{
    console.log(nickName);
    setNickName(nickName);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Никнейм:</Text>
        <TextInput 
          clearTextOnFocus={true}
          style={styles.textInput}
          onChangeText={nickNameHandler}
          defaultValue={'Все, что угодно)'}
          maxLength={20} 
        />
      </View>
      <TouchableOpacity style={styles.searchButton} onPress={findСompanion}>
        <Text style={styles.searchButtonText}>Найти собеседника</Text>
      </TouchableOpacity>
      <Text style={styles.membersText}>Число участников: {membersCount}</Text>
    </View>
  );
}

const setNickName = (nickName) =>{
  const postNickRequest =async()=> {
    try {
      const response = await fetch(
        'http://localhost:3232/api/setNick',{
          method: 'POST',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',   
          },
          body: JSON.stringify({
            nickName,
          }),
        });
      const json = await response.json();
      return JSON.stringify(json);    
    } catch (error) {
      console.error(error);
    }
  };
  nickValidationResult = postNickRequest();
}

const findСompanion = () => {
  const [companionNickName, setCompanionNick] = useState<String>('');
  useEffect(() => {
    const getCompanion =async()=> {
      try {
        const response = await fetch(
          'http://localhost:3232/api/getCompanion',{
            method: 'Get',
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin' : '*',
            },
          });
        const json = await response.json();
        const companionNickName=JSON.stringify(json);
        setCompanionNick(companionNickName);
      } catch (error) {
        console.error(error);
      }
    };
    getCompanion();
  });
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1b1d21',
  },
  header:{
    alignItems:'center',
    justifyContent:'center',
  },
  headerText:{
    fontSize: '27%',
    fontWeight: '400',
    color: '#b2bfd6',
    marginBottom:'5%',
  },
  textInput:{
    backgroundColor:'#3e434d',
    width: '25%',
    height: '20%',
    borderRadius:10,
    fontSize:'20%',
    fontWeight: '400',
    marginBottom:'15%',
    padding:10,
  },
  searchButtonText:{
    fontSize: '27%',
    fontWeight: '500',
    color: '#b2bfd6',
    padding: 10,
  },
  membersText:{
    color:'#b2bfd6',
    fontSize: '20%',
  },
  searchButton: {
    width:'70%',
    height: '10%',
    backgroundColor: '#3a3de0',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:'50%',
 },
});
