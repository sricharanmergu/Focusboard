import { useState, useEffect } from 'react';
import { INITIAL_TASKS, STORAGE_KEY } from '../data/initialData';

export function useLocalStorageTasks() {
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Failed to read tasks from localStorage:', error);
    }
    return INITIAL_TASKS;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage:', error);
    }
  }, [tasks]);

  const addTask = (newTaskData) => {
    const newTask = {
      ...newTaskData,
      id: `task-${Date.now()}`,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? { ...updatedTask } : task))
    );
  };

  const updateTaskStatus = (taskId, nextStatus) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: nextStatus } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  };

  const resetSampleData = () => {
    setTasks(INITIAL_TASKS);
  };

  return {
    tasks,
    addTask,
    updateTask,
    updateTaskStatus,
    deleteTask,
    resetSampleData,
  };
}
