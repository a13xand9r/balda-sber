import { StartPage } from './pages/StartPage'
import {
    Routes,
    Route,
    useLocation
} from 'react-router-dom'
import { SettingsPage } from './pages/SettingsPage'
import { Random } from './pages/RandomPage'
import { PlayPage } from './pages/PlayPage'
import { VictoryPage } from './pages/VictoryPage'
import { MultiPlayerSettingsPage } from './pages/MultiPlayerSettingsPage'
import { OpponentDisconnected } from './pages/OpponentDisconnected'
import { RulesPage } from './pages/RulesPage'
import React from 'react'
import { useAssistant } from './hooks/useAssistant'
import { usePushScreen } from './hooks/usePushScreen'

function App() {
    const assistant = useAssistant()
    const location = useLocation()
    React.useEffect(() => {
        if (assistant) {
            assistant.sendAction({
                type: 'START_APP',
                payload: {}
            })
        }
    }, [assistant])

    const pushScreen = usePushScreen()
    // React.useEffect(() => {
    //     console.log(location);
    //     const goMain = () => pushScreen('')
    //     const closeApp = () => assistant.close()
    //     if (location.pathname === '/' || location.pathname === '/start'){
    //         window.onpopstate = closeApp
    //     } else {
    //         window.onpopstate = goMain
    //         console.log(window);
    //     }
    // }, [location])
    return (
        <Routes>
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/multiPlayerSettings" element={<MultiPlayerSettingsPage />} />
            <Route path="/random" element={<Random />} />
            <Route path="/play" element={<PlayPage />} />
            <Route path="/rules" element={<RulesPage />} />
            <Route path="/victory" element={<VictoryPage />} />
            <Route path="/multiPlayerSettings" element={<VictoryPage />} />
            <Route path="/opponentDisconnected" element={<OpponentDisconnected />} />
            <Route path="/" element={<StartPage />} />
        </Routes>
    )
}

export default App
