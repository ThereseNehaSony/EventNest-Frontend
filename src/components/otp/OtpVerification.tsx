import React, { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { userSignup,clearError,sendOtp } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface TempData {
  username: string;
  email: string;
  password: string;
  otp?: string;
  role?: string;
}

function OtpVerification({ userData }: { userData: TempData }) {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error } = useSelector((state: any) => state.user);
  console.log(userData, 'userData from otp');

  const [otp1, setOtp1] = useState<string>('');
  const [otp2, setOtp2] = useState<string>('');
  const [otp3, setOtp3] = useState<string>('');
  const [otp4, setOtp4] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(60);
  const [focusedInput, setFocusedInput] = useState<number>(0);
  const [showResend, setShowResend] = useState<boolean>(true);

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (countdown > 0) {
        setCountdown((prev) => prev - 1);
      } else {
        setShowResend(false);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [countdown]);

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    switch (index) {
      case 1:
        setOtp1(value);
        break;
      case 2:
        setOtp2(value);
        break;
      case 3:
        setOtp3(value);
        break;
      case 4:
        setOtp4(value);
        break;
      default:
        break;
    }
    if (value.length === 1 && index <= inputRefs.length - 1) {
      inputRefs[index].current?.focus();
    }
  };

  const handleBackSpace = async (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      switch (index) {
        case 1:
          setOtp1('');
          break;
        case 2:
          setOtp2('');
          break;
        case 3:
          setOtp3('');
          break;
        case 4:
          setOtp4('');
          break;
        default:
          break;
      }
      if (index > 0) {
        inputRefs[index - 2].current?.focus();
      }
    }
  };

  const handleToResendOtp = async () => {
    try {
      console.log('Resending OTP...');
      setCountdown(60);
      setShowResend(true);
      dispatch(clearError()); 
  
      const response = await dispatch(sendOtp(userData.email));
  
      if (response.meta.requestStatus === 'rejected') {
        throw new Error(response.payload || 'Error resending OTP');
      }
      
      toast.success('OTP sent successfully');
    } catch (error) {
      console.error('Error resending OTP:', error);
      toast.error('Failed to resend OTP');
    }
  };

  const userRole = useSelector((state: any) => state.user.role);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const joinedOtp = '' + otp1 + otp2 + otp3 + otp4;
    console.log(joinedOtp, '----------');
    userData.otp = joinedOtp;
    const response = await dispatch(userSignup(userData));
   
    if (response && response.meta.requestStatus !== 'rejected') {
      toast.success('Successfully logged in!');
      if (userRole === 'user') {
        navigate('/');
        
      } else if (userRole === 'host') {
        navigate('/host/home');
      }
    } else {
      if (error) {
        toast.error(error);
      }
    }
  };

  return (
    <section className="h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">OTP Verification</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
            {[otp1, otp2, otp3, otp4].map((otp, index) => (
              <div key={index} className="w-16 h-16">
                <input
                  className="w-full h-full flex flex-col items-center justify-center text-center px-5 outline-none rounded-xl border border-gray-200 text-lg bg-white focus:bg-gray-50 focus:ring-1 ring-blue-700"
                  minLength={1}
                  required
                  ref={inputRefs[index]}
                  maxLength={1}
                  type="text"
                  name={`otp-${index + 1}`}
                  id={`otp-${index + 1}`}
                  value={otp}
                  onFocus={() => setFocusedInput(index)}
                  onChange={(e) => handleOtpChange(index + 1, e.target.value)}
                  onKeyDown={(e) => handleBackSpace(index + 1, e)}
                />
              </div>
            ))}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
          >
            Verify OTP
          </button>
        </form>
        <div className="text-center mt-4">
          {showResend && <span>{` OTP Valid For : (${countdown} sec)`}</span>}
        </div>
        <div className="text-center text-lg-start mt-4 pt-2">
          <p className="small fw-bold mt-2 pt-1 mb-0">
            Didn't receive the OTP?{' '}
            <button className="text-blue-500 hover:underline" onClick={handleToResendOtp} disabled={showResend}>
              Resend
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export default OtpVerification;


