import { Spinner } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'


const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.3rem;
  background-color: #0000009e;
  width: 80px;
  height: 80px;
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
