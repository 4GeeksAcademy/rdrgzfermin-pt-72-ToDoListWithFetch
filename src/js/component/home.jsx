import React, { useState } from "react";

const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);

	const handleAddTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, inputValue.trim()]);
			setInputValue("");
		}
	};

	let putResponse = await fetch("https://playground.4geeks.com/todo/users/rdrgzfermin", {
		method: "PUT",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ 
			key: "value",
			key: "value"
		})
	})
	let putData = await response.json()
	
	const handleDeleteTodo = (index) => {
		setTodos(todos.filter((todo, i) => index !== i))
	};

	let deleteResponse = await fetch("https://playground.4geeks.com/todo/users/rdrgzfermin", {
		method: "DELETE",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ 
			key: "value",
			key: "value"
		})
	})
	let deleteData = await response.json()
	
	const resetList = () => {
		setTodos([]);
	};

	let postResponse = await fetch("https://playground.4geeks.com/todo/users/rdrgzfermin", {
		method: "POST",
		headers: { "Content-type": "application/json" },
		body: JSON.stringify({ 
			key: "value",
			key: "value"
		})
	})
	let postData = await response.json()

	let getResponse = await fetch("https://playground.4geeks.com/todo/users/rdrgzfermin")
	let getData = await response.json()

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
