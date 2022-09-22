import React from 'react'
import { useSelector } from 'react-redux'
import Load from '../../images/Logding'

export default function Loading() {
    const status = useSelector(state => state.todoReducers.loading);
    return (
        <div id={`loading`} className={status}>
            {/* <img src={loading} alt="loading" /> */}
            <Load />
        </div>
    )
}
