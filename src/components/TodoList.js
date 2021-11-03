import React, {useState, useRef} from "react";
//import TodoTable from "./TodoTable";
import {AgGridReact} from "ag-grid-react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

function TodoList() {
    const [desc, setDesc] = useState(``);
    const [date, setDate] = useState(``);
    const [priority, setPriority] = useState(``);
    const [todos, setTodos] = useState([]);

    //luo viittausolion ja tallennetaan se gridRef -muuttujaan
    const gridRef = useRef();

    const addTodo = () => {
        setTodos([...todos, {"desc": desc, "date" : date, "priority": priority}]);
        setDesc(``);
        setDate(``);
        setPriority(``);
    }

    //pitää saada tietoon käyttäjän valitsema rivi
    //tämän voi tehdä getSelectedNodes avulla
    const deleteTodo = (row) => {
        if (gridRef.current.getSelectedNodes().length > 0)
        setTodos(todos.filter((todo, index)=> index !== gridRef.current.getSelectedNodes()[0].childIndex));
        else
            alert("valitse ensin poistettava rivi");
    }
    

    const columns = [
        {field: "desc", sortable: true, filter: true},
        {field: "date", sortable: true, filter: true},
        {field: "priority", sortable: true, filter: true,
        cellStyle: params => params.value === "High" ? {color: "red"}:{color: "black"}
        }
    ];

    const [value, setValue] = React.useState(null);

    return(
        <div>
            <Stack 
                direction="row" 
                spacing={2} 
                justifyContent="center" 
                style={{marginTop: 20}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        label="Date"
                        value={value}
                        onChange={(newValue) => {
                        setValue(newValue);
                        }}
                        renderInput={(params) => <TextField {...params}
                        onChange={e => setDate(e.target.value)} />}
                    />
                </LocalizationProvider> 
                <TextField  
                    size="small"
                    variant="standard"
                    label="Description" 
                    value={desc} 
                    onChange={e => setDesc(e.target.value)}/>
                <TextField 
                    size="small"
                    variant="standard"
                    label="Priority" 
                    value={priority} 
                    onChange={e => setPriority(e.target.value)}/>
                <Button 
                    size="small" 
                    variant="outlined" 
                    onClick={addTodo}>Add
                </Button>
                <Tooltip title= "Valitse poistettava rivi">
                    <Button 
                        endIcon={<DeleteIcon />} 
                        size="small" 
                        variant="outlined" 
                        color="error" 
                        onClick={deleteTodo}>Delete
                    </Button>
                </Tooltip>
            </Stack>
            <div 
                className="ag-theme-material" 
                style={{height: 400, width: 600, margin: "auto"}}>
                <AgGridReact 
                    ref={gridRef}
                    onGridReady={params => gridRef.current = params.api}
                    rowSelection = "single"
                    rowData = {todos}
                    columnDefs={columns}
                    />
            </div>
        </div>
    );
}

export default TodoList;