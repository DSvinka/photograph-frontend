import '@/main.scss'
import '@mdi/font/css/materialdesignicons.css'

import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { md3 } from 'vuetify/blueprints'

import colors from 'vuetify/lib/util/colors'

export default createVuetify({
    blueprint: md3,
    icons: {
        defaultSet: 'mdi',
        aliases,
        sets: {mdi}
    },
    theme: {
        defaultTheme: 'light',
        themes: {
            dark: {
                dark: true,
                colors: {
                    primary: "#000000",
                    secondary: "#c2c2c2",

                    background: "#ffffff",
                    surface: "#bbbbbb",

                    info: "#0191f7",
                    error: "#e94f31",
                    success: "#1fb973",
                    warning: "#f0ae2d",

                }
            }
        }
    }
})