import { defineStore } from "pinia";
import api from "@/api/api";
import { reactive, ref } from "vue";

export const useNotesStore = defineStore("notesStore", () => {
    let notes = ref([]);
    const getAllNotes = async () => {
        try {
            const res = await api.get('/users/count-notes?_page=1&_per_page=10');
            notes.value= res.data.data?.items;
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };
    return {getAllNotes,notes};
});