import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_AUTHOR } from '../queries'

const SetBirthYear = ({ authors }) => {
  const [ editBirthYear ] = useMutation(EDIT_AUTHOR)
  const [ year, setYear ] = useState('')
  const [ name, setName ] = useState('')

  const submit = () => {
    editBirthYear({ variables: { name, year: Number(year) } })
    setYear('')
    setName('')
  }

  const options = authors.map(author => ({ value: author.name, label: author.name }))

  return <div>
    <h2>Set birth year</h2>
    <form onSubmit={e => { e.preventDefault(); submit() }}>
      <Select options={options} onChange={({ value }) => setName(value)}/>
      <input type='number' value={year} onChange={e => setYear(e.target.value)} placeholder='Birth year...' style={{margin: '1rem 0'}}/>
      <button type='submit'>Edit birth year</button>
    </form>
  </div>
}

export default SetBirthYear