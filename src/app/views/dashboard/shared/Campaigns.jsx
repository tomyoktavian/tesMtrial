import React from 'react'
import { SimpleCard, HrtProgressBar } from 'app/components'

const Campaigns = () => {
    return (
        <div>
            <SimpleCard title="Campaigns">
                <small className="text-muted">Today</small>
                <div className="pt-2" />
                <HrtProgressBar
                    value={75}
                    color="primary"
                    text="Google (102k)"
                />
                <div className="py-1" />
                <HrtProgressBar
                    value={45}
                    color="secondary"
                    text="Twitter (40k)"
                />
                <div className="py-1" />
                <HrtProgressBar
                    value={75}
                    color="primary"
                    text="Tensor (80k)"
                />

                <div className="py-3" />
                <small className="text-muted">Yesterday</small>
                <div className="pt-2" />
                <HrtProgressBar
                    value={75}
                    color="primary"
                    text="Google (102k)"
                />
                <div className="py-1" />
                <HrtProgressBar
                    value={45}
                    color="secondary"
                    text="Twitter (40k)"
                />
                <div className="py-1" />
                <HrtProgressBar
                    value={75}
                    color="primary"
                    text="Tensor (80k)"
                />

                <div className="py-3" />
                <small className="text-muted">Yesterday</small>
                <div className="pt-2" />
                <HrtProgressBar
                    value={75}
                    color="primary"
                    text="Google (102k)"
                />
                <div className="py-1" />
                <HrtProgressBar
                    value={45}
                    color="secondary"
                    text="Twitter (40k)"
                />
                <div className="py-1" />
                <HrtProgressBar
                    value={75}
                    color="primary"
                    text="Tensor (80k)"
                />
            </SimpleCard>
        </div>
    )
}

export default Campaigns
