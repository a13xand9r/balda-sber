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
            <Route path="/" element={<StartPage />} />
            <Route path="/names" element={<Names />} />
            <Route path="/random" element={<Random />} />
        </Routes>
    )
}

export default App
