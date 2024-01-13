import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { getGradeStructureByClassId, getIsGradeStructureFinalized, markGradeStructureFinalized, updateGradeStructure } from '../../services/classApi';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useParams } from 'react-router-dom';
import { useStateContext } from '../../context';

const COLORS_ARRAY = ['#10B981', '#375E83', '#259AE6', '#FFA70B', '#FF5733', '#C70039', '#900C3F', '#6A0573', '#FFD700', '#008080'];

const OPTIONS_CONSTANT: ApexOptions = {
    chart: {
        type: 'donut',
    },
    legend: {
        show: true,
        position: 'bottom',
    },

    plotOptions: {
        pie: {
            donut: {
                size: '65%',
                background: 'transparent',
            },
        },
    },
    dataLabels: {
        enabled: false,
    },
    responsive: [
        {
        breakpoint: 2600,
            options: {
                chart: {
                width: 380,
                },
            },
        },
        {
        breakpoint: 640,
            options: {
                chart: {
                width: 200,
                },
            },
        },
    ],
};

const GradeStructureChart: React.FC = () => {
    const [gradeStructureChart, setGradeStructureChart] = useState([]);
    const [gradeStructureTable, setGradeStructureTable] = useState([]);
    const [series, setSeries] = useState<number[]>([]);
    const [options, setOptions] = useState<ApexOptions>({});
    const [editingGradeId, setEditingGradeId] = useState<number | null>(null);
    const [selectedGrade, setSelectedGrade] = useState<any>(null);
    const [isFinalized, setIsFinalized] = useState<any>(null);
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        getGradeStructureByClassId(Number(id)).then(response => {
            effectGradeStuctureChart(response.resultList);
        });
    }, []);

    useEffect(() => {
        getIsGradeStructureFinalized(Number(id)).then(response => {
            setIsFinalized(response.isFinalized);
        });
    }, [isFinalized]);


    const effectGradeStuctureChart = (obj: any) => {
        setGradeStructureChart(obj);
        setGradeStructureTable(obj.map((grade: any) => {
            grade.isEditting = false;
            grade.grade_scale = Number(grade.grade_scale);
            return grade;
        }));
        setSeries(obj.map((grade: any) => grade.grade_percent));
        setOptions({
            ...OPTIONS_CONSTANT,
            labels: obj.map((grade: any) => grade.grade_name),
            colors: COLORS_ARRAY.slice(0, obj.length),
        });
    }

    const handleInputScaleChange = (grade: any) => (event: any) => {
        const newGradeStructure: any = gradeStructureTable.map((item: any) => {
            if (item.id === grade.id) {
                item.grade_scale = event.target.value;
            }
            return item;
        });
        setGradeStructureTable(newGradeStructure);
    }

    const handleInputPercentChange = (grade: any) => (event: any) => {
        const newGradeStructure: any = gradeStructureTable.map((item: any) => {
            if (item.id === grade.id) {
                item.grade_percent = event.target.value;
            }
            return item;
        });
        setGradeStructureTable(newGradeStructure);
    }

    const handleInputNameChange = (grade: any) => (event: any) => {
        const newGradeStructure: any = gradeStructureTable.map((item: any) => {
            if (item.id === grade.id) {
                item.grade_name = event.target.value;
            }
            return item;
        });
        setGradeStructureTable(newGradeStructure);
    }

    const handleClickRow = (grade: any) => () => {
        setSelectedGrade(grade);
    }

    const handleAdd = () => {
        const newGradeStructure: any = [...gradeStructureTable];
        const ID = new Date().getTime();
        const NEW_GRADE_COMPOSITION = {
            id: ID,
            grade_name: '',
            grade_scale: 0,
            grade_percent: 0,
        }
        newGradeStructure.push(NEW_GRADE_COMPOSITION);
        setEditingGradeId(NEW_GRADE_COMPOSITION.id);
        setGradeStructureTable(newGradeStructure);
    }

    const handleDelete = () => {
        if (!selectedGrade) return;
        const newGradeStructure: any = gradeStructureTable.filter((grade: any) => grade.id !== selectedGrade.id);
        setGradeStructureTable(newGradeStructure);
    }

    const handleMarkAsFinal = () => {
        if (isFinalized) {
            toast.error('This grade structure has already been finalized.');
            return;
        }
        markGradeStructureFinalized(Number(id)).then(response => {
            if (response.success) {
                getIsGradeStructureFinalized(Number(id)).then(response => {
                    setIsFinalized(response.result);
                });
                toast.success('Mark as finalized successfully.');
            } else {
                toast.error('Mark as finalized failed.');
            }
        });
    }

    const handleUpdateGradeStructure = async () => {
        const totalPercent = gradeStructureTable.reduce((total, grade: any) => total + Number(grade.grade_percent), 0);
        if (totalPercent !== 100) {
            toast.error('The total percent of all rows must be 100%.');
            return;
        }

        const newGradeStructure: any = gradeStructureTable.map((grade: any) => {
            return {
                grade_name: grade.grade_name,
                grade_scale: Number(grade.grade_scale),
                grade_percent: Number(grade.grade_percent),
            }
        });
        
        await updateGradeStructure(Number(id), newGradeStructure);
        getGradeStructureByClassId(Number(id)).then(response => {
            effectGradeStuctureChart(response.resultList);
        });
        toast.success('Update grade structure successfully.');
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
                            Grade Structure
                        </h5>
                    </div>
                    {user?.idRole === 3 ? (
                        <div>
                            <button onClick={handleMarkAsFinal} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Mark as Final</button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>

                <div className="mb-2">
                    <div id="gradeStuctureChart" className="mx-auto flex justify-center">
                        <ReactApexChart
                            options={options}
                            series={series}
                            type="donut"
                        />
                    </div>
                </div>

                <hr className="my-4" />

                {!isFinalized && user?.idRole === 3 ? (
                    <div className="flex justify-center space-x-1 mt-4">
                        <button onClick={handleAdd} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Add</button>
                        <button onClick={handleDelete} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Delete</button>
                        <button onClick={handleUpdateGradeStructure} className="px-4 py-0 border border-gray-300 rounded shadow hover:bg-gray-200 hover:text-black">Save</button>
                    </div>
                ) : <></>}

                <div className="mt-4">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5">
                            <div className="col-span-4 hidden items-center sm:flex">
                                <p className="font-medium">Grade Composition</p>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <p className="font-medium">Scale</p>
                            </div>
                            <div className="col-span-2 flex items-center">
                                <p className="font-medium">Percent</p>
                            </div>
                        </div>

                        {gradeStructureTable.map((grade: any, index: number) => (
                            <div key={index} className="grid grid-cols-6 border-t border-stroke py-4.5 px-4 dark:border-strokedark sm:grid-cols-8 md:px-6 2xl:px-7.5" onClick={handleClickRow(grade)}>
                                <div className="col-span-4 hidden items-center sm:flex">
                                    {editingGradeId === grade.id ? (
                                        <input
                                            type="text"
                                            className="w-32 h-8 border border-stroke rounded-sm px-2 text-sm text-black dark:text-white"
                                            onBlur={() => setEditingGradeId(null)}
                                            onChange={handleInputNameChange(grade)}
                                            value={grade.grade_name}
                                        />
                                    ) : (
                                        <p className="text-sm text-black dark:text-white">{grade.grade_name}</p>
                                    )}
                                </div>
                                <div className="col-span-2 flex items-center">
                                    {editingGradeId === grade.id ? (
                                        <input
                                            type="text"
                                            className="w-16 h-8 border border-stroke rounded-sm px-2 text-sm text-black dark:text-white"
                                            onBlur={() => setEditingGradeId(null)}
                                            onChange={handleInputScaleChange(grade)}
                                            value={grade.grade_scale}
                                        />
                                    ) : (
                                        <p className="text-sm text-black dark:text-white" onClick={() => setEditingGradeId(grade.id)}>{grade.grade_scale}</p>
                                    )}
                                </div>
                                <div className="col-span-2 flex items-center">
                                    {editingGradeId === grade.id ? (
                                        <input
                                            type="text"
                                            className="w-16 h-8 border border-stroke rounded-sm px-2 text-sm text-black dark:text-white"
                                            onBlur={() => setEditingGradeId(null)}
                                            onChange={handleInputPercentChange(grade)}
                                            value={grade.grade_percent}
                                        />
                                    ) : (
                                        <p className="text-sm text-black dark:text-white" onClick={() => setEditingGradeId(grade.id)}>{grade.grade_percent}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default GradeStructureChart;
