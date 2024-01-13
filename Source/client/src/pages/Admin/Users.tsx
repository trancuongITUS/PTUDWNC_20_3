import { useEffect, useState } from 'react';
import Breadcrumb from "../../components/Breadcrumb";
import { getAllUsers, lockUser, unlockUser } from '../../services/userApi';
import { getRoleNameById } from '../../enums/role.enum';
import { FaLock, FaLockOpen } from 'react-icons/fa';

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getAllUsers().then(response => {
          setUsers(response.resultList);
        });
    }, []);

    const handleLockAccount = async (userId: number) => {
        await lockUser(userId);
        getAllUsers().then(response => {
            setUsers(response.resultList);
        });
    };
      
    const handleUnlockAccount = async (userId: number) => {
        await unlockUser(userId);
        getAllUsers().then(response => {
            setUsers(response.resultList);
        });
    };

    return (
      <>
        <Breadcrumb pageName="Manage Users" />
  
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-5">
                                ID
                            </th>
                            <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white">
                                Username
                            </th>
                            <th className="min-w-[175px] py-4 px-4 font-medium text-black dark:text-white">
                                Email
                            </th>
                            <th className="min-w-[175px] py-4 px-4 font-medium text-black dark:text-white">
                                Fullname
                            </th>
                            <th className="min-w-[70px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                Google?
                            </th>
                            <th className="min-w-[140px] py-4 px-4 font-medium text-black dark:text-white">
                                Email Verified?
                            </th>
                            <th className="min-w-[70px] py-4 px-4 font-medium text-black dark:text-white">
                                Active?
                            </th>
                            <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                Role
                            </th>
                            <th className="py-4 px-4 font-medium text-black dark:text-white">
                                
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user: any) => (
                        <tr key={user.id}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-5">
                                <h5 className="font-medium text-black dark:text-white">
                                    {user.id}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{user.username}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{user.email}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{user.fullname}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                <p className="text-black dark:text-white">{true === user.isGoogle ? 'TRUE' : 'FALSE'}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{true === user.isVerifiedEmail ? 'TRUE' : 'FALSE'}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{true === user.isActive ? 'TRUE' : 'FALSE'}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{getRoleNameById(user.idRole)}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <div className="flex items-center space-x-3.5">
                                    <button onClick={() => handleLockAccount(user.id)} className="hover:text-primary" title="Lock User">
                                        <FaLock />
                                    </button>
                                    <button onClick={() => handleUnlockAccount(user.id)} className="hover:text-primary" title="Unlock User">
                                        <FaLockOpen />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
      </>
    );
  };
  
  export default Users;