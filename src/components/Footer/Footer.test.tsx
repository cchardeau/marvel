import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Footer from './Footer'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Footer />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const output = renderer.create(<Footer />).toJSON()
  expect(output).toMatchSnapshot()
})
