import api from "../api";

export const createClass = async (classData: any) => {
    const response = await api.post<any>('class/create', {classData});
    return response.data;
}

export const getAllClasses = async () => {
    const response = await api.get<any>('class/classes');
    return response.data;
}

export const getAllClassesAuthenticated = async () => {
    const response = await api.get<any>('class/classes-authenticated');
    return response.data;
}

export const getAllClassesJoined = async () => {
    const response = await api.get<any>('class/classes-joined');
    return response.data;
}

export const getGradeStructureByClassId = async (classId: number) => {
    const response = await api.get<any>(`class/grade-structure/${classId}`);
    return response.data;
}

export const updateGradeStructure = async (classId: number, gradeStructure: any) => {
    const response = await api.post<any>(`class/grade-structure/${classId}`, gradeStructure);
    return response.data;
}

export const markGradeStructureFinalized = async (classId: number) => {
    const response = await api.post<any>(`class/grade-structure-finalized/${classId}`);
    return response.data;
}

export const getIsGradeStructureFinalized = async (classId: number) => {
    const response = await api.get<any>(`class/is-grade-structure-finalized/${classId}`);
    return response.data;
}

export const markStudentsFinalized = async (classId: number) => {
    const response = await api.post<any>(`class/students-finalized/${classId}`);
    return response.data;
}

export const getIsStudentsFinalized = async (classId: number) => {
    const response = await api.get<any>(`class/is-students-finalized/${classId}`);
    return response.data;
}

export const getMembersByClassId = async (classId: number) => {
    const response = await api.get<any>(`class/members/${classId}`);
    return response.data;
}

export const joinClass = async (classId: number) => {
    const response = await api.post<any>(`class/join-class-by-link`, {classId});
    return response.data;
}

export const joinClassByCode = async (invitationCode: string) => {
    const response = await api.post<any>(`class/join-class-by-code`, {invitationCode});
    return response.data;
}

export const inviteEmail = async (classId: number, email: string) => {
    const response = await api.post<any>(`class/invite-email`, {classId, email});
    return response.data;
}

export const getGradeBoardByClassId = async (classId: number) => {
    const response = await api.get<any>(`class/grade-board/${classId}`);
    return response.data;
}

export const getIsGradeBoardFinalized = async (classId: number) => {
    const response = await api.get<any>(`class/is-grade-board-finalized/${classId}`);
    return response.data;
}

export const markGradeBoardFinalized = async (classId: number) => {
    const response = await api.post<any>(`class/grade-board-finalized/${classId}`);
    return response.data;
}

export const getRClassUser = async (classId: number, userId: number) => {
    const response = await api.get<any>(`class/r-class-user/${classId}/${userId}`);
    return response.data;
}

export const lockClass = async (classId: number) => {
    const response = await api.post<any>('class/lock-class', {classId});
    return response.data;
}

export const unlockClass = async (classId: number) => {
    const response = await api.post<any>('class/unlock-class', {classId});
    return response.data;
}

export const getClassById = async (classId: number) => {
    const response = await api.get<any>(`class/class-detail/${classId}`);
    return response.data;
}

export const updateClassDetailById = async (classId: number, classDetail: any) => {
    const response = await api.post<any>(`class/update-class-detail/${classId}`, {classDetail});
    return response.data;
}

export const mappingAccountToStudent = async (classId: number, studentId: number, userId: number) => {
    const response = await api.post<any>(`class/mapping-account-to-student`, {classId, studentId, userId});
    return response.data;
}

export const getGradesByIdClassAndIdClassStudent = async (classId: number, idClassStudent: number) => {
    const response = await api.get<any>(`class/grades-by-id-class-id-class-student/${classId}/${idClassStudent}`);
    return response.data;
}

export const sendReviewRequest = async (param: any) => {
    const response = await api.post<any>(`class/send-review-request`, param);
    return response.data;
}

export const getCommentsByIdGradeReview = async (idGradeReview: number) => {
    const response = await api.get<any>(`class/comments-by-id-grade-review/${idGradeReview}`);
    return response.data;
}

export const uploadComment = async (param: any) => {
    const response = await api.post<any>(`class/upload-comment`, param);
    return response.data;
}