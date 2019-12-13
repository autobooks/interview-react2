const activities = JSON.parse(sessionStorage.getItem('activities'));

const activityState = activities ? activities : [];

export default {
  state: true,
  activities: activityState,
  addActivityDialogActive: false
};
