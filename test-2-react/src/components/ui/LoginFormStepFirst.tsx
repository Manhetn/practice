import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import useAppDispatch from '../../core/hooks/useAppDispatch';
import useAppSelector from '../../core/hooks/useAppSelector';
import { IFieldGroupValidationResult } from '../../core/interfaces';
import { FormCheckbox, FormInput } from '../common';
import {
  getUserData,
  setUserAgreement,
  setUserEmail,
} from '../../core/store/userSlice';
import { ValidationService } from '../../core/services';

const LoginFormStepFirst: React.FC = () => {
  const userData = useAppSelector(getUserData());
  const dispatch = useAppDispatch();
  const history = useHistory();
  const [email, setEmail] = useState(userData.email);
  const [agreement, setAgreement] = useState(userData.agreement);
  const [validationResult, setValidationResult] =
    useState<IFieldGroupValidationResult>({
      email: {
        isValid: true,
        error: null,
      },
    });
  const [emailTimer, setEmailTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);
  const [holdTimer, setHoldTimer] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const handleHoldStart = () => {
    if (email && agreement) {
      setHoldTimer(
        setTimeout(() => {
          history.push('/login/step-2');
        }, 500)
      );
    }
  };

  const handleHoldInterrupt = () => {
    if (holdTimer) {
      clearInterval(holdTimer);
    }
    setHoldTimer(null);
  };

  return (
    <>
      <div className="flex flex-col justify-start gap-4">
        <FormInput
          label="Email"
          placeholder="Type here"
          value={email}
          errorMessage={validationResult.email.error}
          handleChange={(value) => {
            clearTimeout(emailTimer as ReturnType<typeof setTimeout>);
            setEmail(value);

            setEmailTimer(
              setTimeout(() => {
                const validateResult = ValidationService.validateEmail(value);

                setValidationResult((prev) => ({
                  ...prev,
                  email: validateResult,
                }));

                if (validateResult.isValid) {
                  dispatch(setUserEmail(value));
                }
              }, 404)
            );
          }}
        />
      </div>
      <div className="flex flex-col justify-start gap-8">
        <FormCheckbox
          label="I agree"
          value={agreement}
          handleChange={(value) => {
            setAgreement(value);
            dispatch(setUserAgreement(value));
          }}
        />
        <button
          type="button"
          className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 disabled:opacity-25"
          onPointerDown={handleHoldStart}
          onPointerUp={handleHoldInterrupt}
          onPointerCancel={handleHoldInterrupt}
          disabled={
            !validationResult.email.isValid ||
            !ValidationService.checkNotEmptyField(email) ||
            !agreement
          }
        >
          Hold to proceed
        </button>
      </div>
    </>
  );
};

export default LoginFormStepFirst;
