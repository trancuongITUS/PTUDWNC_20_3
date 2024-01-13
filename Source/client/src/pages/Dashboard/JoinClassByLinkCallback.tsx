import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { joinClass } from "../../services/classApi";
import { ToastContainer, toast } from "react-toastify";

const JoinClassByLinkCallback = () => {
    const navigate = useNavigate();
    const { invitationLinkCode } = useParams<{ invitationLinkCode: string }>();
    const hasJoined = useRef(false);

    useEffect(() => {
        if (!hasJoined.current) {
            const classId = invitationLinkCode!.split('-')[1];
            joinClass(Number(classId)).then(response => {
                if (response.success) {
                    toast.success(response.message);
                    navigate('/');
                } else {
                    toast.error(response.message);
                }
            })
            hasJoined.current = true;
        }
    }, [invitationLinkCode]);

    return (
        <>
            <ToastContainer />
        </>
    );
};

export default JoinClassByLinkCallback;