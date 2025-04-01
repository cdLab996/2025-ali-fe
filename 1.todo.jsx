// 题目1：实现一个待办事项列表优化
// 以下是一个简单的待办事项列表组件，但它存在一些问题和优化空间。请分析代码并优化它。

// import React, { useState, useEffect } from 'react';

// function TodoList() {
//   const [todos, setTodos] = useState([]);
//   const [inputValue, setInputValue] = useState('');

//   useEffect(() => {
//     console.log('Todos updated:', todos);
//   }, []);

//   const addTodo = () => {
//     if (inputValue.trim()) {
//       setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
//       setInputValue('');
//     }
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map(todo =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   return (
//     <div>
//       <h1>Todo List</h1>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={(e) => setInputValue(e.target.value)}
//         placeholder="Add a new todo"
//       />
//       <button onClick={addTodo}>Add</button>
//       <ul>
//         {todos.map(todo => (
//           <li key={todo.id}>
//             <span
//               style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
//               onClick={() => toggleTodo(todo.id)}
//             >
//               {todo.text}
//             </span>
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    console.log('Todos updated:', todos);
  }, [todos]); // 更新todos时触发

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos(prevTodos => [
        ...prevTodos,
        { id: Date.now(), text: inputValue, completed: false }
      ]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.text}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
