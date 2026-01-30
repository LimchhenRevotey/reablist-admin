import { defineStore } from "pinia";
import api from "@/api/api";
import { reactive, ref } from "vue";

export const useNotesStore = defineStore("notesStore", () => {
    let notes = reactive({
        totalItem: null,
        totalPage: null,
    });
    const getAllNotes = async () => {
        try {
            const res = await api.get('/notes?_page=1&_per_page=20&sortBy=updatedAt&sortDir=DESC');
            notes.totalItem = res.data.data.meta.totalItems;
            notes.totalPage = res.data.data.meta.totalPages;
        } catch (error) {
            console.error("Error fetching notes:", error);
            throw error;
        }
    };


    return {getAllNotes,notes};
});