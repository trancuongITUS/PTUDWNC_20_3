import { useEffect, useState } from 'react';
import ClassCard from './ClassCard.tsx';
import { getAllClassesAuthenticated } from '../../services/classApi.ts';

const Dashboard = () => {
  const [classes, setClasses] = useState([]);
    useEffect(() => {
      getAllClassesAuthenticated().then(response => {
        setClasses(response.resultList);
      });
  }, []);
  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          My Classes
        </h2>
        
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {classes.map((classItem: any) => (
          <ClassCard classId={classItem.id_class} className={classItem.class_name} ownerName={classItem.owner_name} totalStudent={classItem.total_student}/>
        ))}
      </div>
    </>
  );
};

export default Dashboard;