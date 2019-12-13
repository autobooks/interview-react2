export const add = (state, { payload }) => {
 return {
  ...state,
  activities: [...state.activities, payload.activity],
}};

export const setActivityDialog = (state, {payload}) => {
 return {
    ...state,
    addActivityDialogActive: payload
  }
};

export const setActivityTimeRunning = (state, {payload}) => {

  const currentActivities = state.activities;

  const activity = currentActivities.find(activity => {
    return activity.id === payload.id;
  });

  activity.paused = payload.paused;

  return {
    ...state,
  }
};

export const setActivityTimeSpent = (state, {payload}) => {

  const currentActivities = state.activities;

  const activity = currentActivities.find(activity => {
    return activity.id === payload.id;
  });


  console.log(payload.timeSpent);

  activity.timeSpent = payload.timeSpent;

  return {
    ...state,
  }
};
