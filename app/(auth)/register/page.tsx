'use client';
import React, { FormEvent } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Register() {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5050/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      router.push('/login');
    } catch (error) {
      console.error('Ошибка запроса:', error);
    }
  };

  return (
    <section className="py-[50px]">
      <div className="w-max mx-auto bg-[#201d1b] p-5 border border-gray-400 rounded-lg">
        <div className="flex items-center gap-[10px]">
          <div className="p-8 rounded-full bg-gray-600"></div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-3xl">Регистрация</span>
            <span className="text-gray-400">Создайте новый аккаунт</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] mt-[30px]">
          <div className="flex items-center gap-[20px]">
            <div className="flex flex-col gap-[10px]">
              <legend className="text-lg">Имя</legend>
              <Input
                inputSize="custom"
                type="text"
                placeholder="first name"
                value={userData.firstName}
                onChange={(event) => setUserData({ ...userData, firstName: event.target.value })}
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <legend className="text-lg">Фамилия</legend>
              <Input
                inputSize="custom"
                type="text"
                placeholder="last name"
                value={userData.lastName}
                onChange={(event) => setUserData({ ...userData, lastName: event.target.value })}
              />
            </div>
          </div>

          <div className="flex flex-col gap-[10px]">
            <legend className="text-lg">Email</legend>
            <Input
              inputSize="custom"
              type="email"
              placeholder="user@email.com"
              value={userData.email}
              onChange={(event) => setUserData({ ...userData, email: event.target.value })}
            />
          </div>
          <div className="flex flex-col gap-[10px]">
            <legend className="text-lg">Пароль</legend>
            <Input
              inputSize="custom"
              type="password"
              placeholder="password"
              value={userData.password}
              onChange={(event) => setUserData({ ...userData, password: event.target.value })}
            />
          </div>
          <Button variant="primary" size="custom">
            Зарегестрироваться
          </Button>
        </form>

        <div className="ml-[120px] mt-[10px]">
          Уже есть аккаунт?{' '}
          <Button variant="default" type="button" onClick={() => router.push('/login')}>
            Войти
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Register;
