import { StartPage } from './pages/StartPage'
import {
    Routes,
    Route
} from 'react-router-dom'
import { SettingsPage } from './pages/SettingsPage'
import { Random } from './pages/RandomPage'
import { PlayPage } from './pages/PlayPage'
import { VictoryPage } from './pages/VictoryPage'
import { MultiPlayerSettingsPage } from './pages/MultiPlayerSettingsPage'
import { OpponentDisconnected } from './pages/OpponentDisconnected'
import { RulesPage } from './pages/RulesPage'

function App() {
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
