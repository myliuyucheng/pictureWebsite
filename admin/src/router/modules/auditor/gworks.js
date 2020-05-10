import Gworks from "@/components/gworks/Gworks"
import GworksList from "@/components/gworks/base/GworksList"
import GworksBox from "@/components/gworks/base/GworksBox"

const gworks = {
    path: 'gworks',
    name: 'Gworks',
    component: Gworks,
    meta: {
        title: "作品组审核",
        breadcrumb: true
    },
    children: [{
        path: '',
        name: 'GworksList',
        component: GworksList,
    },{
        path: ':_id',
        name: 'GworksBox',
        component: GworksBox,
        meta: {
            title: "作品组内容",
            breadcrumb: true
        }
    }]
}


export default gworks