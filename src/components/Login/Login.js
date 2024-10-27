import React, { useState, useReducer } from "react";
import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {

  if (action.type === "USER_INPUT") {
    return { value: action.payload, isValid: action.payload.includes("@") }
  }
  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") }
  }

  return { value: "", isValid: false }
}

const passwordReducer = (state, action) => {

  if (action.type === "PASS_INPUT") {
    return { value: action.payload, isValidPass: action.payload.trim().length > 6 }
  }
  if (action.type === "BLUR_PASS") {
    return { value: state.value, isValidPass: state.value.trim().length > 6 }
  }

  return { value: "", isValidPass: false }
}



const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);


  const [emailState, dispatchEmail] = useReducer(emailReducer, { value: "", isValid: null })
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, { value: "", isValidPass: null })

  // useEffect(()=>{
  //   const timer = setTimeout(()=>{setFormIsValid(
  //     enteredEmail.includes("@") && enteredPassword.trim().length > 6
  //   )}, 500)   

  //   return ()=>{
  //     clearTimeout(timer)
  //   }

  // },[enteredEmail, enteredPassword])

  const emailChangeHandler = (event) => {
    //setEnteredEmail(event.target.value);

    dispatchEmail({ type: "USER_INPUT", payload: event.target.value })

    setFormIsValid(
      event.target.value.includes("@") && passwordState.isValidPass
    )
  };

  const passwordChangeHandler = (event) => {
    //setEnteredPassword(event.target.value);

    dispatchPassword({ type: "PASS_INPUT", payload: event.target.value })

    setFormIsValid(
      emailState.isValid && event.target.value.trim().length > 6
    )
  };

  const validateEmailHandler = () => {
    //setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    //setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "BLUR_PASS" })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ""
            }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${passwordState.isValidPass === false ? classes.invalid : ""
            }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
