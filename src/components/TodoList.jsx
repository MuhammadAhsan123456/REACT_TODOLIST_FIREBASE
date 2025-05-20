import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTodoList,
  addTodo,
  updateTodo,
} from '../TodoSlice';
import empty from '../assets/todo.png';
import { BsTrash } from 'react-icons/bs';
import { TiPencil } from 'react-icons/ti';

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector((state) => state.todo.todoList);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [currentTodo, setCurrentTodo] = useState(null);

  useEffect(() => {
    if (todoList.length > 0) {
      localStorage.setItem('todoList', JSON.stringify(todoList));
    }
  }, [todoList]);

  useEffect(() => {
    const localTodoList = JSON.parse(localStorage.getItem('todoList'));
    if (localTodoList) {
      dispatch(setTodoList(localTodoList));
    }
  }, [dispatch]);

  const handleAddOrUpdateTodo = () => {
    if (newTask.trim().length === 0) {
      alert('Please enter a task');
      return;
    }

    if (currentTodo) {
      dispatch(updateTodo({ id: currentTodo.id, task: newTask }));
    } else {
      dispatch(addTodo({ task: newTask, id: Date.now(), completed: false }));
    }

    setNewTask('');
    setCurrentTodo(null);
    setShowModal(false);
  };

  const handleDeleteTodo = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    dispatch(setTodoList(updatedList));
    localStorage.setItem('todoList', JSON.stringify(updatedList));
  };

  return (
    <div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-md">
            <input
              type="text"
              className="border p-2 rounded-md outline-none mb-8 w-full bg-black text-white"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Enter your task here"
            />
            <div className="flex justify-between">
              <button
                className="bg-purple-300 rounded-md text-white py-3 px-10 cursor-pointer mr-9"
                onClick={() => {
                  setShowModal(false);
                  setCurrentTodo(null);
                  setNewTask('');
                }}
              >
                Cancel
              </button>
              <button
                className="bg-orange-400 rounded-md text-white py-3 px-10 cursor-pointer"
                onClick={handleAddOrUpdateTodo}
              >
                {currentTodo ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center justify-center flex-col">
        {todoList.length === 0 ? (
          <div className="mb-8">
            <div className="sm:w-[500px] sm:h-[500px] min-w-[250px]">
              <img src={empty} alt="Empty todo" />
            </div>
            <p className="text-center text-gray-400">
              You have no todo's, please add one.
            </p>
          </div>
        ) : (
          <div className="container mx-auto mt-6">
            {todoList.map((todo) => (
              <div
                key={todo.id}
                className="flex items-center justify-between mb-6 bg-gray-900 mx-auto w-full md:w-[75%] rounded-md p-4"
              >
                <div className="text-white">
                  {todo.task}
                </div>
                <div>
                  <button
                    className="bg-blue-500 cursor-pointer text-white p-1 rounded-md ml-2"
                    onClick={() => {
                      setShowModal(true);
                      setCurrentTodo(todo);
                      setNewTask(todo.task);
                    }}
                  >
                    <TiPencil />
                  </button>
                  <button
                    onClick={() => handleDeleteTodo(todo.id)}
                    className="bg-orange-500 cursor-pointer text-white p-1 rounded-md ml-2"
                  >
                    <BsTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          className="cursor-pointer bg-orange-400 text-center text-white py-3 px-10 rounded-md mt-4"
          onClick={() => {
            setShowModal(true);
            setCurrentTodo(null);
            setNewTask('');
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default TodoList;
