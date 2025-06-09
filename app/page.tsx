'use client';

import { useRouter } from 'next/navigation';
import Button from './components/ui/Button';

export default function Home() {
  const staticCard = [
    { id: 1, title: 'Создание Задач', description: 'Легко создавайте и организуйте свои задачи' },
    { id: 2, title: 'Отслеживание', description: 'Следите за прогрессом выполнения' },
    { id: 3, title: 'Эффективность', description: 'Повышайте свою продуктивность' },
  ];

  const router = useRouter();

  return (
    <section className="w-max mx-auto py-[55px] flex flex-col items-center gap-10">
      <p className="text-red-400 text-7xl text-center">
        Управляйте <br /> <span className="text-white">Задачами</span> <br /> Эффективно
      </p>
      <Button variant="primary" size="xl" onClick={() => router.push('/tasks')}>
        Перейти к задачам
      </Button>

      <div className="flex flex-wrap justify-center gap-10">
        {staticCard.map((elem) => (
          <div
            onClick={() => router.push('/tasks')}
            key={elem.id}
            className="w-[300px] relative bg-[#2e2c2b] flex flex-col items-center gap-6 border border-gray-600 px-6 py-10 rounded-xl shadow-md hover:shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer">
            <div className="p-5 rounded-full bg-gradient-to-br from-red-500 to-red-800 absolute -top-5 left-1/2 transform -translate-x-1/2 shadow-lg"></div>
            <h2 className="text-2xl font-semibold text-white mt-10">{elem.title}</h2>
            <p className="text-center text-gray-300">{elem.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
