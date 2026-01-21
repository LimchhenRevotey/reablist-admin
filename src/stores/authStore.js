import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'
import api from '@/api/api';

let dataAdmin = reactive({
    user: null,
    token: localStorage.getItem('token')
});
export const useAuthStore = defineStore('authStore', () => {
    const login = async (email, password) => {
        try {
            const res = await api.post('/auth/login',
                {
                    email: email,
                    password: password
                }
            );
            dataAdmin.user = res.data.data.user;
            dataAdmin.token = res.data.data.token;
            localStorage.setItem('token', dataAdmin.token)
            return true;

        } catch (error) {
            if (error.response && error.response.data) {
                if (!error.response.data.result) {
                    if (error.response.data.message === 'Invalid email or password.') {
                        message_error.value = "Invalid email or password.";
                    } else {
                        message_error.value = error.response.data.message || "Login failed";
                    }
                }
            } else {
                console.error("System Error:", error);
                message_error.value = "An unexpected error occurred.";
            }
            throw error;

        }
    }

    return { dataAdmin, login, };
});
