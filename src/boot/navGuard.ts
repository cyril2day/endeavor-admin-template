import { boot } from 'quasar/wrappers'
import NProgress from 'nprogress'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
import useUserStore from '@/stores/user'
import { getToken } from '@/utils/storage'


/* Turn off loading spinner
 *
 */
  
NProgress.configure({ showSpinner: false })


/* Define routes accessible by unauthenticated
 * app users.
 */

const whiteList = ['/login', 'auth-redirect']


/**
 * Callback function to pass on beforeGuard hook.
 */

const beforeGuard = async(
  to: RouteLocationNormalized,
  _: RouteLocationNormalized,
  next: NavigationGuardNext 
) => {

  /**
   * Instantiate user store
   */

  const store = useUserStore()

  /**
   * Retrieve token if present from device storage
   */

  store.token = getToken() as string

  // Start the progress bar
  NProgress.start()

  if (store.token) {
    if (to.path === '/login') {
      // If is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // Check whether the user has obtained his permission roles
      if (store.roles.length === 0) {
        try {
          await store.GetUserInfo()

          // Hack: ensure addRoutes is complete
          // Set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch(err) {
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      } else {
        next()
      }
    }
  } else {
    // Has no token
    if (whiteList.indexOf(to.path) !== -1) {
      // In the free login whitelist, go directly
      next()
    } else {
      // Other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
}



// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ router }) => {
  /**
   * Trigger global hook before the actual navigation
   */

  router.beforeEach(beforeGuard)
  
  
  /**
   * Set nprogress to done when route is resolved. Also
   * set the app title.
   */

  router.afterEach((to: RouteLocationNormalized) => {

    // Finish progress bar
    // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
    NProgress.done()

    // set page title
    /*
    const title = settings.title
    if (to.name) document.title = `${to.name?.toString()} - ${title}`
    else document.title = title
    */
  })
})
