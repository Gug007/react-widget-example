import React from 'react'

export default ({options, value, onChange}) => {
  return (
    <select onChange={val => onChange(val.target.value)} value={value}>
      <option value='SHOW_ALL'>Все авиакомании</option>
      {options.map(val => (
        <option value={val}>{val}</option>
      ))}
    </select>
  )
}