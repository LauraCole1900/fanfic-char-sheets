import { useRouteError } from 'react-router-dom';

const Error = () => {
  const error = useRouteError();
  console.error(error);

  return(
    <>
      <h1>Your princess is in another castle!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className="errorText">{error.statusText || error.message}</p>
    </>
  )
};

export default Error;