import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStateContext } from "../../context";

const CreateClass = () => {
    const navigate = useNavigate();
    const [className, setClassName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);
    const stateContext = useStateContext();
    const user = stateContext.state.authUser;
    
    const handleClassNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setClassName(event.target.value);
    };

    const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(event.target.value);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFile(event.target.files ? event.target.files[0] : null);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!className) {
            toast.error("Please enter class name");
            return;
        }

        if (!description) {
            toast.error("Please enter class description");
            return;
        }

        if (!file) {
            toast.error("Please upload a file");
            return;
        }

        if (className.length > 50) {
            toast.error("Class name must be less than 50 characters");
            return;
        }

        if (description.length > 255) {
            toast.error("Description must be less than 255 characters");
            return;
        }


        const formData = new FormData();
        formData.append('className', className);
        formData.append('description', description);
        formData.append('file', file);
        formData.append('owner', user?.id as string)

        const api = axios.create({
            baseURL: 'http://127.0.0.1:8080/',
            withCredentials: true,
        });
        api.post('/class/create-class', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((response) => {
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        });
    }

    const handleDownloadTemplate = async () => {
        const api = axios.create({
            baseURL: 'http://127.0.0.1:8080/',
            withCredentials: true,
        });
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

    return (
        <>
            <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
                <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
                            <h3 className="font-medium text-black dark:text-white">
                                Create Class Form
                            </h3>
                            <button onClick={() => handleDownloadTemplate()} className="bg-blue-500 hover:bg-blue-700 text-black dark:text-white font-bold py-2 px-4 rounded border border-blue-500 hover:border-blue-700">
                                Students Template
                            </button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="p-6.5">
                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Class Name <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter class name"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={className}
                                        onChange={handleClassNameChange}
                                    />
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Description <span className="text-meta-1">*</span>
                                    </label>
                                    <textarea
                                        rows={6}
                                        placeholder="Enter the class description"
                                        className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    ></textarea>
                                </div>

                                <div className="mb-4.5">
                                    <label className="mb-2.5 block text-black dark:text-white">
                                        Students <span className="text-meta-1">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                                        onChange={handleFileChange}
                                    />
                                </div>

                                <button type="submit" className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray">
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateClass;