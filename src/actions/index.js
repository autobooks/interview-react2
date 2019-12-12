export const addActivity = activity => {

  console.log('hello activity');
  console.log(activity);

  return {
    type: "addActivity",
    payload: { activity }
  }
};
