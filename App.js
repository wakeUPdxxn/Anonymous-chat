import React, { useRef } from 'react';
import { StyleSheet, Text,TextInput, View, TouchableOpacity} from 'react-native';
import { useState,useEffect} from 'react';

const getMembersApi = 'http://localhost:3232/api/members';
const setNickApi = 'http://localhost:3232/api/setNick';
const findСompanionApi = 'http://localhost:3232/api/getCompanion';
let ws=new WebSocket("ws://localhost:2323");
let companionNickName;
let userNickName;

export default function App() {
  const[isNickValid,setNickValidationStatus]=useState(true);
  const [membersCount, setMembersCount] = useState(0);
  useEffect(() => {
    const getMembersCount =async()=> {
      try {
        const response = await fetch(
          getMembersApi,{
            method: 'GET',
            header: {
              Accept: 'application/json',
              'Content-Type': 'application/json',   
            },
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
  const nickNameHandler = async (currentNickName) =>{
    let result = await sendNickName(currentNickName);
    if(result=='true'){
      userNickName=currentNickName;
    }
    setNickValidationStatus(!Boolean(result));
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
      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={findСompanion}
        disabled={isNickValid}
      >
        <Text style={styles.searchButtonText}>Найти собеседника</Text>
      </TouchableOpacity>
      <Text style={styles.membersText}>Число участников: {membersCount}</Text>
    </View>
  );
}

const sendNickName = async (userNickName) =>{
  let nickValidationResult;
  const postNickRequest =async()=> {
    try {
      const response = await fetch(
        setNickApi,{
          method: 'POST',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',   
          },
          body: JSON.stringify({
            userNickName,
          }),
        });
      const json = await response.json();
      nickValidationResult=JSON.stringify(json);
    } catch (error) {
      console.error(error);
    }
  };
  await postNickRequest();
  return nickValidationResult;
}

const findСompanion = () => {
  const getCompanion =async()=> {
    try {
      const response = await fetch(
        findСompanionApi,{
          method: 'Post',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userNickName,
          }),
        });
      const json = await response.text(); 
      companionNickName=json;
      console.log(companionNickName);
    } catch (error) {
      console.error(error);
    }
  };
  getCompanion();
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
