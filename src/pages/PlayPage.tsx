import { Button, Container } from '@sberdevices/plasma-ui'
import axios from 'axios'
import React from 'react'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'

const PlayGround = styled.div<{playSize: number}>`
    margin: 3rem auto;
    display: grid;
    grid-template-columns: repeat(${props => props.playSize}, 1fr);
    grid-gap: 0.3rem;
`
const PlayCell = styled.div<{isColored: boolean}>`
    width: 5rem;
    height: 5rem;
    background-color: ${props => props.isColored ? 'red' : 'aqua'};
    border-radius: 8%;
`

const link = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?lang=ru-ru&text=идея&key=dict.1.1.20211222T132610Z.c5187e7ef30aff2e.f22ccc1a1ad50ba343d27c5dd978fb470e758ca2'
export const PlayPage = () => {
    const [state, dispatch] = useStore()
    const pushScreen = usePushScreen()
    // React.useEffect(() => {
    //     axios.get(link).then(res => console.log(res.data))
    // }, [])
    const [coloredCells, setColoredCells] = React.useState<boolean[]>(() => new Array(state.playGroundSize ** 2).fill(false))

    const paintCell = (index: number) => {
        console.log('color cell', index)
        setColoredCells(prev => {
            const newColored = [...prev]
            newColored[index] = true
            return newColored
        })
    }
    console.log(coloredCells)
    const playCells = coloredCells.map((_, i) => (
        <PlayCell
            isColored={coloredCells[i]}
            // style={{color: coloredCells[i] ? 'red' : 'aqua'}}
            // onMouseOver={() => console.log('mouse',i)}
            // onTouchMove={() => console.log('touch',i)}
            // onClick={() => console.log('click', i)}
            // onPointerDown={() => console.log('down', i)}
            // onPointerMoveCapture={() => console.log('down', i)}
            onPointerOverCapture={() => paintCell(i)}
            // onPointerMove={() => console.log('move', i)}
            // onPointerOver={() => console.log('over', i)}
            key={i}
        ></PlayCell>
    ))
    return (
        <Container>
            <AppHeader
                back={false}
                title='Балда онлайн'
            />

            <PlayGround playSize={state.playGroundSize}>
                {playCells}
            </PlayGround>
        </Container>
    )
}
