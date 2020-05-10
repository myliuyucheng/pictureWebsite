import Works from "@/components/works/Works"
import WorksList from "@/components/works/base/WorksList"
import WorksBox from "@/components/works/base/WorksBox"

const works = {
    path: 'works',
    name: 'Works',
    component: Works,
    meta: {
        title: "作品审核",
        breadcrumb: true
    },
    children: [{
        path: '',
        name: 'WorksList',
        component: WorksList,
    },{
        path: ':_id',
        name: 'WorksBox',
        component: WorksBox,
        meta: {
            title: "作品内容",
            breadcrumb: true
        }
    }]
}


export default works