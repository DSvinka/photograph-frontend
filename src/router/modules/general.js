import requireAuth from '@/router/middleware/requireAuth';

export default [
    {
        path: "/",
        name: "Index",
        component: () => import("@/views/Index.vue"),
    },
    {
        path: "/portfolio",
        name: "Portfolio",
        component: () => import("@/views/Portfolio.vue"),
    },
    {
        path: "/reviews",
        name: "Reviews",
        component: () => import("@/views/Reviews.vue"),
    },
]