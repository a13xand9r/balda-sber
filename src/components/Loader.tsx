import { Spinner } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: #0000009e;
  width: 5rem;
  height: 5rem;
  position: fixed;
  top: 42%;
  left: 0;
  right: 0;
  margin: auto;
`

export const Loader = () => {
    return (
        <StyledDiv>
            <Spinner />
        </StyledDiv>
    )
}
