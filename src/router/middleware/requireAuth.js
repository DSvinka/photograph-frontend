import { getMe } from '@/api/auth.js';
import router from '../index.js';

export default async function requireAuth(next, authStore) {
    try {
        const response = await getMe();
        const user = response.data.user;
        authStore.setAuthUser(user);

        if (!user) {
            return next({
                name: 'login',
            });
        }
    } catch (error) {
        document.location.href = '/login';
    }

    return next();
}