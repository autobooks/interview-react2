export const add = (state, { payload }) => {
 return {
  ...state,
  activities: [...state.activities, payload.activity],
}};

export const setActivityDialog = (state, {payload}) => {
 return {
  ...state,
  addActivityDialogActive: payload
}};
