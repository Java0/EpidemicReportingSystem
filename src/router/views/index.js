import Layout from '@/page/index/'
import xxwlMain from '@/views/wel'
export default [{
    path: '/wel',
    component: Layout,
    redirect: '',
    children: [{
        path: 'index',
        name: '首页',
        meta: {
            i18n: 'dashboard',
            isAuth : false
        },
        component: () =>
            import( /* webpackChunkName: "views" */ '@/views/wel'),
        children: [{
            path: 'epidemic_audit',
            name: '报备审批',
            meta: {
                i18n: 'dashboard',
                isAuth : false
            },
            components:{
                xxwl:()=>import( /* webpackChunkName: "views" */ '@/views/epidemic_report/epidemic_audit/auditIndex')
            }
        },{
            path: 'nucleic_acid',
            name: '核酸安排',
            meta: {
                i18n: 'dashboard',
                isAuth : false
            },
            components:{
                xxwl:()=>import( /* webpackChunkName: "views" */ '@/views/epidemic_report/nucleic_acid/nucleicAcidIndex.vue')
            }
        },{
            path: 'user_management',
            name: '用户管理',
            meta: {
                i18n: 'dashboard',
                isAuth : false
            },
            components:{
                xxwl:()=>import( /* webpackChunkName: "views" */ '@/views/epidemic_report/user_management/userManagementIndex.vue')
            }
        },{
            path: 'draftBox',
            name: '草稿箱',
            meta: {
                i18n: 'dashboard',
                isAuth : false
            },
            components:{
                xxwl:()=>import( /* webpackChunkName: "views" */ '@/views/xxwl/draftBox/draftBoxIndex.vue')
            }
        },{
            path: 'recycleBin',
            name: '回收站',
            meta: {
                i18n: 'dashboard',
                isAuth : false
            },
            components:{
                xxwl:()=>import( /* webpackChunkName: "views" */ '@/views/xxwl/recycleBin/recycleBinIndex.vue')
            }
        },{
            path: 'userGroup',
            name: '用户分组',
            meta: {
                i18n: 'dashboard',
                isAuth : false
            },
            components:{
                xxwl:()=>import( /* webpackChunkName: "views" */ '@/views/xxwl/userGroup/userGroupIndex.vue')
            }
        }] 
    }]
}, {
    path: '/info',
    component: Layout,
    redirect: '',
    children: [{
        path: 'index',
        name: '个人信息',
        meta: {
            i18n: 'info'
        },
        component: xxwlMain,
        children: [{
            path: 'index',
            name: '个人信息',
            meta: {
                i18n: 'info'
            },
            component: () =>
                import( /* webpackChunkName: "views" */ '@/views/user/info')
        }]
       
    }]
},{
    path: '/test2',
    redirect: '',
    name: '测试集成页面',
    meta: {
        i18n: 'dashboard',
        isAuth : false
    },
    component: () =>
        import( /* webpackChunkName: "views" */ '@/views/test/testTable')
}]
