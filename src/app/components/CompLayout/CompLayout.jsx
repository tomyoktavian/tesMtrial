import React from 'react'
import { CompLayouts } from './index'
import { HrtSuspense } from 'app/components'
import useSettings from 'hooks/useSettings'

const CompLayout = (props) => {
    const { settings } = useSettings()
    const Layout = CompLayouts[settings.activeLayout]

    return (
        <HrtSuspense>
            <Layout {...props} />
        </HrtSuspense>
    )
}

export default CompLayout
