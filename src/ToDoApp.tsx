
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from './store';
import { addTodo, toggleTodo, deleteTodo } from './store';
import './App.css';

const ToDoApp: React.FC = () => {
    const [text, setText] = useState('');
    const todos = useSelector((state: RootState) => state.todos);
    const dispatch: AppDispatch = useDispatch();

    const handleAddTodo = () => {
        if (text.trim()) {
            dispatch(addTodo(text));
            setText('');
        }
    };

    return (
        <div className="todo-container">
            <h1>ToDo List with Redux</h1>
            <div className="todo-input">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button onClick={handleAddTodo}>Add ToDo</button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
            <span
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => dispatch(toggleTodo(todo.id))}
            >
              {todo.text}
            </span>
                        <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ToDoApp;
