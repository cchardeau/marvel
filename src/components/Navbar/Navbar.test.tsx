import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Navbar from './Navbar'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Navbar />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const output = renderer.create(<Navbar />).toJSON()
  expect(output).toMatchSnapshot()
})
