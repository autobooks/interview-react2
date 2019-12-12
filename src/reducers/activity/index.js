export const add = (state, { payload }) => {
  console.log('adding');
 return {
  ...state,
  activities: [...state.activities, payload.activity],
}};
