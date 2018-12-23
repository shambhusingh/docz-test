import React from 'react'
import {render} from 'react-testing-library'
import Button from './Button'

test('Button is rendered', () => {
  const {getByText} = render(
    <Button className="green" onClick={() => {}}>
      Click me
    </Button>,
  )
  expect(getByText(/click/i).textContent).toMatch('Click me')
})
