import {TaskPriority} from "@/types/enum.ts";

export interface IProject {
  id: string;
  title: string;
  description: string;
  createdById: string;
  createdAt: string;
  tasks: ITask[]
  accesses: IProjectAccess[];
}

export interface ITask {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  completed: boolean;
  projectId: string;
  assignedTo: IUser
  assignedToId: string;
  createdAt: string;
}
export interface IUser {
  id: string;
  telegramId: string;
  username: string;
  projects: string;
  tasks: ITask[];
  accesses: IProjectAccess[];
  createdAt: string;
}

export interface IProjectAccess {
  id: string;
  userId: string;
  projectId: string;
  user: IUser;
  project: IProject;
}
