export const getMembersCount =async()=> {
    try {
      const response = await fetch(
        'http://localhost:3232/api/members'
      );
      const json = await response.json();
      const membersCounter=JSON.stringify(json);
      console.log({membersCounter});
      return membersCounter;
    } catch (error) {
      console.error(error);
    }
  };