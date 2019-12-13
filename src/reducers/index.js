import * as activity from './activity';

const createReducer = handlers => (state, action) => {
  if (!handlers.hasOwnProperty(action.type)) {
    return state;
  }

  return handlers[action.type](state, action);
};

export default createReducer({
  addActivity: activity.add,
  setActivityDialog: activity.setActivityDialog,
  setActivityTimeRunning: activity.setActivityTimeRunning,
  setActivityTimeSpent: activity.setActivityTimeSpent
});
