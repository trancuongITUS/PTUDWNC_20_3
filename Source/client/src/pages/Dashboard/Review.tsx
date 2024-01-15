import { useEffect, useState } from "react";
import { IoPersonOutline } from "react-icons/io5";
import { getCommentsByIdGradeReview, sendReviewRequest, uploadComment } from "../../services/classApi";
import { useStateContext } from "../../context";
import { ToastContainer } from "react-toastify";
import toast from "react-hot-toast";

interface ReviewProps {
    idGradeReview: number;
    idClassStudent: number;
    idClass: number;
    gradeCompositionId: number;
    gradeName: string;
    title: string;
    explanation: string;
    expectationGrade: number;
}

const Review = (reviewProp: ReviewProps) => {
    const [title, setTitle] = useState<string>(reviewProp.title);
    const [explanation, setExplanation] = useState<string>(reviewProp.explanation);
    const [expectationGrade, setExpectationGrade] = useState<number>(reviewProp.expectationGrade);
    const [comments, setComments] = useState<any[]>([]);
    const [comment, setComment] = useState<string>('');
    const [isSendedRequest, setIsSendedRequest] = useState<boolean>(false);
    const stateContext = useStateContext();
    const user: any = stateContext.state.authUser;
    
    useEffect(() => {
        if (comments === null || comments === undefined || comments.length === 0) {
            if (reviewProp.idGradeReview !== 0 && reviewProp.idGradeReview !== null && reviewProp.idGradeReview !== undefined) {
                getCommentsByIdGradeReview(reviewProp.idGradeReview).then((res: any) => {
                    setComments(res);
                });
            }

        }
    }, [])

    const handleSendReviewRequest = () => {
        const param = {
            id_class: reviewProp.idClass,
            id_class_student: reviewProp.idClassStudent,
            id_grade_composition: reviewProp.gradeCompositionId,
            review_title: title,
            student_expectation_grade: expectationGrade,
            student_explanation: explanation,
            is_complete: false
        };

        sendReviewRequest(param).then((res: any) => {
            setIsSendedRequest(true);
            toast.success('Send review request successfully');
            return;
        });
    }

    const handleUploadComment = () => {
        const param = {
            id_grade_review: reviewProp.idGradeReview,
            comment_content: comment,
        };

        uploadComment(param).then((res: any) => {
            toast.success('Upload comment successfully');
            getCommentsByIdGradeReview(reviewProp.idGradeReview).then((resA: any) => {
                setComments(resA);
            });
            return;
        });
    }

    return (
        <>
            <ToastContainer />
            <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-12">
                <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                    <div className="mb-3 justify-between gap-4 sm:flex">
                        <h5 className="text-xl font-semibold text-black dark:text-white">
                            {reviewProp.gradeName}
                        </h5>
                    </div>
                    <hr className="mt-1 mb-4"/>
                    <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                        <div className="w-full sm:w-1/2">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="title"
                            >
                                Title
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-3">
                                    <IoPersonOutline className={'size-6'} />
                                </span>
                                <input
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Review Title"
                                    value={title}
                                    onChange={(e) => {setTitle(e.target.value)}}
                                    disabled={reviewProp.title === null || reviewProp.title === '' || reviewProp.title === undefined ? false : true}
                                />
                            </div>
                        </div>

                        <div className="w-full sm:w-1/2">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="studentExpectationGrade"
                            >
                                Student Expectation Grade
                            </label>
                            <input
                                className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                type="text"
                                name="studentExpectationGrade"
                                id="studentExpectationGrade"
                                placeholder="Expectation Grade"
                                value={expectationGrade}
                                onChange={(e) => {setExpectationGrade(Number(e.target.value))}}
                                disabled={reviewProp.title === null || reviewProp.title === '' || reviewProp.title === undefined ? false : true}
                            />
                        </div>
                    </div>
                    <div className="mb-1">
                        <label
                            className="mb-3 block text-sm font-medium text-black dark:text-white"
                            htmlFor="explanation"
                        >
                            Explanation
                        </label>
                        <div className="relative">
                            <span className="absolute left-4.5 top-4">
                                <svg
                                    className="fill-current"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                    <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                    fill=""
                                    />
                                    <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                    fill=""
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_88_10224">
                                    <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                                </svg>
                            </span>

                            <textarea
                                className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                name="explanation"
                                id="explanation"
                                rows={6}
                                placeholder="Write your explanation here"
                                value={explanation}
                                onChange={(e) => {setExplanation(e.target.value)}}
                                disabled={reviewProp.title === null || reviewProp.title === '' || reviewProp.title === undefined ? false : true}
                            ></textarea>
                        </div>
                    </div>
                    {user?.idRole === 2 && (reviewProp.title === null || reviewProp.title === '' || reviewProp.title === undefined) ? (
                        <div className="flex justify-end gap-4.5">
                            <button
                                className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                                onClick={handleSendReviewRequest}
                            >
                                Send Request
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                    <hr className="mt-1 mb-4"/>
                    
                    {comments.map((comment: any, index: number) => (
                        <div key={index} className="mb-1">
                            <label
                                className="mb-3 block text-sm font-medium text-black dark:text-white"
                                htmlFor="explanation"
                            >
                                {comment.fullname}
                            </label>
                            <div className="relative">
                                <span className="absolute left-4.5 top-4">
                                    <svg
                                        className="fill-current"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 20 20"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                        <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                        fill=""
                                        />
                                        <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                        fill=""
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_88_10224">
                                        <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                    </svg>
                                </span>

                                <textarea
                                    className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                    name="explanation"
                                    id="explanation"
                                    rows={6}
                                    placeholder="Write your explanation here"
                                    value={comment.comment_content}
                                    disabled={true}
                                ></textarea>
                            </div>
                        </div>
                    ))}
                    {reviewProp.title === null || reviewProp.title === '' || reviewProp.title === undefined ? (
                        <></>
                    ) : (
                        <div>

                            <hr className="mt-1 mb-4"/>
                            <div className="mb-1">
                                <div className="relative">
                                    <span className="absolute left-4.5 top-4">
                                        <svg
                                            className="fill-current"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 20 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                        <g opacity="0.8" clipPath="url(#clip0_88_10224)">
                                            <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M1.56524 3.23223C2.03408 2.76339 2.66997 2.5 3.33301 2.5H9.16634C9.62658 2.5 9.99967 2.8731 9.99967 3.33333C9.99967 3.79357 9.62658 4.16667 9.16634 4.16667H3.33301C3.11199 4.16667 2.90003 4.25446 2.74375 4.41074C2.58747 4.56702 2.49967 4.77899 2.49967 5V16.6667C2.49967 16.8877 2.58747 17.0996 2.74375 17.2559C2.90003 17.4122 3.11199 17.5 3.33301 17.5H14.9997C15.2207 17.5 15.4326 17.4122 15.5889 17.2559C15.7452 17.0996 15.833 16.8877 15.833 16.6667V10.8333C15.833 10.3731 16.2061 10 16.6663 10C17.1266 10 17.4997 10.3731 17.4997 10.8333V16.6667C17.4997 17.3297 17.2363 17.9656 16.7674 18.4344C16.2986 18.9033 15.6627 19.1667 14.9997 19.1667H3.33301C2.66997 19.1667 2.03408 18.9033 1.56524 18.4344C1.0964 17.9656 0.833008 17.3297 0.833008 16.6667V5C0.833008 4.33696 1.0964 3.70107 1.56524 3.23223Z"
                                            fill=""
                                            />
                                            <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M16.6664 2.39884C16.4185 2.39884 16.1809 2.49729 16.0056 2.67253L8.25216 10.426L7.81167 12.188L9.57365 11.7475L17.3271 3.99402C17.5023 3.81878 17.6008 3.5811 17.6008 3.33328C17.6008 3.08545 17.5023 2.84777 17.3271 2.67253C17.1519 2.49729 16.9142 2.39884 16.6664 2.39884ZM14.8271 1.49402C15.3149 1.00622 15.9765 0.732178 16.6664 0.732178C17.3562 0.732178 18.0178 1.00622 18.5056 1.49402C18.9934 1.98182 19.2675 2.64342 19.2675 3.33328C19.2675 4.02313 18.9934 4.68473 18.5056 5.17253L10.5889 13.0892C10.4821 13.196 10.3483 13.2718 10.2018 13.3084L6.86847 14.1417C6.58449 14.2127 6.28409 14.1295 6.0771 13.9225C5.87012 13.7156 5.78691 13.4151 5.85791 13.1312L6.69124 9.79783C6.72787 9.65131 6.80364 9.51749 6.91044 9.41069L14.8271 1.49402Z"
                                            fill=""
                                            />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_88_10224">
                                            <rect width="20" height="20" fill="white" />
                                            </clipPath>
                                        </defs>
                                        </svg>
                                    </span>

                                    <textarea
                                        className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        name="explanation"
                                        id="explanation"
                                        rows={5}
                                        placeholder="Write your comment here"
                                        value={comment}
                                        onChange={(e) => {setComment(e.target.value)}}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex justify-end gap-4.5">
                                <button
                                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                                    onClick={handleUploadComment}
                                >
                                    Comment
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Review;