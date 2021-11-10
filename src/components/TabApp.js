import React, {useState} from "react";
import { AppBar} from "@mui/material";
import { Tabs } from "@mui/material";
import { Tab } from "@mui/material";
import TodoList from "./TodoList";

function TabApp() {
   const[value, setValue] = React.useState(0);

   const handleChange = (event, value) => {
      setValue(value);
   };

   return (
      
      <div>
         <>
         <AppBar position="statistic">
            <Tabs value = {value} onChange={handleChange}>
               <Tab label = "Home" />
               <Tab label = "My todos" />
            </Tabs>
         </AppBar>
         {value === 0 && <TodoList />};
         </>
      </div>
   );
}

export default TabApp;
