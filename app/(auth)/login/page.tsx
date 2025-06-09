'use client';
import React, { FormEvent } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    if (response?.ok) {
      router.push('/');
      console.log(response, 'response');
      console.log('response status', response.status);
    } else {
      console.error('Ошибка авторизации:', response?.error);
    }
  };

  return (
    <section className="pt-[80px] pb-[110px]">
      <div className="w-max mx-auto bg-[#201d1b] p-5 border border-gray-400 rounded-lg">
        <div className="flex items-center gap-[10px]">
          <div className="p-8 rounded-full bg-gray-600"></div>
          <div className="flex flex-col gap-[5px]">
            <span className="text-3xl">Вход</span>
            <span className="text-gray-400">Введите данные для входа в аккаунт</span>
          </div>
        </div>
        {/* 
      <div className="flex flex-col gap-[10px] mt-[20px]">
        <Button className="border border-gray-400">Войти через Google</Button>
        <Button className="border border-gray-400" onClick={() => signIn('github')}>
          Войти через GitHub
        </Button>
      </div>

      <div className="text-center mt-[20px]">
        <hr />
      </div> */}

        <form onSubmit={handleSubmit} className="flex flex-col gap-[20px] mt-[30px]">
          <div className="flex flex-col gap-[10px] w-[400px]">
            <legend className="text-lg">Email</legend>
            <Input
              inputSize="custom"
              type="email"
              placeholder="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="flex flex-col gap-[10px] w-[400px]">
            <legend className="text-lg">Пароль</legend>
            <Input
              inputSize="custom"
              type="text"
              placeholder="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button variant="primary" size="custom" type="submit">
            Войти
          </Button>
        </form>

        <div className="ml-[70px] mt-[10px]">
          Нет аккаунта?
          <Button variant="default" type="button" onClick={() => router.push('/register')}>
            Зарегестрироваться
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Login;
