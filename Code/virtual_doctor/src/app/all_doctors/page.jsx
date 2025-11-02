import React from 'react'
import All_Doctor from './Components/All_Doctor'

export default function page() {

  return (
    <div className='mt-28'>
      <section>
        <div className='bg-amber-200 px-8 py-8 flex justify-center'>
          All Doctor image
        </div>
        <div>
          <All_Doctor></All_Doctor>
        </div>
      </section>
    </div>
  )
}