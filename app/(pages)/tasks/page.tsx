'use client';
import React, { useState, useEffect } from 'react';
import Button from '@/app/components/ui/Button';
import Modal from './components/Modal';
import { iTask } from '@/app/types/types';
import { useAccessToken } from '@/app/hooks/useAccessToken';
import SoloTask from './components/SoloTask';
import Input from '@/app/components/ui/Input';

function Tasks() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [tasksList, setTasksList] = useState<iTask[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const statusList = ['Все', 'pending', 'in-progress', 'completed'];
  const [activeStatus, setActiveStatus] = useState('Все');
  const [activeCategory, setActiveCategory] = useState('All category');

  const { accessToken, status, isAuthenticated } = useAccessToken();

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5050/api/tasks', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await res.json();
      setTasksList(data);
    };

    fetchTasks();
  }, [status, accessToken, openModal]);

  const filteredTasks = tasksList
    .filter((task) => (activeStatus === 'Все' ? true : task.status === activeStatus))
    .filter((task) => (activeCategory === 'All category' ? true : task.category === activeCategory))
    .filter((task) => task.title.toLowerCase().includes(searchValue.toLowerCase()));

  return (
    <section className="px-[50px] py-[50px]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-[10px]">
          <h2 className="text-red-500 text-4xl">Мои задачи</h2>
          <span className="text-gray-400 text-lg">Управляйте своими задачами эффективно</span>
        </div>
        <Button variant="primary" onClick={() => setOpenModal(!openModal)} className="w-[170px]">
          + Новая задача
        </Button>
      </div>

      {openModal && <Modal openModal={openModal} setOpenModal={() => setOpenModal(false)} />}

      <div className="flex items-center gap-[20px] mt-[20px]">
        <Input
          placeholder="Посик задач..."
          className="w-[450px] bg-[#393531] py-3"
          value={searchValue}
          onChange={(event) => setSearchValue(event.target.value)}
        />
        <select
          className="border border-red-500/30 p-3 rounded-xl text-lg bg-white/5 text-white"
          value={activeCategory}
          onChange={(e) => setActiveCategory(e.target.value)}>
          <option value="All category">Все категории</option>
          <option value="work">Работа</option>
          <option value="home">Дом</option>
          <option value="study">Учеба</option>
        </select>
      </div>

      <ul className="mt-[30px] p-1 rounded-xl flex gap-3 w-max bg-black/40 border border-red-500/20 ">
        {statusList.map((elem) => {
          const count = tasksList.filter((task) =>
            elem === 'Все' ? true : task.status === elem,
          ).length;
          return (
            <li
              key={elem}
              onClick={() => setActiveStatus(elem)}
              className={`py-3 px-10 rounded-lg cursor-pointer text-gray-400 ${
                activeStatus === elem
                  ? 'text-white bg-gradient-to-r from-[#6b2a14] via-[#a41914] to-[#410a0a]'
                  : ''
              }`}>
              {elem} ({count})
            </li>
          );
        })}
      </ul>

      <div className="mt-[20px] w-max grid grid-cols-4 auto-cols-auto auto-rows-auto gap-[30px] min-h-[38vh]">
        {filteredTasks.length === 0 ? (
          <h1>Список задач пуст</h1>
        ) : (
          filteredTasks.map((elem, index) => <SoloTask key={elem._id} index={index} {...elem} />)
        )}
      </div>
    </section>
  );
}

export default Tasks;
