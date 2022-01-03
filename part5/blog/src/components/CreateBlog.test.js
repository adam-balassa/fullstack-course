import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import CreateBlog from './CreateBlog'

describe('<CreateBlog />', () => {
  let component
  const onCreateBlog = jest.fn()

  beforeEach(() => {
    component = render(
      <CreateBlog onCreateBlog={onCreateBlog}/>
    )
  })

  test('calls onCreateBlog with correct details', () => {
    const titleInput = component.getByLabelText('Title')
    const authorInput = component.getByLabelText('Author')
    const urlInput = component.getByLabelText('Url')
    const form = component.container.querySelector('form')


    fireEvent.change(titleInput, { target: { value: 'test title' } })
    fireEvent.change(authorInput, { target: { value: 'test author' } })
    fireEvent.change(urlInput, { target: { value: 'test.url' } })
    fireEvent.submit(form)

    expect(onCreateBlog.mock.calls).toHaveLength(1)
    const createdBlog = onCreateBlog.mock.calls[0][0]
    expect(createdBlog.title).toBe('test title')
    expect(createdBlog.author).toBe('test author')
    expect(createdBlog.url).toBe('test.url')
  })
})