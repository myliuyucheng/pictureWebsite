import { router,admin,auditor } from "./router/index"
import { getToken } from "@/utils/auth"
import { getAdmin } from "@/utils/isAdmin" 
const whiteList = ["/login"]
import store from "@/store/index"


router.beforeEach(async (to,from,next)=>{
    const hasToken = getToken()
    if(hasToken){
        if(!store.state.is){
            if(store.state.isAdmin === 1){
                router.options.routes = auditor
                router.addRoutes(auditor)
                store.state.is = 1
                next({...to,replace: true})
            }else if (store.state.isAdmin === 2){
                router.options.routes = admin
                router.addRoutes(admin)
                store.state.is = 1
                next({...to,replace: true})
            }
        }
        // console.log(router.options.routes)
        if(to.path === '/login'){
            next({ path: "/" })
        }else{
            next()
        }
    }else{
        if(whiteList.indexOf(to.path) !== -1){
            next()
        }else{
            next(`/login?redirect=${to.path}`)
        }
    }
})

export default router