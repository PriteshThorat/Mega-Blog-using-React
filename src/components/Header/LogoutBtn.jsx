import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout as logoutUser} from '../../store/authSlice';

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logout = () => {
        authService.logout().then(() => {
            dispatch(logoutUser());
        });
    };

    return (
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={logout} >
            Logout
        </button>
    );
}

export default LogoutBtn;