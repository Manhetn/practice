import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-modal';

import useAppDispatch from '../../core/hooks/useAppDispatch';
import useAppSelector from '../../core/hooks/useAppSelector';
import { getUserData, setUserEmail } from '../../core/store/userSlice';
import { IFieldGroupValidationResult } from '../../core/interfaces';
import { FormInput } from '../common';
import { ValidationService } from '../../core/services';

Modal.setAppElement('#root');

const LoginFormStepSecond: React.FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const userData = useAppSelector(getUserData());
  const [email, setEmail] = useState(userData.email);
  const [modalContent, setModalContent] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setModalContent('Success!');
      } else {
        setModalContent('Error!');
      }
    } catch (error) {
      setModalContent('Error!');
    }
    setModalIsOpen(true);
  };

  const handleGoBack = () => {
    history.goBack();
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  if (!ValidationService.checkNotEmptyField(email) && !userData.agreement) {
    history.push('/login/step-1');
  }

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
      <div className="flex justify-between gap-2">
        <button
          className="pointer-events-auto rounded-md px-4 py-2 text-center font-medium shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50"
          type="button"
          onClick={handleGoBack}
        >
          Back
        </button>
        <button
          className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 disabled:opacity-25"
          type="submit"
          disabled={!validationResult.email.isValid}
          onClick={handleSubmit}
        >
          Confirm
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className=" absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 artboard artboard-demo w-64 h-64"
      >
        <h2 className="text-2xl font-bold mb-4 pb-8">{modalContent}</h2>
        <button
          onClick={closeModal}
          className="pointer-events-auto rounded-md bg-indigo-600 px-3 py-2 text-[0.8125rem] font-semibold leading-5 text-white hover:bg-indigo-500 disabled:opacity-25"
        >
          Close
        </button>
      </Modal>
    </>
  );
};

export default LoginFormStepSecond;
