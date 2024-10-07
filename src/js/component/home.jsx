import React, { useState } from "react";
import 'font-awesome/css/font-awesome.min.css';

const Home = () => {
	const [ inputValue, setInputValue ] = useState("");
	const [ todos, setTodos ] = useState([]);

	const handleAddTodo = (e) => {
		if (e.key === "Enter" && inputValue.trim() !== "") {
			setTodos([...todos, inputValue.trim()]);
			setInputValue("");
		}
	};
	
	const handleDeleteTodo = (index) => {
		setTodos(todos.filter((todo, i) => index !== i))
	};
	
	const resetList = () => {
		setTodos([]);
	};

	fetch('https://playground.4geeks.com/todo/users/rdrgzfermin', {
		method: "PUT",
		body: JSON.stringify(todos),
		headers: {
		  "Content-Type": "application/json"
		}
	  })
	  .then(resp => {
		  console.log(resp.ok);
		  console.log(resp.status);
		  console.log(resp.text());
		  return resp.json();
	  })
	  .then(data => {
		  console.log(data);
	  })
	  .catch(error => {
		  console.error(error);
	  });

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
