import { lazy } from 'react'

const AllRoute = [
                   {
                        path: '/user',
                        component: lazy(() => import('../components/CreateUser')),
                        meta: {
                        authRoute: true
                        }
                    },
                    {
                        path: '/formcreate',
                        component: lazy(() => import('../components/crudOpe/FormCreate')),
                        meta: {
                        authRoute: true
                        }
                    },
                    {
                        path: '/FormList',
                        component: lazy(() => import('../components/crudOpe/FormList')),
                        meta: {
                        authRoute: true
                        }
                    },
                    {
                        path: '/formedit/:id',
                        component: lazy(() => import('../components/crudOpe/FormEdit')),
                        meta: {
                        authRoute: true
                        }
                    },
                    {
                        path: '/Auth',
                        component: lazy(() => import('../components/auth/auth.js')),
                        meta: {
                        authRoute: true
                        }
                    },
                    {
                        path: '/form',
                        component: lazy(() => import('../components/crudOpe/FormEdit')),
                        meta: {
                        authRoute: true
                        }
                    },

                ];
 
export default AllRoute;