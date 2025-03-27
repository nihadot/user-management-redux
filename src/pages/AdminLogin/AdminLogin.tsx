import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { errorToast, successToast } from '../../components/Toast';
import { useNavigate } from 'react-router';
import { protectedRouteFailure, protectedRouteStart, protectedRouteSuccess, signInFailure, signInStart, signInSuccess } from '../../redux/slices/adminSlice';
import { adminLogin, isLoggedAPIAdmin } from '../../services/adminApi';
import { RootState } from '../../redux/store';

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long.")
    .max(30, "Password must be at most 30 characters long.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,30}$/,
      "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character (@$!%*?&)."
    )
    .required("Password is required"),
  email: Yup.string()
    .email("Invalid email format")
    .trim()
    .lowercase()
    .required("Email is required")
});

function LoginPage() {
  const [isHovered, setIsHovered] = useState(false);
  const dispatch = useDispatch();
  const { signInLoading, isAuthenticated } = useSelector((state: RootState) => state.admin);
  const navigate = useNavigate();

  const handleSubmit = async (values: any, { setSubmitting }: { setSubmitting: any }) => {
    try {
      dispatch(signInStart());

      const response = await adminLogin(values);

      dispatch(signInSuccess(response))

      successToast('Logged In Successfully');

      navigate('/admin')

    } catch (error: any) {

      errorToast(error?.response?.data?.message || error.message || 'Error occurred, please try again later');

      dispatch(signInFailure(error?.message));

      navigate('/admin');

    } finally {

      setSubmitting(false);

    }
  };

  const isLogged = async () => {

    dispatch(protectedRouteStart())

    try {
      await isLoggedAPIAdmin();

      dispatch(protectedRouteSuccess())

    } catch (error: any) {

      dispatch(protectedRouteFailure(error))

    }
  }

  useEffect(() => {
    isLogged()
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }

  }, [isAuthenticated, navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-black p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-800 transform transition-all duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-white mb-8 tracking-wider">
          Sign In
        </h2>

        <Formik
          initialValues={{ email: 'exaasmple@gmail.com', password: 'Nihad@123#' }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-300 text-sm font-medium mb-2 transition-colors duration-200 hover:text-white"
                >
                  Email Address
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                  placeholder="you@example.com"
                  disabled={isSubmitting || signInLoading}
                />
                <ErrorMessage
                  name="email"
                  component="span"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="mb-8">
                <label
                  htmlFor="password"
                  className="block text-gray-300 text-sm font-medium mb-2 transition-colors duration-200 hover:text-white"
                >
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full px-4 py-3 bg-gray-900 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
                  placeholder="••••••••"
                  disabled={isSubmitting || signInLoading}
                />
                <ErrorMessage
                  name="password"
                  component="span"
                  className="text-red-500 text-sm mt-1"
                />
              </div>



              <button
                type="submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="w-full bg-white text-black py-3 px-4 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden disabled:opacity-50"
                disabled={isSubmitting || signInLoading}
              >
                <span className="relative z-10">
                  {isSubmitting || signInLoading ? 'Logging in...' : 'Login'}
                </span>
                <span
                  className={`absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 ${isHovered && !(isSubmitting || signInLoading) ? 'scale-x-100' : ''
                    }`}
                />
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;