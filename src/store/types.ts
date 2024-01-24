interface Geo {
    lat: string;
    lng: string;
}

interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

interface Company {
    name: string;
    catchPhrase: string;
    bs: string;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}

export interface Todo {
    userId: number;
    id: string | number;
    title: string;
    completed: boolean;
}

export interface AuthState {
    user: User;
    isLoading: boolean;
}

export interface TodosState {
    todos: Todo[];
}

export interface RootState {
    auth: AuthState;
    todos: TodosState;
}