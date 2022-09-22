import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { logout } from '../../store/actions/AuthActions';
import { isAuthenticated } from '../../store/selectors/AuthSelectors';

function LogoutPage(props) {
    const dispatch = useDispatch();

    function onLogout() {
        dispatch(logout(props.history));
        window.location.reload();
    }
    return (
        <div onClick={onLogout} style={{color: '#000', fontSize: '13px'}}>
            Đăng xuất
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(LogoutPage));