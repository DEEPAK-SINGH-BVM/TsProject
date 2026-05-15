export interface SignupData {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export interface AuthResponse {
    message: string;
    token: string;
    user: User;
}

export interface Shop {
    name: string;   
    description: string;
    category: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    logo: null | string;
}