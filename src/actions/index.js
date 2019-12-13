export const addActivity = activity => {

  //add id
  activity.id = randomString();

  return {
    type: "addActivity",
    payload: { activity }
  }
};

export const setActivityDialog = (payload) => {
  return {
    type: "setActivityDialog",
    payload
  }
}

export const setActivityTimeRunning = (payload) => {
  return {
    type: "setActivityTimeRunning",
    payload
  }
}

export const setActivityTimeSpent = (payload) => {
  return {
    type: "setActivityTimeSpent",
    payload
  }
}

export const setActivityFinished = (payload) => {
  return {
    type: "setActivityFinished",
    payload
  }
}


function randomString() {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < 20; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
