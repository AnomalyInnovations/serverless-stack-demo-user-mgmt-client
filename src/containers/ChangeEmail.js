import React, { useState } from "react";
import { Auth } from "aws-amplify";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import "./ChangeEmail.css";
import { useFormFields } from "../libs/hooksLib";

export default function ChangeEmail(props) {
  const [fields, setFields] = useFormFields({
    code: "",
    email: ""
  });
  const [codeSent, setCodeSent] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateEmailForm() {
    return fields.email.length > 0;
  }

  function validateConfirmForm() {
    return fields.code.length > 0;
  }

  async function handleUpdateClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      const user = await Auth.currentAuthenticatedUser();
      await Auth.updateUserAttributes(user, { email: fields.email });
      setCodeSent(true);
    } catch (error) {
      alert(error.message);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.verifyCurrentUserAttributeSubmit("email", fields.code);

      props.history.push("/settings");
    } catch (error) {
      alert(error.message);
      setIsConfirming(false);
    }
  }

  function renderUpdateForm() {
    return (
      <form onSubmit={handleUpdateClick}>
        <FormGroup bsSize="large" controlId="email">
          <ControlLabel>Email</ControlLabel>
          <FormControl
            autoFocus
            type="email"
            value={fields.email}
            onChange={setFields}
          />
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isSendingCode}
          disabled={!validateEmailForm()}
        >
          Update Email
        </LoaderButton>
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <form onSubmit={handleConfirmClick}>
        <FormGroup bsSize="large" controlId="code">
          <ControlLabel>Confirmation Code</ControlLabel>
          <FormControl
            autoFocus
            type="tel"
            value={fields.code}
            onChange={setFields}
          />
          <HelpBlock>
            Please check your email ({fields.email}) for the confirmation code.
          </HelpBlock>
        </FormGroup>
        <LoaderButton
          block
          type="submit"
          bsSize="large"
          isLoading={isConfirming}
          disabled={!validateConfirmForm()}
        >
          Confirm
        </LoaderButton>
      </form>
    );
  }

  return (
    <div className="ChangeEmail">
      {!codeSent ? renderUpdateForm() : renderConfirmationForm()}
    </div>
  );
}
