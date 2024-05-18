import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Todo {
    id: number;
    text: string;
    completed: boolean;
}

const todoSlice = createSlice({
    name: 'todos',
    initialState: [] as Todo[],
    reducers: {
        addTodo: (state, action: PayloadAction<string>) => {
            state.push({ id: Date.now(), text: action.payload, completed: false });
        },
        toggleTodo: (state, action: PayloadAction<number>) => {
            const todo = state.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },
        deleteTodo: (state, action: PayloadAction<number>) => {
            return state.filter(todo => todo.id !== action.payload);
        }
    }
});

export const { addTodo, toggleTodo, deleteTodo } = todoSlice.actions;

const store = configureStore({
    reducer: {
        todos: todoSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
