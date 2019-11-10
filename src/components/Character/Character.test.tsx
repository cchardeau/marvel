import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import Character from './Character'
import { TCharacter } from '../../models/Character'

const mockCharacter: TCharacter = {
  id: 1,
  name: 'name',
  thumbnail: 'https://thumbnail',
  description: 'description', 
  comicsCount: 42,
  comics: []
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Character character={mockCharacter} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const output = renderer.create(<Character character={mockCharacter} />).toJSON()
  expect(output).toMatchSnapshot()
})
