import React from 'react'

export default function fragile(fragile) {
    if (fragile) {
        return <div className='text-danger'><strong>Yes</strong></div>
    } else {
        return <div className='text-muted'>No</div>
    }
}