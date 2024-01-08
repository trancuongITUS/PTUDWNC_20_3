import { useEffect, useRef, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { getAllStudents } from "../../services/userApi";
import { Link } from "react-router-dom";
import axios from "axios";

const Students = () => {
    const [students, setStudents] = useState([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        getAllStudents().then(response => {
            setStudents(response.resultList);
        });
    }, []);

    const handleDownloadTemplate = async () => {
        const api = axios.create({
            baseURL: 'http://127.0.0.1:8080/',
            withCredentials: true,
        });
        const response = await api.get('users/admin/download-mapping-id-studentid-template', {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'MappingID_StudentID_Template.xlsx');
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
        const api = axios.create({
            baseURL: 'http://127.0.0.1:8080/',
            withCredentials: true,
        });

        const response = await api.post('users/admin/upload-mapping-id-studentid', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        getAllStudents().then(response => {
            setStudents(response.resultList);
        });
    }

    return (
      <>
        <Breadcrumb pageName="Manage Students" />
  
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <div className="flex justify-center mb-4">
                    <Link onClick={() => handleDownloadTemplate()} to="#" className="inline-flex items-center justify-center rounded-full bg-black py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-6">Template</Link>
                    <Link onClick={() => handleUploadFile()} to="#" className="inline-flex items-center justify-center rounded-full bg-black py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-6">Upload</Link>
                    <input type="file" accept=".xlsx" ref={fileInputRef} onChange={() => handleFileChange(event)} hidden/>
                    <Link to="#" className="inline-flex items-center justify-center rounded-full bg-black py-2 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-6">Save</Link>
                </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-5">
                                ID
                            </th>
                            <th className="min-w-[110px] py-4 px-4 font-medium text-black dark:text-white">
                                Student ID
                            </th>
                            <th className="min-w-[175px] py-4 px-4 font-medium text-black dark:text-white">
                                Email
                            </th>
                            <th className="min-w-[175px] py-4 px-4 font-medium text-black dark:text-white">
                                Fullname
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student: any) => (
                        <tr key={student.id}>
                            <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-5">
                                <h5 className="font-medium text-black dark:text-white">
                                    {student.id}
                                </h5>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{student.studentId}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{student.email}</p>
                            </td>
                            <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                <p className="text-black dark:text-white">{student.fullname}</p>
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
  
  export default Students;