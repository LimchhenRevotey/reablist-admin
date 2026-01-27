import { defineStore } from "pinia";
import { ref } from "vue";

export const useSideBarStore = defineStore("sideBarStore", () => {
  const isSideBarOpen = ref(false);
  
  const toggleSidebar = () => {
    isSideBarOpen.value = !isSideBarOpen.value;
  };

  // function បិទ sidebar
  const closeSidebar = () => {
    isSideBarOpen.value = false;
  };
  return { isSideBarOpen, toggleSidebar, closeSidebar };
});
