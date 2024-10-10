import React, { useEffect, useState } from "react";
import { addUser, clearAll, fetchTodos, addTodoToApi, deleteTaskFromApi } from "../updateAPI";
const Home = () => {
    const [inputValue, setInputValue] = useState("");
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        fetchTodos(setTodos);
    }, []);

    const handleAddTodo = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            const newTodo = {
                label: inputValue.trim(),
                is_done: false
            };
            setTodos([...todos, newTodo]);

            addTodoToApi(todos, inputValue, setTodos);
            console.log("Add new task to API:", newTodo.label);

            setInputValue("");
        }
    };

    const handleDeleteTodo = (index) => {
        const todoId = todos[index].id;
        const todoLabel = todos[index].label;
        const newTodos = todos.filter((_, i) => i !== index);
        setTodos(newTodos);

        console.log("todo deleted successfully from api" + todoLabel);

        deleteTaskFromApi(todoId, setTodos);
    };

    const handleAddUser = () => {


        addUser(setTodos);
    };



    const handleClearAll = () => {
        setTodos([]);
        clearAll(setTodos);
    };

    return (
        <div className="container">
            <h1 className="text-center mt-5">To Do's</h1>
            <div className="card todo-card mx-auto mt-5" style={{ maxWidth: "800px" }}>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <input
                            type="text"
                            onChange={(e) => setInputValue(e.target.value)}
                            value={inputValue}
                            onKeyDown={handleAddTodo}
                            placeholder="Add to your tasks"
                        />
                    </li>
                    {Array.isArray(todos) && todos.length === 0 ? (
                        <li className="list-group-item no-tasks">no tasks, add a task</li>
                    ) : (
                        Array.isArray(todos) && todos.map((todo, index) => (
                            <li className="list-group-item" key={index}>
                                <div className="list-group-item-todo" id="screen">
                                    {todo.label}
                                </div>
                                <span className="x-container" onClick={() => handleDeleteTodo(index)}>
                                    <i className="fa-solid fa-x"></i>
                                </span>
                            </li>
                        ))
                    )}
                </ul>
                <div className="card-footer text-secondary">
                    {todos.length} {todos.length === 1 ? "item" : "items"} left.
                </div>
            </div>
			<div className="buttons">
				<button onClick={handleAddUser} className="btn btn-success m-2 d-inline-flex">Add a new user</button>
				<button onClick={handleClearAll} className="btn btn-info m-2 d-inline-flex">Clear user & Tasks</button>
			</div>
        </div>
    );
};

export default Home;