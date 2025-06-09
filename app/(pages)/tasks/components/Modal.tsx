import React, { FC, FormEvent, useState } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { useSession } from 'next-auth/react';

interface modalPropsInterface {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

interface taskDataInterface {
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  category: string;
  deadline: string;
}

const Modal: FC<modalPropsInterface> = ({ setOpenModal, openModal }) => {
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;

  const [taskData, setTaskData] = useState<taskDataInterface>({
    title: '',
    description: '',
    status: 'pending',
    category: '',
    deadline: '',
  });

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/api/tasks', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(taskData),
      });
      console.log(response, 'response');
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="flex flex-col gap-[20px] p-6 border border-[#551117] bg-[#0f0d0d] rounded-lg shadow-lg w-[500px]">
        <div className="flex justify-between">
          <div>
            <h3 className="text-xl font-semibold">Создать Новую Задачу</h3>
            <p className="text-gray-500 mt-[5px]">Добавьте новую задачу в ваш список.</p>
          </div>

          <Button variant="default" onClick={() => setOpenModal(!openModal)}>
            X
          </Button>
        </div>

        <div className="w-full flex flex-col gap-[10px]">
          <label className="block mb-1">Название</label>
          <Input
            type="text"
            placeholder="название задачи"
            value={taskData.title}
            onChange={(event) => setTaskData({ ...taskData, title: event.target.value })}
          />
        </div>

        <div className="w-full flex flex-col gap-[10px]">
          <label className="block mb-1">Описание</label>
          <textarea
            className="bg-[#1e1c1b] border border-[#551117] rounded-xl p-4 min-h-[100px] text-white outline-none transition focus:border-red-500"
            placeholder="описание задачи"
            value={taskData.description}
            onChange={(event) => setTaskData({ ...taskData, description: event.target.value })}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-[10px] items-start">
            <label>Категория</label>
            <div className="border border-[#551117] py-3 rounded-xl w-[150px]">
              <select
                className="text-lg px-3"
                value={taskData.category}
                onChange={(event) => setTaskData({ ...taskData, category: event.target.value })}>
                <option value="" disabled={true}>
                  Выберите..
                </option>
                <option value="work">Работа</option>
                <option value="home">Дом</option>
                <option value="study">Учеба</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-[10px] items-start">
            <label>Дедлайн выполнения</label>
            <Input
              type="date"
              value={taskData.deadline}
              onChange={(event) => setTaskData({ ...taskData, deadline: event.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="primary" type="submit">
            Создать задачу
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Modal;
