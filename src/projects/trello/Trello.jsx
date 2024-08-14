import { useEffect, useState } from "react";
import "./trello.css";

function Trello() {
  const [taskList1, setTaskList1] = useState([]);
  const [taskList2, setTaskList2] = useState([]);
  const [taskList3, setTaskList3] = useState([]);
  const [editObj, setEditObj] = useState(null);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("todo");

  console.log(taskList2, " task2");
  function addToDo() {
    console.log(name, category, "addd***");
    let newTaskList = [];
    switch (category) {
      case "todo":
        newTaskList = [...taskList1];
        newTaskList.push({ name, category, id: crypto.randomUUID() });
        setTaskList1(newTaskList);
        break;
      case "progress":
        newTaskList = [...taskList2];
        newTaskList.push({ name, category, id: crypto.randomUUID() });
        setTaskList2(newTaskList);
        break;
      case "done":
        newTaskList = [...taskList3];
        newTaskList.push({ name, category, id: crypto.randomUUID() });
        setTaskList3(newTaskList);
        break;
    }
    // setName("");
    // setCategory("todo");
  }

  function editTask(taskId) {
    let editObj =
      taskList1.find((item) => item.id === taskId) ||
      taskList2.find((item) => item.id === taskId) ||
      taskList3.find((item) => item.id === taskId);
    if (!editObj) alert("ERROR INVALID TASK");
    setEditObj(editObj);
    setName(editObj.name);
    setCategory(editObj.category);
  }
  function submitEdit() {
    const { id: editId, category: editCategory } = editObj;
    let newTaskList = [];
    switch (category) {
      case "todo":
        newTaskList = [...taskList1];
        break;
      case "progress":
        newTaskList = [...taskList2];
        break;
      case "done":
        newTaskList = [...taskList3];
        break;
    }
    let oldTaskList = [];
    switch (editCategory) {
      case "todo":
        oldTaskList = [...taskList1];
        break;
      case "progress":
        oldTaskList = [...taskList2];
        break;
      case "done":
        oldTaskList = [...taskList3];
        break;
    }
    if (editCategory !== category) {
      oldTaskList = oldTaskList.filter((item) => item.id !== editId);
      if (editCategory === "todo") setTaskList1(oldTaskList);
      if (editCategory === "progress") setTaskList2(oldTaskList);
      if (editCategory === "done") setTaskList3(oldTaskList);
      newTaskList.push({ id: editId, name, category });
    } else {
      newTaskList = newTaskList.map((item) => {
        console.log(item.id, editId, "ed");
        if (item.id === editId) {
          return {
            id: item.id,
            name,
            category,
          };
        }

        return item;
      });
    }
    console.log(category, newTaskList, "edit");
    if (category === "todo") setTaskList1(newTaskList);
    if (category === "progress") setTaskList2(newTaskList);
    if (category === "done") setTaskList3(newTaskList);
    setEditObj(null);
    // setName("");
    // setCategory("todo");
  }
  return (
    <>
      <UserInput
        addToDo={addToDo}
        editObj={editObj}
        name={name}
        category={category}
        setName={setName}
        setCategory={setCategory}
        submitEdit={submitEdit}
      />
      <div className="task-conntainer">
        <ListCard category="todo" taskList={taskList1} editTask={editTask} />
        <ListCard
          category="progress"
          taskList={taskList2}
          editTask={editTask}
        />
        <ListCard category="done" taskList={taskList3} editTask={editTask} />
      </div>
    </>
  );
}

export default Trello;
function ListCard({ taskList, category, setEditObj, editTask }) {
  // console.log(taskList, "yo");
  function getTasks() {
    return taskList.map((item) => {
      return (
        <p key={item.id} className="task" data-task-id={item.id}>
          <span>{item.name}</span>
          <button
            onClick={(e) => {
              const editTaskId = e.target.parentNode.dataset.taskId;
              editTask(editTaskId);
            }}
          >
            Edit
          </button>
        </p>
      );
    });
  }
  return (
    <div className="task-list-parent">
      <h3 className="task-heading">{category.toUpperCase()}</h3>
      <div className="task-list">{getTasks()}</div>
    </div>
  );
}
function UserInput({
  addToDo,
  name,
  category,
  setName,
  setCategory,
  editObj,
  submitEdit,
}) {
  return (
    <div>
      <label htmlFor="task-name">Enter Task Name</label>
      <input
        type="text"
        id="task-name"
        onChange={(e) => {
          //   console.log(e.target.value)
          setName(e.target.value);
        }}
        value={name}
      />
      <label htmlFor="task-cat">Enter category</label>
      <select
        name="category"
        id="task-cat"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      >
        <option value="todo">To Do</option>
        <option value="progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      {!editObj && (
        <button
          onClick={(e) => {
            addToDo();
          }}
        >
          Submit
        </button>
      )}
      {editObj && (
        <button
          onClick={(e) => {
            submitEdit();
          }}
        >
          Edit
        </button>
      )}
    </div>
  );
}
