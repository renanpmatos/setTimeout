"use client";
import React from "react";
import useTaskTimer from "../hooks/useTaskTimer";

const TaskList: React.FC = () => {
  const { tasks, elapsedTime, currentTaskId, addTask, startTask } =
    useTaskTimer();

  const handleStartTask = (taskId: number) => {
    startTask(taskId);
  };

  const handleAddTask = () => {
    const taskName = prompt("Enter task name:");
    if (taskName) {
      addTask(taskName);
    }
  };

  return (
    <div>
      <h2>Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <span>{task.name}</span>
            <button onClick={() => handleStartTask(task.id)}>
              {currentTaskId === task.id ? "Pause" : "Start"}
            </button>
            {currentTaskId === task.id && (
              <span>
                Time: {Math.floor((elapsedTime[task.id] || 0) / 1000)}s
              </span>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskList;
