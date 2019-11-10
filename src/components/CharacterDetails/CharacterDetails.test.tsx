import React from 'react'
import ReactDOM from 'react-dom'
import renderer from 'react-test-renderer'

import CharacterDetails from './CharacterDetails'
import { TCharacter } from '../../models/Character'

const mockCharacter: TCharacter = {
  id: 1,
  name: 'name',
  thumbnail: 'https://thumbnail.jpg',
  description: 'description',
  comicsCount: 42,
  comics: []
}

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<CharacterDetails character={mockCharacter} />, div)
  ReactDOM.unmountComponentAtNode(div)
})

it('renders correctly', () => {
  const output = renderer.create(<CharacterDetails character={mockCharacter} />).toJSON()
  expect(output).toMatchSnapshot()
})
