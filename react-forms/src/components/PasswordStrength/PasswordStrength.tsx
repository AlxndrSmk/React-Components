import { PasswordStrengthProps } from '../../types/types';
import './passwordStrength.scss';

const PasswordStrength = (props: PasswordStrengthProps) => {
  if (!props.password) {
    return null;
  }

  const strengthChecker = () => {
    let strengthValue = 0;
    const regexList = ['[A-Z]', '[a-z]', '[0-9]', '\\W'];
    const strengthText = ['', 'unacceptable', 'weak', 'average', 'good', 'strong'];

    regexList.forEach((regex) => {
      if (new RegExp(regex).test(props.password)) {
        strengthValue += 1;
      }
    });
    if (props.password.length >= 8) {
      strengthValue += 1;
    }
    return { text: strengthText[strengthValue], value: strengthValue };
  };
  return (
    <div>
      <progress
        className={`pwd-checker-bar strength-${strengthChecker().text}`}
        value={strengthChecker().value}
        max="5"
      />
      <p className={`progress-text strength-${strengthChecker().text}`}>{strengthChecker().text}</p>
    </div>
  );
};

export default PasswordStrength;
