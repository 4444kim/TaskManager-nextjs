export interface iTask {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  deadline: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
