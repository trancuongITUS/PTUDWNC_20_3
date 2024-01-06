enum Role {
    Admin = 1,
    Student = 2,
    Teacher = 3,
}

export function getIdByRoleName(roleName: string): number | undefined {
    switch (roleName) {
        case 'Admin':
            return Role.Admin;
        case 'Student':
            return Role.Student;
        case 'Teacher':
            return Role.Teacher;
        default:
            return undefined;
    }
}

export function getRoleNameById(roleId: number): string | undefined {
    switch (roleId) {
        case Role.Admin:
            return 'Admin';
        case Role.Student:
            return 'Student';
        case Role.Teacher:
            return 'Teacher';
        default:
            return undefined;
    }
}