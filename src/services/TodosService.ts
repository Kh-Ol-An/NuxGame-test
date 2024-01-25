import api from '../api/index.ts';

export default class TodosService {
    static async getTodos() {
        return api.get('/todos');
    }

    static async filterTodos(params) {
        return api.get('/todos' + params);
    }

    static async createTodo(params) {
        return api.post('/todos', params);
    }
}