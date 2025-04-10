'use client';

import { isDevelopment } from './env';

type LogLevel = 'log' | 'error' | 'warn' | 'info';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  data?: any;
}

const logs: LogEntry[] = [];
const MAX_LOGS = 1000;

const createLogEntry = (level: LogLevel, message: string, ...args: any[]): LogEntry => ({
  level,
  message,
  timestamp: new Date().toISOString(),
  data: args.length > 0 ? args : undefined
});

const addLog = (entry: LogEntry) => {
  logs.push(entry);
  if (logs.length > MAX_LOGS) {
    logs.shift(); // Remove oldest log when limit is reached
  }
};

// Prevent empty object logging
const shouldLog = (...args: any[]): boolean => {
  if (args.length === 1 && typeof args[0] === 'object' && Object.keys(args[0]).length === 0) {
    return false;
  }
  return true;
};

export const logger = {
  log: (message: string, ...args: any[]) => {
    if (isDevelopment && shouldLog(message, ...args)) {
      const entry = createLogEntry('log', message, ...args);
      addLog(entry);
      console.log(`[${entry.timestamp}]`, message, ...args);
    }
  },
  error: (message: string, ...args: any[]) => {
    if (shouldLog(message, ...args)) {
      const entry = createLogEntry('error', message, ...args);
      addLog(entry);
      if (isDevelopment) {
        console.error(`[${entry.timestamp}] ERROR:`, message, ...args);
      }
    }
  },
  warn: (message: string, ...args: any[]) => {
    if (shouldLog(message, ...args)) {
      const entry = createLogEntry('warn', message, ...args);
      addLog(entry);
      if (isDevelopment) {
        console.warn(`[${entry.timestamp}] WARNING:`, message, ...args);
      }
    }
  },
  info: (message: string, ...args: any[]) => {
    if (isDevelopment && shouldLog(message, ...args)) {
      const entry = createLogEntry('info', message, ...args);
      addLog(entry);
      console.info(`[${entry.timestamp}]`, message, ...args);
    }
  },
  getLogs: () => [...logs],
  clearLogs: () => {
    logs.length = 0;
  }
};