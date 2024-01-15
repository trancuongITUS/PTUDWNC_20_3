import { useEffect, useRef, useState } from 'react';
import { getGradeBoardByClassId, getGradeStructureByClassId, getIsGradeBoardFinalized, getIsGradeStructureFinalized, getIsStudentsFinalized, getRClassUser, markGradeBoardFinalized } from '../../services/classApi';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { FaCheck, FaCommentDots, FaPencilAlt } from 'react-icons/fa';
import { useStateContext } from '../../context';
import api from '../../api';

const GradeBoard = () => {
    const [isFinalized, setIsFinalized] = useState<any>(null);
    const [isStudentFinalized, setIsStudentFinalized] = useState<any>(null);
    const [isGradeStuctureFinalized, setIsGradeStuctureFinalized] = useState<any>(null);
    const [gradeStructure, setGradeStructure] = useState<any>([]);
    const { id } = useParams<{ id: string }>();
    const [editingGradeId, setEditingGradeId] = useState<string | null>(null);
    const [gradeBoard, setGradeBoard] = useState<any>([]);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(undefined);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [rClassUser, setRClassUser] = useState<any>([]);
    const stateContext = useStateContext();
    const user: any = stateContext.state.authUser;

    useEffect(() => {
        getGradeStructureByClassId(Number(id)).then(response => {
            setGradeStructure(response.resultList);
        });
    }, []);

    useEffect(() => {
        getGradeBoardByClassId(Number(id)).then(response => {
            if (null === gradeStructure || gradeStructure.length === 0 || undefined === gradeStructure) {
                getGradeStructureByClassId(Number(id)).then(responseGradeStructure => {
                    setGradeStructure(responseGradeStructure.resultList);
                    let NEW_GRADE_BOARD = response.map((grade: any) => {
                        const GRADE_STRUCTURE = responseGradeStructure.resultList.map((item: any) => {
                            return {
                                id: item.id,
                                grade_name: item.grade_name,
                                grade_scale: item.grade_scale,
                                grade_percent: item.grade_percent,
                                grade: grade[item.grade_name]
                            }
                        });
                        grade.total_grade = GRADE_STRUCTURE.reduce((total: number, item: any) => total += Number(item.grade) / Number(item.grade_scale) * Number(item.grade_percent), 0);
                        return {
                            ...grade,
                            GRADE_STRUCTURE
                        }
                    });
                    if (user?.idRole === 2 && rClassUser.is_student_mapped) {
                        NEW_GRADE_BOARD = NEW_GRADE_BOARD.filter((grade: any) => grade.student_id === user?.studentId);
                    }
                    setGradeBoard(NEW_GRADE_BOARD);
                });
            }
            let NEW_GRADE_BOARD = response.map((grade: any) => {
                const GRADE_STRUCTURE = gradeStructure.map((item: any) => {
                    return {
                        id: item.id,
                        grade_name: item.grade_name,
                        grade_scale: item.grade_scale,
                        grade_percent: item.grade_percent,
                        grade: grade[item.grade_name]
                    }
                });
                grade.total_grade = GRADE_STRUCTURE.reduce((total: number, item: any) => total += Number(item.grade) / Number(item.grade_scale) * Number(item.grade_percent), 0);
                return {
                    ...grade,
                    GRADE_STRUCTURE
                }
            });
            if (user?.idRole === 2 && rClassUser.is_student_mapped) {
                NEW_GRADE_BOARD = NEW_GRADE_BOARD.filter((grade: any) => grade.student_id === user?.studentId);
            }
            setGradeBoard(NEW_GRADE_BOARD);
        });
    }, []);

    useEffect(() => {
        getIsGradeBoardFinalized(Number(id)).then(response => {
            setIsFinalized(response.isFinalized);
        });
    }, [isFinalized]);

    useEffect(() => {
        getIsStudentsFinalized(Number(id)).then(response => {
            setIsStudentFinalized(response.isFinalized);
        });
    }, [isStudentFinalized]);

    useEffect(() => {
        getIsGradeStructureFinalized(Number(id)).then(response => {
            setIsGradeStuctureFinalized(response.isFinalized);
        });
    }, [isGradeStuctureFinalized]);

    useEffect(() => {
        getRClassUser(Number(id), Number(user.id)).then((response) => {
            setRClassUser(response[0]);
        });
    }, []);

    const handleMarkAsFinal = async () => {
        if (isFinalized) {
            toast.error('This grade structure has already been finalized.');
            return;
        }

        markGradeBoardFinalized(Number(id)).then(response => {
            if (response.success) {
                toast.success('Successfully marked as finalized.');
                setIsFinalized(true);
            } else {
                toast.error('Failed to mark as finalized.');
            }
        });
    }

    const handleInputGradeChange = (grade: any, item: any) => (event: any) => {
        const valueAsNumber = Number(event.target.value);
        if (isNaN(valueAsNumber)) {
            toast.error('Grade must be a number');
            return;
        }

        if (valueAsNumber > item.grade_scale) {
            toast.error(`Grade must be less than or equal to ${Number(item.grade_scale)}`);
            return;
        }

        const newGradeBoard = gradeBoard.map((gradeItem: any) => {
            if (gradeItem.student_id === grade.student_id) {
                const newGradeStructure = gradeItem.GRADE_STRUCTURE.map((gradeStructureItem: any) => {
                    if (gradeStructureItem.id === item.id) {
                        return {
                            ...gradeStructureItem,
                            grade: event.target.value
                        }
                    }
                    return gradeStructureItem;
                });
                return {
                    ...gradeItem,
                    GRADE_STRUCTURE: newGradeStructure
                }
            }
            return gradeItem;
        });
        setGradeBoard(newGradeBoard);
    }

    const handleDownloadTemplate = async () => {
        if (selectedTemplate === undefined || selectedTemplate === null || selectedTemplate === '' || selectedTemplate === 0) {
            toast.error('Please select a template');
            return;
        }

        const response = await api.get(`class/download-grade-of-assignment-template/${selectedTemplate}`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `GradeBoard-${selectedTemplate}.xlsx`);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
    }

    const handleDownloadGradeBoard = async () => {
        const response = await api.get(`class/download-grade-board`, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'GradeBoard.xlsx');
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

        await api.post('class/upload-grade-assignment-board', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        getGradeBoardByClassId(Number(id)).then(response => {
            setGradeBoard(response.map((grade: any) => {
                const GRADE_STRUCTURE = gradeStructure.map((item: any) => {
                    return {
                        id: item.id,
                        grade_name: item.grade_name,
                        grade_scale: item.grade_scale,
                        grade_percent: item.grade_percent,
                        grade: grade[item.grade_name]
                    }
                });
                grade.total_grade = GRADE_STRUCTURE.reduce((total: number, item: any) => total += Number(item.grade) / Number(item.grade_scale) * Number(item.grade_percent), 0)
                return {
                    ...grade,
                    GRADE_STRUCTURE
                }
        }))});
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
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                <ToastContainer />
                
                <div className="mb-3 justify-between gap-4 sm:flex">
                    <div>
                        <h5 className="text-xl font-semibold text-black dark:text-white">
                            Gradeboard
                        </h5>
                    </div>
                    
                    {user?.idRole === 3 ? (
                        <div>
                            {isStudentFinalized && isGradeStuctureFinalized ? (
                                <div>
                                    {!isFinalized ? 
                                        (<select value={selectedTemplate} onChange={(e) => setSelectedTemplate(e.target.value)} className="mr-2 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">
                                            <option value={undefined}></option>
                                            {gradeStructure.map((item: any) => (
                                                <option key={item.id} value={item.id}>{item.grade_name}</option>
                                            ))}
                                        </select>)
                                        : (<></>)
                                    }   
                                    {!isFinalized ? (<button onClick={handleDownloadTemplate} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Gradeboard Template</button>) : (<></>)}
                                    {!isFinalized ? (<button onClick={handleUploadFile} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black ml-1 mr-1">Upload</button>) : (<></>)}
                                    {!isFinalized ? (<input type="file" ref={fileInputRef} onChange={() => handleFileChange(event)} accept=".xlsx" hidden/>) : (<></>)}
                                    {!isFinalized ? (<button className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black ml-1 mr-1">Save</button>) : (<></>)}
                                    <button onClick={handleDownloadGradeBoard} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Download Gradeboard</button>
                                    <button onClick={handleMarkAsFinal} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Mark as Final</button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (<></>)}

                    {user?.idRole === 2 ? (
                        <div>
                            {rClassUser.is_student_mapped ? (
                                <div>
                                    <button onClick={handleDownloadGradeBoard} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Download Gradeboard</button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    ) : (<></>)}
                </div>

                {user?.idRole === 3 ? (
                    <div>
                        {isStudentFinalized && isGradeStuctureFinalized ? (
                            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-5">
                                                    Student ID
                                                </th>
                                                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                                                    Fullname
                                                </th>
                                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                                    Actions
                                                </th>
                                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-right">
                                                    Total
                                                </th>
                                                {gradeStructure.map((item: any) => (
                                                    <th key={item.id} className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-right">
                                                        {item.grade_name}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gradeBoard.map((grade: any) => (
                                                <tr key={grade.student_id}>
                                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-5">
                                                        <h5 className="font-medium text-black dark:text-white">
                                                            {grade.student_id}
                                                        </h5>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="text-black dark:text-white">{grade.fullname}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <div className="flex items-center space-x-3.5">
                                                            <button className="hover:text-primary" onClick={() => setEditingGradeId(grade.student_id)}>
                                                                <FaPencilAlt />
                                                            </button>
                                                            <button className="hover:text-primary" onClick={() => setEditingGradeId(null)}>
                                                                <FaCheck />
                                                            </button>
                                                            <Link className="hover:text-primary" to={`/class/grade-review/${id}/${grade.id_class_student}`}>
                                                                <FaCommentDots />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                                                        <p className="text-black dark:text-white">{grade.total_grade}</p>
                                                    </td>
                                                    {grade.GRADE_STRUCTURE.map((item: any) => {
                                                        if (editingGradeId !== grade.student_id) {
                                                            return (
                                                                <td key={item.id} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                                    <p className="text-black dark:text-white text-right">{Number(item.grade)}</p>
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={item.id} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                                                                    <input
                                                                        type="text"
                                                                        className="w-16 h-8 border border-stroke rounded-sm px-2 text-sm text-black dark:text-white"
                                                                        value={item.grade}
                                                                        onChange={handleInputGradeChange(grade, item)}
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 text-center">
                                <h1>PLEASE MARK THE STUDENT-LIST AND GRADE-STRUCTURE IS FINAL TO SEE GRADE BOARD</h1>
                            </div>
                        )}
                    </div>
                ) : (
                    <></>
                )}
                {(user?.idRole === 2 ? (
                    <div>
                        {isStudentFinalized && isGradeStuctureFinalized && rClassUser.is_student_mapped ? (
                            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                                <div className="max-w-full overflow-x-auto">
                                    <table className="w-full table-auto">
                                        <thead>
                                            <tr className="bg-gray-2 text-left dark:bg-meta-4">
                                                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-5">
                                                    Student ID
                                                </th>
                                                <th className="min-w-[180px] py-4 px-4 font-medium text-black dark:text-white">
                                                    Fullname
                                                </th>
                                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white">
                                                    Actions
                                                </th>
                                                <th className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-right">
                                                    Total
                                                </th>
                                                {gradeStructure.map((item: any) => (
                                                    <th key={item.id} className="min-w-[100px] py-4 px-4 font-medium text-black dark:text-white text-right">
                                                        {item.grade_name}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {gradeBoard.map((grade: any) => (
                                                <tr key={grade.student_id}>
                                                    <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-5">
                                                        <h5 className="font-medium text-black dark:text-white">
                                                            {grade.student_id}
                                                        </h5>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <p className="text-black dark:text-white">{grade.fullname}</p>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                        <div className="flex items-center space-x-3.5">
                                                            <button className="hover:text-primary" onClick={() => setEditingGradeId(grade.student_id)}>
                                                                <FaPencilAlt />
                                                            </button>
                                                            <button className="hover:text-primary" onClick={() => setEditingGradeId(null)}>
                                                                <FaCheck />
                                                            </button>
                                                            <Link className="hover:text-primary" to={`/class/grade-review/${id}/${grade.id_class_student}`}>
                                                                <FaCommentDots />
                                                            </Link>
                                                        </div>
                                                    </td>
                                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                                                        <p className="text-black dark:text-white">{grade.total_grade}</p>
                                                    </td>
                                                    {grade.GRADE_STRUCTURE.map((item: any) => {
                                                        if (editingGradeId !== grade.student_id) {
                                                            return (
                                                                <td key={item.id} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                                                    <p className="text-black dark:text-white text-right">{Number(item.grade)}</p>
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td key={item.id} className="border-b border-[#eee] py-5 px-4 dark:border-strokedark text-right">
                                                                    <input
                                                                        type="text"
                                                                        className="w-16 h-8 border border-stroke rounded-sm px-2 text-sm text-black dark:text-white"
                                                                        value={item.grade}
                                                                        onChange={handleInputGradeChange(grade, item)}
                                                                    />
                                                                </td>
                                                            )
                                                        }
                                                    })}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1 text-center">
                                <h1>PLEASE MAPPING YOUR ACCOUNT TO SEE GRADE BOARD</h1>
                            </div>
                        )}
                    </div>
                ) : (
                    <></>
                ))}
            </div>
        </>
    );
};

export default GradeBoard;
