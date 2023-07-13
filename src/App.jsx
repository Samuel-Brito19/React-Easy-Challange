import { login } from './utils';
import './index.css';
import { useState } from 'react';

// Instruções:
// * Você tem um formulário de login INCOMPLETO
// * Não é permitido adicionar novos elementos HTML
// * Não é permitido usar refs
//
// Tarefas:
// todo - O botão de login deve disparar a função login(), importada no topo deste arquivo, e passar os dados necessários.
// todo - Desabilite o botão de Login caso o e-mail esteja em branco OU a senha for menor que 6 dígitos.
// todo - Desabilite o botão de Login equanto você está executando o login.
// todo - Mostre uma mensagem de erro de login() caso o Login falhe. A mensagem deve ser limpa a cada nova tentativa de Login.
// todo - Mostre um alerta caso o login seja efetuado com sucesso (javascript alert). Investigue a função login() para entender como ter sucesso na requisição.

export default function LoginForm() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isButtonDisable, setIsButtonDisable] = useState(true)
  const [error, setError] = useState(null)

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setIsButtonDisable(e.target.value === '' || email === '')
    updateLogin()


  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    updateLogin()
    setIsButtonDisable(e.target.value === '' || password.length < 6)
  }

  const updateLogin = () => {
    if (email && password) {
      setIsButtonDisable(false)
    } else {
      setIsButtonDisable(true)
    }
  }

  const handleLogin = () => {
    let values = { email: email, password: password }
    setError(null)
    setIsButtonDisable(true)

    login(values)
      .then(() => {
        console.log(alert(`Congrats ${email}!`))
      })
      .catch((error) => {
        console.log(error)
        setError(error)

      })
      .finally(() => {
        setIsButtonDisable(false)
      })
  }

  return (
    <div className='wrapper'>
      <div className='login-form'>
        <h1>Login Form 🐞</h1>
        {/* Coloque a mensagem de erro de login na div abaixo. Mostre a div somente se houver uma mensagem de erro. */}
        {error && <div className='errorMessage'>{error.message}</div>}
        <div className='row'>
          <label htmlFor={'email'}>Email</label>
          <input id={'email'} type={'email'} autoComplete='off' value={email}
            onChange={handleEmailChange} />
        </div>
        <div className='row'>
          <label htmlFor={'password'}>Password</label>
          <input id={'password'} type={'password'} value={password} onChange={handlePasswordChange} />
        </div>

        <div className='button'>
          <button disabled={isButtonDisable} onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}