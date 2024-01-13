import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { getAllClasses, lockClass, unlockClass } from "../../services/classApi";

const Classes = () => {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        getAllClasses().then(response => {
          setClasses(response.resultList);
        });
    }, []);
    
    const handleLockClass = async (classId: number) => {
        await lockClass(classId);
        getAllClasses().then(response => {
          setClasses(response.resultList);
        });
    };
    
    const handleUnlockClass = async (classId: number) => {
        await unlockClass(classId);
        getAllClasses().then(response => {
          setClasses(response.resultList);
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
                                    ClassName
                                </th>
                                <th className="min-w-[70px] py-4 px-4 font-medium text-black dark:text-white">
                                    Active?
                                </th>
                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                    Owner
                                </th>
                                <th className="py-4 px-4 font-medium text-black dark:text-white">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {classes.map((element: any) => (
                            <tr key={element.id}>
                                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-5">
                                  <h5 className="font-medium text-black dark:text-white">
                                      {element.id}
                                  </h5>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{element.class_name}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{true === element.is_active ? 'TRUE' : 'FALSE'}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <p className="text-black dark:text-white">{element.owner}</p>
                                </td>
                                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                    <div className="flex items-center space-x-3.5">
                                        <button onClick={() => handleLockClass(element.id)} className="hover:text-primary" title="Lock Class">
                                            <FaLock />
                                        </button>
                                        <button onClick={() => handleUnlockClass(element.id)} className="hover:text-primary" title="Unlock Class">
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
  
export default Classes;