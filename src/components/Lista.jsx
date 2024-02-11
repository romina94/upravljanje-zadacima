import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Lista() {
    const [search, setSearch] = useState("");
    const [task, setTask] = useState("");
    const [editedTask, setEditedTask] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [addModal, setAddModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("zadaci")) {
            const taskList = JSON.parse(localStorage.getItem("zadaci"));
            setTasks(taskList);
        }
    }, []);

    const handleTask = (e) => {
        const { value } = e.target;
        setTask(value);
    }

    const addNewTask = (e) => {
        e.preventDefault();

        if (task) {
            const newTask = {
                id: tasks.length,
                taskTitle: task,
                status: "todo"
            };
            const newTaskArray = [...tasks, newTask];
            setTasks(newTaskArray);
            localStorage.setItem("zadaci", JSON.stringify(newTaskArray));
            setTask("");
            setAddModal(false);
        }
    }

    const handleEditTask = (e) => {
        const { value } = e.target;
        setEditedTask(oldTask => ({
            ...oldTask,
            taskTitle: value
        }));
    }

    const editTask = (e) => {
        e.preventDefault();
        const updatedTaskArray = tasks.map(e =>
            e.id === editedTask.id ? editedTask : e
        );
        setTasks(updatedTaskArray);
        localStorage.setItem("zadaci", JSON.stringify(updatedTaskArray));
        setEditModal(false);
    }

    const startTask = (task) => {
        const updatedTaskArray = tasks.map(e =>
            e.id === task.id 
            ? { ...e, status: "in progress" } 
            : e
        );
        setTasks(updatedTaskArray);
        localStorage.setItem("zadaci", JSON.stringify(updatedTaskArray));
    }

    const finishTask = (task) => {
        const updatedTaskArray = tasks.map(e =>
            e.id === task.id 
            ? { ...e, status: "done" } 
            : e
        );
        setTasks(updatedTaskArray);
        localStorage.setItem("zadaci", JSON.stringify(updatedTaskArray));
    }

    const deleteTask = (task) => {
        const updatedTaskArray = tasks.filter(e => e.id !== task.id);
        setTasks(updatedTaskArray);
        localStorage.setItem("zadaci", JSON.stringify(updatedTaskArray));
    }

    const handleLogout = () => {
        localStorage.removeItem("loggedIn");
        navigate("/prijava");
    }

    const showAddModal = () => {
        setAddModal(!addModal);
    }

    const showEditModal = (task) => {
        setEditedTask(task);
        setEditModal(!editModal);
    }

    return (
        <>
            <div className="logged-in-wrapper">
                <h1>Upravljanje zadacima</h1>
                <button onClick={showAddModal}>Dodaj novi zadatak</button>
                <input
                    type="text"
                    class="search"
                    placeholder="Pretraži zadatke"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <div className="tasks-columns">
                    <div className="tasks-wrapper">
                        <h2>Todo</h2>
                        <div className="tasks">
                            {tasks.filter((task) => {
                                return search.toLowerCase() === ""
                                ? task
                                : (task.taskTitle.toLowerCase().includes(search) || task.status.toLowerCase().includes(search));
                            }).map((task) => (
                                task.status === "todo" ?
                                    <div key={task.id} className="task">
                                        <h4>{task.taskTitle}</h4>
                                        <button onClick={() => startTask(task)}>Start</button>
                                        <button onClick={() => showEditModal(task)}>Edit</button>
                                        <button onClick={() => deleteTask(task)}>Delete</button>
                                    </div>
                                    : null
                            ))}
                        </div>
                    </div>
                    <div className="tasks-wrapper">
                        <h2>In progress</h2>
                        <div className="tasks">
                            {tasks.filter((task) => {
                                return search.toLowerCase() === ""
                                ? task
                                : (task.taskTitle.toLowerCase().includes(search) || task.status.toLowerCase().includes(search));
                            }).map((task) => (
                                task.status === "in progress" ?
                                    <div key={task.id} className="task">
                                        <h4>{task.taskTitle}</h4>
                                        <button onClick={() => finishTask(task)}>Finish</button>
                                        <button onClick={() => deleteTask(task)}>Delete</button>
                                    </div>
                                    : null
                            ))}
                        </div>
                    </div>
                    <div className="tasks-wrapper">
                        <h2>Done</h2>
                        <div className="tasks">
                            {tasks.filter((task) => {
                                return search.toLowerCase() === ""
                                ? task
                                : (task.taskTitle.toLowerCase().includes(search) || task.status.toLowerCase().includes(search));
                            }).map((task) => (
                                task.status === "done" ?
                                    <div key={task.id} className="task">
                                        <h4>{task.taskTitle}</h4>
                                        <button onClick={() => deleteTask(task)}>Delete</button>
                                    </div>
                                    : null
                            ))}
                        </div>
                    </div>
                </div>
                <button type="button" onClick={handleLogout}>Odjava</button>
                {addModal && (
                    <div id="modal-overlay" className="active">
                        <div className="modal">
                            <h2>Unesite novi zadatak</h2>
                            <form onSubmit={addNewTask}>
                                <input
                                    type="text"
                                    placeholder="Unesite novi zadatak"
                                    name="task"
                                    value={task}
                                    onChange={handleTask}
                                    required
                                />
                                <button type="submit">Potvrda</button>
                            </form>
                        </div>
                    </div>
                )}
                {editModal && (
                    <div id="modal-overlay" className="active">
                        <div className="modal">
                            <h2>Uredi zadatak</h2>
                            <form onSubmit={editTask}>
                                <input
                                    type="text"
                                    placeholder="Uredi zadatak"
                                    name="task"
                                    value={editedTask.taskTitle}
                                    onChange={handleEditTask}
                                    required
                                />
                                <button type="submit">Spremi</button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Lista;