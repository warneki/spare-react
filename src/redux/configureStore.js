import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createForms } from 'react-redux-form'
import { Projects } from './projects';
import { Repeats } from './repeats';
import { Sessions } from './sessions';
import thunk from 'redux-thunk';
// import logger from 'redux-logger';
import { StudySessionForm } from './forms';


export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            projects: Projects,
            sessions: Sessions,
            repeats: Repeats,
            ...createForms({
                new_study_session: StudySessionForm
            })
        }),
        applyMiddleware(thunk)
        // applyMiddleware(thunk, logger)
    );

    return store;
}
