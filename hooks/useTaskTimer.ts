"use client"
import { useState, useEffect, useRef } from 'react';

interface Task {
  id: number;
  name: string;
}

export default function useTaskTimer() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentTaskId, setCurrentTaskId] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [elapsedTime, setElapsedTime] = useState<Record<number, number>>({});

  // Load data from localStorage when component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    const savedElapsedTime = localStorage.getItem('elapsedTime');
    const savedCurrentTaskId = localStorage.getItem('currentTaskId');

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
    if (savedElapsedTime) {
      setElapsedTime(JSON.parse(savedElapsedTime));
    }
    if (savedCurrentTaskId) {
      setCurrentTaskId(Number(savedCurrentTaskId));
    }
  }, []);

  // Save data to localStorage whenever tasks, elapsedTime, or currentTaskId change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('elapsedTime', JSON.stringify(elapsedTime));
    localStorage.setItem('currentTaskId', currentTaskId !== null ? currentTaskId.toString() : '');
  }, [tasks, elapsedTime, currentTaskId]);

  useEffect(() => {
    if (currentTaskId !== null) {
      timerRef.current = setInterval(() => {
        setElapsedTime((prev) => ({
          ...prev,
          [currentTaskId]: (prev[currentTaskId] || 0) + 1000,
        }));
      }, 1000);

      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }
  }, [currentTaskId]);

  const startTask = (taskId: number) => {
    if (currentTaskId !== null) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      setElapsedTime((prev) => ({
        ...prev,
        [currentTaskId]: (prev[currentTaskId] || 0),
      }));
    }
    setCurrentTaskId(taskId);
  };

  const addTask = (name: string) => {
    if (name.trim() === '') return; // Prevent adding empty tasks
    const newTask = { id: Date.now(), name };
    setTasks((prev) => [...prev, newTask]);
  };

  return {
    tasks,
    elapsedTime,
    currentTaskId,
    addTask,
    startTask,
  };
}