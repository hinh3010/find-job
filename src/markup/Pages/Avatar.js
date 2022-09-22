import React from 'react'
import { useSelector } from 'react-redux'
import { BASE_URL } from '../../config/BASE_URL';

export default function Avatar() {

    let url = useSelector(state => state.todoReducers.avatar);

    url.indexOf('https://') === -1 ? url = `${BASE_URL}/${url}` : url = url;
    return (
        <div className="avatar__user">
            <img className="avatar__avatar" src={url} alt="Vui lòng chọn avatar trong phần Profile!!" />
        </div>
    )
}
