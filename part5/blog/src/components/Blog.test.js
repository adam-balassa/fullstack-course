import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component
  const user = {
    userName: 'testUser',
    name: 'Test User'
  }
  const blog = {
    title: 'test title',
    author: 'test author',
    url: 'test.url',
    likes: 30,
    user
  }
  const onLike = jest.fn()
  const onDelete = jest.fn()

  beforeEach(() => {
    component = render(
      <Blog blog={blog} user={user} onLike={onLike} onDelete={onDelete}/>
    )
  })

  test('renders a collapsed blog', () => {
    expect(component.container).toHaveTextContent('test title')
    expect(component.container).toHaveTextContent('test author')
    expect(component.container).not.toHaveTextContent('test.url')
    expect(component.container).not.toHaveTextContent(30)
  })

  test('renders an open blog when View is clicked', () => {
    const button = component.getByText('View')
    fireEvent.click(button)

    expect(component.container).toHaveTextContent('test.url')
    expect(component.container).toHaveTextContent(30)
  })

  test('calls onLike when it is clicked', () => {
    const viewButton = component.getByText('View')
    fireEvent.click(viewButton)

    const likeButton = component.getByText('Like')
    expect(likeButton).toBeDefined()
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(onLike.mock.calls).toHaveLength(2)
  })

})