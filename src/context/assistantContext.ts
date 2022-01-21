import React from 'react'
import { createAssistant } from '@sberdevices/assistant-client'

export const AssistantContext = React.createContext<ReturnType<typeof createAssistant>>({} as ReturnType<typeof createAssistant>)