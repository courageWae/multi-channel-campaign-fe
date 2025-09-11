import React from 'react'
import USSDBuilder from './Builder'
import { Theme } from '@radix-ui/themes';

const CreateSurvey = ({setStep}) => {
  return (
    <Theme accentColor="gray" panelBackground="">
      <USSDBuilder setStep={setStep} />
    </Theme>
  )
}

export default CreateSurvey
