
import './App.css';
import TodoList from './components/TodoList';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import DateFnsAdapter from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

function App() {
  return (
    <div className="App">
        <AppBar position="static">
          <Toolbar >
            <Typography variant="h6">
              Marin Todo List
            </Typography>
            <LocalizationProvider dateAdapter={DateFnsAdapter}>...</LocalizationProvider>
          </Toolbar>
        </AppBar>  
        <TodoList />
    </div>
  );
}

export default App;
