import React from 'react'

const formsRoutes = [
    {
        path: '/forms/basic',
        component: React.lazy(() => import('./BasicForm')),
    },
    {
        path: '/forms/editor',
        component: React.lazy(() => import('./EditorForm')),
    },
    {
        path: '/forms/upload',
        component: React.lazy(() => import('./UploadForm')),
    },
    {
        path: '/forms/horizontal-stepper',
        component: React.lazy(() => import('./HorizontalStepper')),
    },
    {
        path: '/forms/vertical-stepper',
        component: React.lazy(() => import('./VerticalStepper')),
    },
    {
        path: '/forms/wizard',
        component: React.lazy(() => import('./WizardForm')),
    },
    {
        path: '/forms/invoice-form',
        component: React.lazy(() => import('./invoice-form/InvoiceForm')),
    },
    {
        path: '/forms/order-form',
        component: React.lazy(() => import('./order-form/OrderForm')),
    }
]

export default formsRoutes
