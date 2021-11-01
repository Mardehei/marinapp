import React from "react";

function TodoTable(props) {
   
   const mapTodo = props.todos.map((todo, index) => 
      <tr key = {index}>
         <td>{todo.date}</td>
         <td>{todo.desc}</td>
         <td>{todo.priority}</td>
         <td><button onClick={() => props.deleteTodo(index)}>Delete</button></td>
      </tr>
   )   
 
   return(
      <table>
         <tbody>
            <tr><th>Date</th><th>Description</th></tr>
            {mapTodo}
         </tbody>
      </table>  
   );
}

export default TodoTable;