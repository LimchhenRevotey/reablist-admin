import DasboardLayout from "@/layouts/DasboardLayout.vue";
import Login from "@/views/auths/Login.vue";
import AccessControl from "@/views/pages/accesscontrol/AccessControl.vue";
import AuditTrail from "@/views/pages/audit/AuditTrail.vue";
import Dashboard from "@/views/pages/dashboard/dashboard.vue";
import Performance from "@/views/pages/performance/Performance.vue";
import EditProfile from "@/views/pages/profile/EditProfile.vue";
import Profile from "@/views/pages/profile/Profile.vue";
import SecurityAlert from "@/views/pages/security/SecurityAlert.vue";
import CreateUser from "@/views/pages/usersDiretory/CreateUser.vue";
import UserDiretory from "@/views/pages/usersDiretory/UserDiretory.vue";
import ViewUser from "@/views/pages/usersDiretory/ViewUser.vue";
import { createRouter, createWebHistory } from "vue-router";
import NotFount from "@/views/pages/notfound/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: Login,
      meta: { title: "Login" },
    },
    {
      path: "/",
      component: DasboardLayout,
      redirect: "/dashboard",
      children: [
        {
          path: "dashboard",
          name: "Dashboard",
          component: Dashboard,
          meta: { title: "Dashboard", role: "ADMIN" },
        },
        {
          path: "profile",

          children: [
            {
              path: "",
              name: "Profile",
              component: Profile,
              meta: { title: "Profile" },
            },
            {
              path: "/editProfile",
              name: "Edit Profile",
              component: EditProfile,
              props: true,
              meta: { title: "Edit Profile" },
            }
          ],
        },
        {
          path: "user-directory",
          children: [
            {
              path: "",
              name: "UserDirectory",
              component: UserDiretory,
              meta: { title: "User Directory" },
            },
            {
              path: "/view-user/:id",
              name: "View-User",
              component: ViewUser,
              props: true,
              meta: { title: "View User" },
            },
            {
              path: "/create-user",
              name: "CreateUser",
              component: CreateUser,
              meta: { title: "Create User" }
            }
          ],
        },
        {
          path: "access-control",
          name: "AccessControl",
          component: AccessControl,
          meta: { title: "Access Control" },
        },
        {
          path: "performance",
          name: "Performance",
          component: Performance,
          meta: { title: "Performance" },
        },
        {
          path: "security-alerts",
          name: "SecurityAlerts",
          component: SecurityAlert,
          meta: { title: "Security Alerts" },
        },
        {
          path: "audit-trails",
          name: "AuditTrails",
          component: AuditTrail,
          meta: { title: "Audit Trails" },
        },

      ],
    },
    { path: "/:catchAll(.*)", component: NotFount }, // 404 Not Found route

  ],
  linkActiveClass: "active",
});

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("token");
  let role = localStorage.getItem("role");
  document.title = to.meta.title ? `${to.meta.title} | ReabList` : "ReabList";
  if (to.name !== "Login") {
    if (!token) {
      next({ name: "Login" });
    } else if (role !== 'ADMIN') {
      localStorage.clear();
      next({ name: "Login" });
    } else {
      next();
    }
  } else if (to.name === "Login" && token && role === 'ADMIN') {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});
export default router;
