import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useRoleStore = defineStore("roleStore", () => {
  const roles = ref([]);
  let isLoading = ref(false);
  const getRoles = async () => {
    isLoading.value = true;
    try {
      const res = await api.get("/roles");
      roles.value = res.data.data;
    } catch (error) {
      console.error("Error fetching roles:", error);
      throw error;
    } finally {
      isLoading.value = false;
    }
  };
  return { getRoles, roles, isLoading };
});
