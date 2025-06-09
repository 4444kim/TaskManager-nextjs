'use client';
import React, { FormEvent } from 'react';
import Input from '@/app/components/ui/Input';
import Button from '@/app/components/ui/Button';
import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import ProfileIcon from '@/app/icons/ProfileIcon';
import { signOut } from 'next-auth/react';
import { useAccessToken } from '@/app/hooks/useAccessToken';

interface userFormData {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: File | string | null;
}

const userFields = [
  { id: 1, label: 'Имя', key: 'firstName' },
  { id: 2, label: 'Фамилия', key: 'lastName' },
  { id: 3, label: 'Email', key: 'email' },
] as const;

function Profile() {
  const [userFormData, setUserFormData] = useState<userFormData>({
    _id: '',
    email: '',
    firstName: '',
    lastName: '',
    avatar: null,
  });
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { accessToken, status, isAuthenticated } = useAccessToken();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setUserFormData(() => ({ ...userFormData, avatar: file }));
  };

  const deleteProfile = async () => {
    if (!isAuthenticated) return;

    try {
      const response = await fetch('http://localhost:5050/api/profile', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        signOut();
      } else {
        console.error('Ошибка при удалении:', await response.json());
      }
    } catch (err) {
      console.log(err, 'error');
    }
  };

  const getProfile = useCallback(async () => {
    if (!isAuthenticated) return;

    console.log(accessToken, 'token in profile');
    try {
      const res = await fetch('http://localhost:5050/api/profile', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const data = await res.json();
      setUserFormData(data);
    } catch (err) {
      console.error('Ошибка при получении профиля:', err);
    }
  }, [status]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      if (status !== 'authenticated') return;

      const formData = new FormData();
      formData.append('firstName', userFormData.firstName);
      formData.append('lastName', userFormData.lastName);
      if (userFormData.avatar instanceof File) {
        formData.append('avatar', userFormData.avatar);
      }

      const response = await fetch('http://localhost:5050/api/profile', {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: formData,
      });
      await getProfile();
      console.log(await response.json(), 'res');
    } catch (err) {
      console.log(err, 'error in profile');
    }
  };

  useEffect(() => {
    if (status === 'authenticated') getProfile();
  }, [status]);

  return (
    <section className="py-[20px] flex flex-col items-center gap-5">
      <h2 className="text-red-400 text-5xl">Мой Профиль</h2>
      <span className="text-xl text-gray-400">Управляйте информацией вашего аккаунта</span>

      <form
        onSubmit={handleSubmit}
        className="border border-[#551117] p-6 rounded-md flex flex-col gap-[20px]">
        <div className="flex items-center gap-[15px]">
          <div className="border border-[#551117] w-[100px] h-[100px] rounded-full relative">
            {isEdit ? (
              <input
                type="file"
                accept="image/*"
                className="absolute top-0 left-0 h-full w-full opacity-0"
                onChange={handleAvatarChange}
              />
            ) : (
              ''
            )}

            {userFormData.avatar ? (
              typeof userFormData.avatar === 'string' ? (
                <Image
                  src={`http://localhost:5050${userFormData.avatar}`}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="rounded-full w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={URL.createObjectURL(userFormData.avatar)}
                  alt="avatar"
                  width={100}
                  height={100}
                  className="rounded-full w-full h-full object-cover"
                />
              )
            ) : (
              <ProfileIcon className="w-[100px] h-[100px]" />
            )}
          </div>

          <div className="flex flex-col gap-[10px]">
            <h3 className="text-3xl">Профиль</h3>
            <span className="">Информация о вашем аккаунте</span>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          {userFields.map((elem) => (
            <div key={elem.id} className="flex flex-col gap-[5px]">
              <label className="text-lg">{elem.label}</label>
              {isEdit ? (
                <Input
                  placeholder={userFormData[elem.key] || '-'}
                  inputSize="custom"
                  value={userFormData[elem.key]}
                  onChange={(event) =>
                    setUserFormData({ ...userFormData, [elem.key]: event.target.value })
                  }
                />
              ) : (
                <span className="text-lg bg-[#1e1c1b] border border-gray-800 rounded-lg px-4 py-2 text-gray-400">
                  {userFormData[elem.key] || '-'}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-[150px]">
          <div className="flex items-center gap-[10px]">
            <Button variant="default" className=" bg-[#38282a]" onClick={() => signOut()}>
              Выйти
            </Button>
            <Button variant="danger" onClick={deleteProfile}>
              Удалить аккаунт
            </Button>
          </div>

          {isEdit ? (
            <Button
              variant="primary"
              type="button"
              onClick={() => setIsEdit(!isEdit)}
              className="w-[200px]">
              cохранить профиль
            </Button>
          ) : (
            <Button
              variant="primary"
              type="submit"
              onClick={() => setIsEdit(!isEdit)}
              className="w-[200px]">
              Редактировать профиль
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}

export default Profile;
