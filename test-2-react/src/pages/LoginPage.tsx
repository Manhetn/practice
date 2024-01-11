import { useHistory, useParams } from 'react-router-dom';

import { BasicLayout } from '../layouts';
import { LoginFormStepFirst, LoginFormStepSecond } from '../components/ui';

export type TLoginParams = {
  step: 'step-1' | 'step-2';
};

const LoginPage: React.FC = () => {
  const { step } = useParams<TLoginParams>();
  const history = useHistory();

  if (step !== 'step-1' && step !== 'step-2') {
    history.push('/login/step-1');
  }

  return (
    <BasicLayout>
      <form className="flex flex-col justify-between h-full pb-8">
        {step === 'step-1' ? <LoginFormStepFirst /> : <LoginFormStepSecond />}
      </form>
    </BasicLayout>
  );
};

export default LoginPage;
