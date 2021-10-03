import React, { createContext, useState } from 'react'

import { merge } from 'lodash'

import { CompLayoutsettings } from 'app/components/CompLayout/settings'

const SettingsContext = createContext({
    settings: CompLayoutsettings,
    updateSettings: () => {},
})

export const SettingsProvider = ({ settings, children }) => {
    const [currentSettings, setCurrentSettings] = useState(
        settings || CompLayoutsettings
    )

    const handleUpdateSettings = (update = {}) => {
        const marged = merge({}, currentSettings, update)
        setCurrentSettings(marged)
    }

    return (
        <SettingsContext.Provider
            value={{
                settings: currentSettings,
                updateSettings: handleUpdateSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    )
}

export default SettingsContext
