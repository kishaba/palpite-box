import React from 'react'
import Head from 'next/head'

const PageTitle = ({ title }) => {
  return (
    <head>
      <title>{title} - Palpite Box</title>
    </head>
  )
}

export default PageTitle
