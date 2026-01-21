import DasboardLayout from "@/layouts/DasboardLayout.vue";
import Login from "@/views/auths/Login.vue";
import AccessControl from "@/views/pages/accesscontrol/AccessControl.vue";
import AuditTrail from "@/views/pages/audit/AuditTrail.vue";
import Dashboard from "@/views/pages/dashboard/dashboard.vue";
import Performance from "@/views/pages/performance/Performance.vue";
import SecurityAlert from "@/views/pages/security/SecurityAlert.vue";
import UserDiretory from "@/views/pages/usersDiretory/UserDiretory.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", name: "Login", component: Login },
    {
      path: "/",
      redirect: "dashboard",
      name: "Dasboard",
      component: DasboardLayout,
      children: [
        { path: "/dashboard", name: "Dashboard", component: Dashboard },
        { path: "/user-directory", name: "UserDiretory", component: UserDiretory },
        { path: "/access-control", name: "AccessControl", component: AccessControl },
        { path: "/performance", name: "Performance", component: Performance },
        { path: "/security-alerts", name: "SecurityAlerts", component: SecurityAlert},
        { path: "/audit-trails", name: "AuditTrails", component:AuditTrail},
      ],
    },
  ],
});

export default router;
