import React, { useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../Components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [userEmail, setuserEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const navigate = useNavigate();
  function resetInput() {
    setuserEmail("");
    setConfirmPassword("");
    setPassword("");
  }
  const loginWithGoogle = async () => {
    await signInWithPopup(firebaseAuth, provider).then((userCred) => {
      firebaseAuth.onAuthStateChanged((cred) => {
        if (cred) {
          cred.getIdToken().then((token) => {
            validateUserJWTToken(token).then((data) => {
              resetInput();
            });
            navigate("/", { replace: true });
          });
        }
      });
    });
  };
  const signInWithEmailPass = async () => {
    if (userEmail === "" || password === "") {
      alert("Please fill in all fields.");
    } else if (!/\S+@\S+\.\S+/.test(userEmail) || /\s/.test(userEmail)) {
      alert("Invalid email format.");
    } else {
      signInWithEmailAndPassword(firebaseAuth, userEmail, password).then(
        (userCred) => {
          firebaseAuth.onAuthStateChanged((cred) => {
            if (cred) {
              cred.getIdToken().then((token) => {
                validateUserJWTToken(token).then((data) => {
                  resetInput();
                });
                navigate("/", { replace: true });
              });
            }
          });
        }
      );
    }
  };
  const signUpWithEmailPass = async () => {
    if (userEmail === "" || password === "" || confirmPassword === "") {
      alert("Please fill in all fields.");
    } else if (password !== confirmPassword) {
      alert("Password and confirm password do not match.");
    } else if (password.length < 5) {
      alert("Password must be at least 5 characters long.");
    } else if (!/\d/.test(password)) {
      alert("Password must contain at least one digit.");
    } else if (!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase letter.");
    } else if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase letter.");
    } else if (!/[^a-zA-Z\d]/.test(password)) {
      alert("Password must contain at least one special symbol.");
    } else if (!/\S+@\S+\.\S+/.test(userEmail) || /\s/.test(userEmail)) {
      alert("Invalid email format.");
    } else {
      await createUserWithEmailAndPassword(
        firebaseAuth,
        userEmail,
        password
      ).then((userCred) => {
        firebaseAuth.onAuthStateChanged((cred) => {
          if (cred) {
            cred.getIdToken().then((token) => {
              validateUserJWTToken(token).then((data) => {
                resetInput();
              });
              navigate("/", { replace: true });
            });
          }
        });
      });
    }
  };

  const [isSignUp, setIsSignUp] = useState(false);
  return (
    <div
      className="w-screen h-screen relative flex "
      style={{ overflow: "hidden" }}
    >
      <img
        src={LoginBg}
        alt="login background"
        className="w-full h-full object-cover absolute top-0 left-0"
      />

      <div className="flex flex-col items-center bg-lightOverlay w-[70%] md:w-[508px] h-full z-10 backdrop-blur-[14px] p-4 px-4 py-12">
        <div className="w-full flex items-center justify-center mb-4">
          <img src={Logo} alt="logo image" className="w-[30%]" />
        </div>
        <p className="font-semibold text-headingColor text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-2 -mt-1">
          Flavorful Bites!
        </p>
        <p className="text-sm md:text-base lg:text-[1.5rem] xl:text-3xl text-textColor -mt-1">
          {!isSignUp ? "Sign in with your account" : "Create a new account"}
        </p>
        <div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-2 py-4">
          <LoginInput
            placeHolder="Email..."
            icon={
              <FaEnvelope className="lg:text-2xl md:text-xl text-lg text-textColor" />
            }
            inputState={userEmail}
            inputStateFunction={setuserEmail}
            type="email"
            isSignUp={isSignUp}
          />
          <LoginInput
            placeHolder="Choose a Password"
            icon={
              <FaLock className="lg:text-2xl md:text-xl text-lg text-textColor" />
            }
            inputState={password}
            inputStateFunction={setPassword}
            type="password"
            isSignUp={isSignUp}
          />
          {isSignUp && (
            <LoginInput
              placeHolder="Confirm Password"
              icon={
                <FaLock className="lg:text-2xl md:text-xl text-lg text-textColor" />
              }
              inputState={confirmPassword}
              inputStateFunction={setConfirmPassword}
              type="password"
              isSignUp={isSignUp}
            />
          )}
          {!isSignUp ? (
            <p className="text-lg">
              Don't have an account?{"   "}
              <motion.button
                {...buttonClick}
                className="text-orange-400 underline cursor-pointer bg-transparent outline-none border-none"
                onClick={() => {
                  setIsSignUp(true);
                  resetInput();
                }}
              >
                Create one
              </motion.button>
            </p>
          ) : (
            <p className="text-lg">
              Already have an account?{"   "}
              <motion.button
                {...buttonClick}
                className="text-orange-400 underline cursor-pointer bg-transparent outline-none border-none"
                onClick={() => {
                  setIsSignUp(false);
                  resetInput();
                }}
              >
                Sign-in
              </motion.button>
            </p>
          )}

          {isSignUp ? (
            <motion.button
              {...buttonClick}
              className="w-full px-4 py-2 rounded-md bg-orange-400 cursor-pointer text-white text-xl capitalize hover:bg-orange-500 transition-all duration-150 outline-none select-none"
              onClick={signUpWithEmailPass}
            >
              Sign Up
            </motion.button>
          ) : (
            <motion.button
              {...buttonClick}
              onClick={signInWithEmailPass}
              className="w-full px-4 py-2 rounded-md bg-orange-400 cursor-pointer text-white text-xl capitalize hover:bg-orange-500 transition-all duration-150 outline-none select-none"
            >
              Sign In
            </motion.button>
          )}
        </div>
        <div className="flex items-center justify-between gap-16 w-full">
          <div className="w-[40%] h-[2px] rounded-md bg-white"></div>
          <p className="text-white">or</p>
          <div className="w-[40%] h-[2px] rounded-md bg-white"></div>
        </div>
        <motion.button
          {...buttonClick}
          onClick={loginWithGoogle}
          className="mt-2 md:mt-4 flex items-center justify-center px-8 md:px-16 py-1.5 md:py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-2 md:gap-4 whitespace-nowrap outline-none hover:bg-white transition-all duration-300"
        >
          <FcGoogle className="text-2xl md:text-3xl" />
          <p className="capitalize text-sm md:text-base text-headingColor font-semibold select-none ">
            Continue With Google
          </p>
        </motion.button>
      </div>
    </div>
  );
};

export default Login;
