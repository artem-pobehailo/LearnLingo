'use client';

import { useEffect, useState } from 'react';
import { getTeachers } from '@/lib/clientApi';
import { Teacher } from '@/types/user';
import TeachersCard from '../TeachersCard/TeachersCard';

export default function TeachersList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  useEffect(() => {
    getTeachers().then(setTeachers);
  }, []);
  console.log(teachers);

  return (
    <div>
      {teachers.map((teacher) => (
        <TeachersCard key={teacher.id} teacher={teacher} />
      ))}
    </div>
  );
}
