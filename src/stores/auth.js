import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore({
    id: 'authStore',
    state: () => ({
        user: {
            username: undefined,
            loggedIn: false,
            administrator: false,
            review: {}
        }
    }),

    actions: {
        setAuthUser(user, loggedIn) {
            this.user.loggedIn = loggedIn;
            this.user.administrator = user.administrator;
            this.user.username = user.username;
            this.user.review = user.review;
        },
        setAuthTokens(accessToken, refreshToken) {
            if (accessToken)
                localStorage.setItem("access_token", accessToken)
            else
                localStorage.removeItem("access_token")

            if (refreshToken)
                localStorage.setItem("refresh_token", refreshToken)
            else
                localStorage.removeItem("refresh_token")
        }
    },
})

if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
