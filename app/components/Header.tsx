'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import ProfileIcon from '@/app/icons/ProfileIcon';

export const Header = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const accessToken = session?.accessToken;
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated' || !accessToken) return;

    const fetchAvatar = async () => {
      try {
        const res = await fetch('http://localhost:5050/api/profile', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = await res.json();
        if (data.avatar) {
          setAvatarUrl(`http://localhost:5050${data.avatar}`);
        }
      } catch (err) {
        console.error('Ошибка при получении аватара:', err);
      }
    };

    fetchAvatar();
  }, [status, accessToken]);

  return (
    <header className="bg-[#1c1917]">
      <div className="flex items-center justify-between px-[50px] py-[15px]">
        <div className="flex items-center justify-between gap-5">
          <h2 onClick={() => router.push('/')} className="text-[#FF3B3F] text-2xl cursor-pointer">
            TaskManager
          </h2>
          <button onClick={() => router.push('/')}>Главная</button>
          <button onClick={() => router.push('/tasks')}>Задачи</button>
        </div>
        <div className="flex items-center justify-between gap-5">
          <button onClick={() => router.push('/login')}>Вход</button>
          <button onClick={() => router.push('/register')}>Регистрация</button>
          <button
            onClick={() => router.push('/profile')}
            className="bg-gray-400 p-1 rounded-full w-[40px] h-[40px] flex items-center justify-center overflow-hidden">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt="avatar"
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
            ) : (
              <ProfileIcon className="w-[24px] h-[24px] text-white" />
            )}
          </button>
        </div>
      </div>
      <hr className="border border-gray-500" style={{ borderWidth: '0.1px' }} />
    </header>
  );
};
