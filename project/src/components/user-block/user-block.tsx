import React from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getAuthorizationStatus, getUserInfo } from '../../store/user-process/selector';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();

  const userInfo = useAppSelector(getUserInfo);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const getUserBlockTemplate = (authStatus: AuthorizationStatus): JSX.Element =>
    authStatus === AuthorizationStatus.Auth ?
      <ul className="user-block">
        {userInfo?.avatarUrl && (
          <li className="user-block__item">
            <div className="user-block__avatar">
              <Link to={AppRoute.MyList}>
                <img
                  src={userInfo?.avatarUrl}
                  alt="User avatar"
                  width="63"
                  height="63"
                />
              </Link>
            </div>
          </li>
        )}
        <li className="user-block__item">
          <Link
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(logoutAction());
            }}
            className="user-block__link"
            to="/"
          >
            Sign out
          </Link>
        </li>
      </ul>
      :
      <div className="user-block">
        <Link to="/login" className="user-block__link">Sign in</Link>
      </div>;

  return getUserBlockTemplate(authorizationStatus);
}

export default UserBlock;
