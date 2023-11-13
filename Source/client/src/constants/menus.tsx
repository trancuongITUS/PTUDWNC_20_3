import Menu from '../models/Menu';
import RouteEnum from './routeEnum';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';

const menus: Menu[] = [
  { id: '1', label: 'Dashboard', icon: <DashboardIcon />, route: RouteEnum.DASHBOARD },
  { id: '2', label: 'Account', icon: <AccountBoxIcon />, route: RouteEnum.ACCOUNT },
  { id: '3', label: 'Setting', icon: <SettingsApplicationsIcon />, route: RouteEnum.SETTING },
];

export default menus;
