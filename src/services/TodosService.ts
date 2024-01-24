import api from '../api/index.ts';

export default class TodosService {
    static async getTodos() {
        return api.get('/todos');
    }
}