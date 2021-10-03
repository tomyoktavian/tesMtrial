import React, { Suspense } from 'react'
import { CompLoading } from 'app/components'

const HrtSuspense = ({ children }) => {
    return <Suspense fallback={<CompLoading />}>{children}</Suspense>
}

export default HrtSuspense
