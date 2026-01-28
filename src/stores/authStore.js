import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api';
import router from '@/router';

export const useAuthStore = defineStore('authStore', () => {
    const message_error = ref("");

    let dataAdmin = reactive({
        user: null,
        token: sessionStorage.getItem('token'),
        role: sessionStorage.getItem('role'),
    });

    const login = async (email, password) => {
        message_error.value = "";

        try {
            const res = await api.post('/auth/login', {
                email: email,
                password: password
            });

            const user = res.data.data.user;
            const token = res.data.data.token;
            const roleName = user.role.name;
            if (roleName !== 'ADMIN') {
                message_error.value = "អ្នកមិនមានសិទ្ធិចូលប្រើប្រាស់ប្រព័ន្ធនេះទេ។ សូមទាក់ទងអ្នកគ្រប់គ្រងប្រព័ន្ធ។";
                throw new Error("UNAUTHORIZED_ROLE");
            }
            dataAdmin.user = user;
            dataAdmin.token = token;
            dataAdmin.role = roleName;
            sessionStorage.setItem('role', roleName)
            sessionStorage.setItem('token', token)
            return true;

        } catch (error) {
            if (error.message === "UNAUTHORIZED_ROLE") {
                throw error;
            }
            if (error.response && error.response.data) {
                if (error.response.data.message === 'Invalid email or password.') {
                    message_error.value = "អ៊ីមែល ឬពាក្យសម្ងាត់ដែលបានបញ្ចូលមិនត្រឹមត្រូវ។";
                } else {
                    message_error.value = error.response.data.message || "Login failed";
                }
            } else {
                console.error("System Error:", error);
                message_error.value = "មានបញ្ហាបច្ចេកទេស សូមព្យាយាមម្តងទៀត។";
            }
            throw error;
        }
    }

    const logout = async () => {
        try {
            await api.delete('/auth/logout')
        } catch (error) {
            console.log(error);
        } finally {
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('role');
            dataAdmin.user = null;
            dataAdmin.token = null;
            router.push('/login');
        }
    }
    return { dataAdmin, login, logout, message_error };
});