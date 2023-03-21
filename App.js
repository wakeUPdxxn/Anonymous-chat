import React, { useRef } from 'react';
import { StyleSheet, Text,TextInput, View, TouchableOpacity} from 'react-native';
import { useState,useEffect} from 'react';
import { putInQueue,findСompanion,sendNickName} from './functions.js'

export const getMembersApi = 'http://localhost:3232/api/members';
export const setNickApi = 'http://localhost:3232/api/setNick';
export const getСompanionApi = 'http://localhost:3232/api/getCompanion';
export const putInQueueApi = 'http://localhost:3232/api/putInQueue';

let ws=new WebSocket("ws://localhost:2323");

export default function App() {
  const [isNickValid,setNickValidationStatus]=useState(true);
  const [membersCount, setMembersCount] = useState(0);
  const [isInQueue, setQueueStatus] = useState(false);
  const [companionNickName,setCompanionNick] = useState('');
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
    setNickValidationStatus(!Boolean(result));
  }
  const findCompanionPressed = async()=>{
    let result = await putInQueue();
    setQueueStatus(Boolean(result));
    let companionNick = await findСompanion();
    setCompanionNick(companionNick);
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Who are you?</Text>
        <TextInput
          placeholder={'My name is...'}
          style={styles.textInput}
          blurOnSubmit={true}
          onChangeText={nickNameHandler}
          //onEndEditing={(event)=>nickNameHandler(event.nativeEvent.text)}
          maxLength={20} 
        />
      </View>
      <TouchableOpacity 
        style={styles.searchButton} 
        onPress={findCompanionPressed}
        disabled={isNickValid}
      >
        <Text style={styles.searchButtonText}>Find companion</Text>
      </TouchableOpacity>
      <Text style={styles.membersText}>Members online: {membersCount}</Text>
    </View>
  );
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
    fontSize: 27,
    fontWeight: '400',
    color: '#b2bfd6',
    marginBottom:'5%',
  },
  textInput:{
    backgroundColor:'#3e434d',
    width: '25%',
    height: '20%',
    borderRadius:10,
    fontSize: 20,
    fontWeight: '400',
    marginBottom:'15%',
    padding:10,
  },
  searchButtonText:{
    fontSize: 24,
    fontWeight: '500',
    color: '#b2bfd6',
    padding: 10,
  },
  membersText:{
    color:'#b2bfd6',
    fontSize: 20,
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
