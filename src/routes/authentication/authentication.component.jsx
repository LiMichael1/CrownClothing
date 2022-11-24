import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SignUpForm from '../../components/sign-up-form/sign-up-form.component';
import SignInForm from '../../components/sign-in-form/sign-in-form.component';

import { AuthenticationContainer } from './authentication.styles';

import { selectCurrentUser } from '../../store/user/user.selector';

const Authentication = () => {
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // If Signed In, Go to Home Page
  useEffect(() => {
    if (currentUser) navigate('/');
  }, [currentUser]);

  return (
    <AuthenticationContainer>
      <SignInForm />
      <SignUpForm />
    </AuthenticationContainer>
  );
};

export default Authentication;
