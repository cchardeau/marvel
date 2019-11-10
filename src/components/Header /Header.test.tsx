import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Header from './Header'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Header />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const output = renderer.create(<Header />).toJSON()
  expect(output).toMatchSnapshot()
})
