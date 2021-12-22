import { StartPage } from './pages/StartPage'
import {
    Routes,
    Route
} from 'react-router-dom'
import { Names } from './pages/Names'
import { Random } from './pages/Random'

function App() {
    return (
        <Routes>
            <Route path="/names" element={<Names />} />
            <Route path="/random" element={<Random />} />
            <Route path="/" element={<StartPage />} />
        </Routes>
    )
}

export default App
