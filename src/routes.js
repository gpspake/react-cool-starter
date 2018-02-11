import loadable from 'loadable-components';

import type { Dispatch } from './types';
import { fetchUsersIfNeeded } from './actions/users';
import { fetchUserIfNeeded } from './actions/user';

// If I return lodable components by function there's an error
const HomePage = store =>
  loadable(() => {
    console.log('LOG ==> ', store);

    // I need the store param to do code-splitting for reducer
    return import('./containers/Home');
  });

// If I return lodable components directly it works
const UserInfoPage = loadable(() => import('./containers/UserInfo'));
const NotFoundPage = loadable(() => import('./containers/NotFound'));

export default store => [
  {
    path: '/',
    exact: true,
    component: HomePage(store), // Add your route here
    loadData: (dispatch: Dispatch) =>
      Promise.all([
        dispatch(fetchUsersIfNeeded()) // Register your server-side call action(s) here
      ])
  },
  {
    path: '/UserInfo/:id',
    component: UserInfoPage,
    loadData: (dispatch: Dispatch, params: Object) =>
      Promise.all([dispatch(fetchUserIfNeeded(params.id))])
  },
  {
    component: NotFoundPage
  }
];
