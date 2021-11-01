import React, {useState, useRef} from "react";
import TodoTable from "./TodoTable";
import {AgGridReact} from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

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
        if (gridRef.current.getSelectedNodes().lentgh > 0)
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

    return(
        <div>
            <h1>Simple Todolist</h1>
                <input placeholder="Date" value={date} onChange={e => setDate(e.target.value)}/>
                <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)}/>
                <input placeholder="Priority" value={priority} onChange={e => setPriority(e.target.value)}/>

            <button onClick={addTodo}>Add</button>
            <button onClick={deleteTodo}>Delete</button>

            <div className="ag-theme-material" style={{height: 400, width: 600, margin: "auto"}}>
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