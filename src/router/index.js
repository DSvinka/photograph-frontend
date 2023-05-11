import {createRouter, createWebHistory} from "vue-router";

import middlewarePipeline from '@/router/middleware/middlewarePipeline.js';

import { useAuthStore } from '@/stores/auth';
import general from "./modules/general.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...general,
    ],
});

router.beforeEach(
    (to, from, next) => {
        const authStore = useAuthStore();

        if (!to.meta.middleware) {
            return next();
        }
        const middleware = to.meta.middleware;

        const context = {
            to,
            from,
            next,
            authStore,
        };

        return middleware[0]({
            ...context,
            next: middlewarePipeline(context, middleware, 1),
        });
    }
);

export default router;