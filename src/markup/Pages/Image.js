import React from 'react'
import { BASE_URL } from '../../config/BASE_URL';
import { useSelector } from 'react-redux'

export default function Image() {
    let url = '';
    if(localStorage.getItem('userDetail')) {
        const { user } = JSON.parse(localStorage.getItem('userDetail'));
        url = BASE_URL + '/' + user.imgPaperUrl;
    } else {
        url = BASE_URL + '/' + JSON.parse(localStorage.getItem('urlImage'));
    }
    return (
        <div className="avatar__user">
            <img className="avatar__avatar" src={url} alt="Bạn chưa có chứng nhận !" />
        </div>
    )
}
