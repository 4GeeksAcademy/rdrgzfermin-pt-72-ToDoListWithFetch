import React, { useState } from "react";

const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);

	const API_URL = 'https://playground.4geeks.com/todo/users/rdrgzfermin';

    useEffect(() => {
        fetch(API_URL)
            .then((resp) => resp.json())
            .then((data) => {
                setTasks(data);
            })
            .catch((error) => console.log("Error loading tasks", error));
    }, []);
    
    const updateTasksOnServer = (newTasks) => {
        fetch(API_URL, {
            method: "PUT",
            body: JSON.stringify(newTasks),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((resp) => {
            if (resp.ok) {
                console.log("Tasks updated successfully");
            }
            return resp.json();
        })
        .catch((error) => console.log("Error updating tasks", error));
    };

	const handleAddTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, inputValue.trim()]);
			setInputValue("");
			updateTasksOnServer(updatedTasks);
		}
	};
	
	const handleDeleteTodo = (index) => {
		setTodos(todos.filter((todo, i) => index !== i))
		updateTasksOnServer(updatedTasks);
	};
	
	const resetList = () => {
		setTodos([]);
		updateTasksOnServer([]);
	};

	return (
		<div className="container">
			<h1 className="text-center mt-5">To Do's</h1>
			<div className="card todo-card mx-auto mt-5" style={{ maxWidth : "800px" }} >
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
					{todos.length === 0 ? (
						<li className="list-group-item no-tasks">no tasks, add a task</li>
					) : (
						todos.map((todo, index) => (
							<li className="list-group-item" key={index}>
								<div className="list-group-item-todo" id="screen">
									{todo}
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
				<button onClick={resetList} className="btn btn-primary m-2">Reset List</button>
			</div>
		</div>	
	);
};

export default Home;
