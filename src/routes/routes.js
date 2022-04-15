import Profile from './components/Account/Profile';

const routes = [
    {path: '/admin', exact: true, name: 'Admin'},
    {path: '/admin/dashboard', exact: true, name: 'Dashboard', component: Profile},
    {path: '/admin/profile', exact: true, name: 'profile', component: Profile}
];

export default routes;