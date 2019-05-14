export class User {
    id: string
    firstname: string
    lastnames: string
    username: string
    password: string
    nationality: string;
    gender: string;
    confirmPassword: string
    email: string
    phoneNumber: string
    isActive: boolean
    lastLogin: string
    lockoutEnd: string
    created: string
    roles: Array<Rol>
}

export class Rol {
    id: string
    name: string

}

export class AccountUser {
    id: string;
    access_token: string;
    refresh_token: string;
    email: string;
    display_name: string;
    username: string;
    nationality: string;
    gender: string;
    expires_in: number;
    roles: Array<string>;
}