import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';


function AlertDismissibleExample({message}) {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>¡¡Atención!!</Alert.Heading>
        <p>
            {message}
        </p>
      </Alert>
    );
  }
  return null;
}

export default AlertDismissibleExample;