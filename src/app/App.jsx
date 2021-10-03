import '../fake-db'
import React from 'react'
import { Provider } from 'react-redux'
import { Router, Switch, Route, BrowserRouter } from 'react-router-dom'
import AppContext from '../contexts/AppContext'
import history from 'history.js'
import routes from './RootRoutes'
import { Store } from '../redux/Store'
import { GlobalCss, HrtSuspense, HrtTheme, CompLayout } from 'app/components'
import sessionRoutes from './views/sessions/SessionRoutes'
import AuthGuard from './auth/AuthGuard'
import { AuthProvider } from 'contexts/JWTAuthContext'
import { SettingsProvider } from 'contexts/SettingsContext'

const App = () => {
    return (
        <AppContext.Provider value={{ routes }}>
            <Provider store={Store}>
                <SettingsProvider>
                    <HrtTheme>
                        <GlobalCss />
                        <BrowserRouter basename={process.env.PUBLIC_URL}>
                        <Router history={history}>
                            <AuthProvider>
                                <HrtSuspense>
                                    <Switch>
                                        {/* AUTHENTICATION PAGES (SIGNIN, SIGNUP ETC.) */}
                                        {sessionRoutes.map((item, i) => (
                                            <Route
                                                key={i}
                                                path={item.path}
                                                component={item.component}
                                            />
                                        ))}
                                        {/* AUTH PROTECTED DASHBOARD PAGES */}
                                        <AuthGuard>
                                            <CompLayout />{' '}
                                            {/* RETURNS <Layout1/> component */}
                                        </AuthGuard>
                                    </Switch>
                                </HrtSuspense>
                            </AuthProvider>
                        </Router>
                        </BrowserRouter>
                    </HrtTheme>
                </SettingsProvider>
            </Provider>
        </AppContext.Provider>
    )
}

export default App
