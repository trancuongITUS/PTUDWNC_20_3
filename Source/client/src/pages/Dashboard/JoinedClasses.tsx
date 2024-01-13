import { useEffect, useState } from 'react';
import ClassCard from './ClassCard.tsx';
import { getAllClassesJoined, joinClassByCode } from '../../services/classApi.ts';
import { ToastContainer } from 'react-toastify';
import toast from 'react-hot-toast';

const JoinedClasses = () => {
  const [classes, setClasses] = useState([]);
  const [invitationCode, setInvitationCode] = useState('');
  useEffect(() => {
    getAllClassesJoined().then(response => {
      setClasses(response.resultList);
    });
  }, []);

  const handleJoinClassByCode = () => {
    joinClassByCode(invitationCode).then(response => {
      if (response.success) {
        getAllClassesJoined().then(response => {
          setClasses(response.resultList);
        });
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    })
  }

  return (
    <>
      <ToastContainer />
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Joined Classes
        </h2>
        
        <div>
          <input
              type="text"
              className="w-64 h-6 border-gray-300 rounded shadow hover:bg-gray-200 px-2 text-sm text-black dark:text-white mr-2"
              placeholder='Enter the invitation code'
              value={invitationCode}
              onChange={(e) => setInvitationCode(e.target.value)}
          />
          <button onClick={handleJoinClassByCode} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Join</button>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {classes.map((classItem: any) => (
          <ClassCard classId={classItem.id_class} className={classItem.class_name} ownerName={classItem.owner_name} totalStudent={classItem.total_student}/>
        ))}
      </div>
    </>
  );
};

export default JoinedClasses;