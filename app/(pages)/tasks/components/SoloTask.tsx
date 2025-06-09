import Button from '@/app/components/ui/Button';
import React, { FC } from 'react';
import { iTask } from '@/app/types/types';
import Link from 'next/link';

const SoloTask: FC<iTask & { index: number }> = ({
  title,
  deadline,
  description,
  category,
  status,
  _id,
  index,
}) => {
  const formattedDeadline = new Date(deadline).toLocaleDateString('ru-RU');

  return (
    <div className="flex flex-col gap-[10px] p-8 rounded-xl bg-[#1f1a1a] border border-red-950 w-[320px]">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl">{title}</h2>
        <span className="text-3xl">{index + 1}</span>
      </div>
      <span>{formattedDeadline}</span>
      <span className="text-gray-400">{description}</span>
      <span className="">{category}</span>

      <div className="mt-[20px] flex items-center justify-between">
        <span className="border border-red-800 px-3 py-1 rounded-3xl">{status}</span>
        <Link href={`/tasks/${_id}`}>
          <Button variant="outline">Подробнее</Button>
        </Link>
      </div>
    </div>
  );
};

export default SoloTask;
