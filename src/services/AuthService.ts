import api from '../api/index.ts'

export default class AuthService {
    static async login() {
        return api.get('/users')
    }
}
