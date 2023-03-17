import { getСompanionApi,putInQueueApi,setNickApi} from './App'

export const sendNickName = async (userNickName) =>{
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

export const putInQueue = async () => {
  let isInQueue;
  const putInQueueRequest =async()=> {
    try {
      const response = await fetch(
        putInQueueApi,{
          method: 'Post',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      const json = await response.json();
      isInQueue=JSON.stringify(json);
    } catch (error) {
      console.error(error);
    }
  };
  await putInQueueRequest();
  return isInQueue;
}

export const findСompanion = async() => {
  let companionNickName;
  const getCompanionRequest =async()=> {
    try {
      const response = await fetch(
        getСompanionApi,{
          method: 'GET',
          header: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
      const json = await response.text(); 
      companionNickName=json;
    } catch (error) {
      console.error(error);
    }
  };
  await getCompanionRequest();
  return companionNickName;
}