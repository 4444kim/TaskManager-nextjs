'use client';
import React, { FormEvent, useEffect, useState } from 'react';
import { useAccessToken } from '@/app/hooks/useAccessToken';
import { useParams } from 'next/navigation';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { useRouter } from 'next/navigation';

function Page() {
  const { id } = useParams();
  const { accessToken, isAuthenticated, status } = useAccessToken();
  const [isEdit, setIsEdit] = useState(false);
  const router = useRouter();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    category: '',
    deadline: '',
    createdAt: '',
    updatedAt: '',
  });

  useEffect(() => {
    if (!id || !isAuthenticated) return;

    const getTask = async () => {
      try {
        const res = await fetch(`http://localhost:5050/api/tasks/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) console.log('Ошибка при загрузке задачи');

        const data = await res.json();
        setTask({
          ...data,
          deadline: data.deadline ? data.deadline.slice(0, 10) : '',
          createdAt: data.createdAt ? data.createdAt.slice(0, 10) : '',
          updatedAt: data.updatedAt ? data.updatedAt.slice(0, 10) : '',
        });
      } catch (error) {
        console.error('Ошибка:', error);
      }
    };

    getTask();
  }, [id, status, accessToken, isAuthenticated]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:5050/api/tasks/${id}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      setIsEdit(false);
    } catch (error) {
      console.log(error, 'error in task id');
    }
    router.push('/tasks');
  };

  const deleteTask = async () => {
    try {
      const res = await fetch(`http://localhost:5050/api/tasks/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      router.push('/tasks');
      console.log(res, 'response patch');
    } catch (error) {
      console.log(error, 'error in task id');
    }
  };

  return (
    <section className="w-max mx-auto my-[20px] flex flex-col gap-[35px] p-8 rounded-xl bg-[#1f1a1a] border border-red-800">
      <Button variant="default" className="absolute" onClick={() => router.back()}>
        {'<-'} назад к задачам
      </Button>

      <div className="flex items-center gap-[220px] mt-[60px]">
        <div className="flex flex-col items-start">
          <h2>Детали Задачи</h2>
          <p>Просмотр и редактирование задачи</p>
        </div>

        <div className="flex flex-col items-start">
          <span>Учеба</span>
          <span>Просрочено</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-[30px]">
        <div className="flex flex-col gap-3">
          <label>Название</label>
          {isEdit ? (
            <Input
              type="text"
              value={task.title}
              onChange={(event) => setTask({ ...task, title: event.target.value })}
            />
          ) : (
            <span className="text-lg bg-[#1e1c1b] border border-gray-800 rounded-lg px-4 py-2 text-gray-400">
              {task.title || 'пусто'}
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <label>Описание</label>
          {isEdit ? (
            <Input
              type="text"
              value={task.description}
              onChange={(event) => setTask({ ...task, description: event.target.value })}
            />
          ) : (
            <p className="text-lg bg-[#1e1c1b] border border-gray-800 rounded-lg px-4 py-2 text-gray-400">
              {task.description || 'пусто'}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex flex-col items-start gap-3">
            <label>Статус</label>
            {isEdit ? (
              <select
                className="border border-[#551117] p-3 rounded-xl text-lg"
                value={task.status}
                onChange={(event) => setTask({ ...task, status: event.target.value })}>
                <option value="pending">К выполнению</option>
                <option value="in-progress">В процессе</option>
                <option value="completed">Завершено</option>
              </select>
            ) : (
              <span className="text-lg bg-[#1e1c1b] border border-gray-800 rounded-lg px-4 py-2 text-gray-400">
                {task.status || 'пусто'}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-3">
            <label>Категория</label>
            {isEdit ? (
              <select
                className="border border-[#551117] p-3 rounded-xl text-lg"
                value={task.category}
                onChange={(event) => setTask({ ...task, category: event.target.value })}>
                <option value="work">Работа</option>
                <option value="home">Дом</option>
                <option value="study">Учеба</option>
              </select>
            ) : (
              <span className="text-lg bg-[#1e1c1b] border border-gray-800 rounded-lg px-4 py-2 text-gray-400">
                {task.category || 'пусто'}
              </span>
            )}
          </div>
          <div className="flex flex-col items-start gap-3">
            <label>Срок выполнения</label>
            {isEdit ? (
              <Input
                type="date"
                value={task.deadline}
                onChange={(event) => setTask({ ...task, deadline: event.target.value })}
              />
            ) : (
              <span className="text-lg bg-[#1e1c1b] border border-gray-800 rounded-lg px-4 py-2 text-gray-400">
                {task.deadline || 'пусто'}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-start gap-10">
          <span>создано: {task.createdAt}</span>
          <span>обновлено: {task.updatedAt} </span>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="danger" onClick={deleteTask}>
            Удалить задачу
          </Button>
          {isEdit ? (
            <Button
              variant="primary"
              className="w-[190px]"
              onClick={() => setIsEdit(!isEdit)}
              type="button">
              Сохранить изменения
            </Button>
          ) : (
            <Button
              variant="primary"
              className="w-[190px]"
              onClick={() => setIsEdit(!isEdit)}
              type="submit">
              Изменить задачу
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Page;
