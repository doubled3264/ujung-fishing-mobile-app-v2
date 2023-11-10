import { IonicVue } from '@ionic/vue'
import { StatusBar, Style } from '@capacitor/status-bar'
import VueSweetalert2 from 'vue-sweetalert2'
import { createApp } from 'vue'
import { SafeAreaController } from '@aashu-dubey/capacitor-statusbar-safe-area'
import App from './App.vue'
import router from './routes'
import store from './store/'
import * as axiosAuth from './middleware/auth'

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css'
import '@ionic/vue/css/structure.css'
import '@ionic/vue/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css'
import '@ionic/vue/css/float-elements.css'
import '@ionic/vue/css/text-alignment.css'
import '@ionic/vue/css/text-transformation.css'
import '@ionic/vue/css/flex-utils.css'
import '@ionic/vue/css/display.css'

/* Theme variables */
import './theme/variables.css'

/* custom style */
import './assets/style/index.scss'

const app = createApp(App)
axiosAuth.start()
app.use(IonicVue)
app.use(router)
app.use(store)
app.use(VueSweetalert2)

// await StatusBar.setOverlaysWebView({ overlay: true })
// await StatusBar.setStyle({ style: Style.Light })
SafeAreaController.injectCSSVariables()

router.isReady().then(() => {
   app.mount('#app')
})
