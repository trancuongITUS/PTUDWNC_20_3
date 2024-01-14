import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getIsStudentsFinalized, getMembersByClassId, markStudentsFinalized } from "../../services/classApi";
import { ToastContainer, toast } from "react-toastify";
import { useStateContext } from "../../context";
import api from "../../api";

const MemberTable = () => {
    const { id } = useParams<{ id: string }>();
    const [teachers, setTeachers] = useState([]);
    const [students, setStudents] = useState([]);
    const [isFinalized, setIsFinalized] = useState<any>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;

    useEffect(() => {
        getMembersByClassId(Number(id)).then(response => {
            setTeachers(response.teachers);
            setStudents(response.students);
        });
    }, []);

    useEffect(() => {
        getIsStudentsFinalized(Number(id)).then(response => {
            setIsFinalized(response.isFinalized);
        });
    }, [isFinalized]);

    const handleMarkAsFinal = () => {
        if (isFinalized) {
            toast.error('This grade structure has already been finalized.');
            return;
        }
        markStudentsFinalized(Number(id)).then(response => {
            if (response.success) {
                toast.success('Successfully marked as finalized.');
                setIsFinalized(true);
            } else {
                toast.error('Failed to mark as finalized.');
            }
        });
    }

    const handleDownloadStudentTemplate = async () => {
        const response = await api.get('class/create/download-student-for-class-template', {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'UploadStudentForClassTemplate.xlsx');
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    }

    const handleUploadFile = async () => {
        fileInputRef.current?.click();
    }

    const handleFileChange = async (event: any) => {
        const selecttedFile = event.target.files[0];
        const formData = new FormData();
        formData.append('file', selecttedFile);
        formData.append('classId', Number(id).toString());

        await api.post('class/upload-students', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        getMembersByClassId(Number(id)).then(response => {
            setTeachers(response.teachers);
            setStudents(response.students);
        });
    }

    return (
        <>
            <div className="col-span-12 md:mt-6">
                <div className="flex space-x-4">
                    <Link className="hover:underline" to={`/class/${id}/dashboard`}>Dashboard</Link>
                    <Link className="hover:underline" to={`/class/${id}/members`}>Members</Link>
                    <Link className="hover:underline" to={`/class/${id}/grade-stucture`}>Grade Structure</Link>
                    <Link className="hover:underline" to={`/class/${id}/grade-board`}>Gradeboard</Link>
                </div>
                <hr className='md:mb-6'/>
            </div>

            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <ToastContainer />
                <div className="py-6 px-4 md:px-6 xl:px-7.5">
                    <h4 className="text-xl font-semibold text-black dark:text-white">
                        Teachers
                    </h4>
                </div>

                <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium">Fullname</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium">Email</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium">Owner?</p>
                    </div>
                </div>

                
                {teachers.map((teacher: any) => (
                    <div className="grid grid-cols-7 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                        <div className="col-span-3 flex items-center">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                                <p className="text-sm text-black dark:text-white">{teacher.fullname}</p>
                            </div>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">{teacher.email}</p>
                        </div>
                        <div className="col-span-2 hidden items-center sm:flex">
                            <p className="text-sm text-black dark:text-white">{true === teacher.is_owner ? 'TRUE' : 'FALSE'}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                <div className="py-6 px-4 md:px-6 xl:px-7.5 justify-between sm:flex">
                    <div>
                        <h4 className="text-xl font-semibold text-black dark:text-white">
                            Students
                        </h4>
                    </div>
                    {user?.idRole === 3 ? (
                        <div>
                            {!isFinalized ? (<button onClick={handleDownloadStudentTemplate} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Students Template</button>) : (<></>)}
                            {!isFinalized ? (<button onClick={handleUploadFile} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black ml-1 mr-1">Upload</button>) : (<></>)}
                            {!isFinalized ? (<input type="file" accept=".xlsx" ref={fileInputRef} onChange={() => handleFileChange(event)} hidden/>) : (<></>)}
                            <button onClick={handleMarkAsFinal} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Mark as Final</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <p className="font-medium">Fullname</p>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="font-medium">Email</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="font-medium">Student ID</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="font-medium">Mapped?</p>
                    </div>
                </div>

                {students.map((student: any) => (
                    <div className="grid grid-cols-8 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                    <div className="col-span-3 flex items-center">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                            <p className="text-sm text-black dark:text-white">{student.fullname}</p>
                        </div>
                    </div>
                    <div className="col-span-2 hidden items-center sm:flex">
                        <p className="text-sm text-black dark:text-white">{student.email}</p>
                    </div>
                    <div className="col-span-2 flex items-center">
                        <p className="text-sm text-black dark:text-white">{student.student_id}</p>
                    </div>
                    <div className="col-span-1 flex items-center">
                        <p className="text-sm text-black dark:text-white">{true === student.is_mapped ? 'TRUE' : 'FALSE'}</p>
                    </div>
                </div>
                ))}
            </div>
        </>
    );
};

export default MemberTable;
