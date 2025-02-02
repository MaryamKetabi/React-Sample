import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const onSubmit = (data: LoginForm) => {
    const success = login(data.email, data.password);
    
    if (!success) {
      alert('Invalid email or password!');
      return;
    }

    navigate('/app/dashboard'); 
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              {...register('email', { 
                required: 'Email is required', 
                pattern: { value: /^[^@]+@[^@]+\.[^@]+$/, message: 'Invalid email format' }
              })}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              {...register('password', { 
                required: 'Password is required', 
                minLength: { value: 4, message: 'Password must be at least 4 characters' },
                pattern: { value: /^(?=.*[A-Z])(?=.*[\W_]).{4,}$/, message: 'Password must contain at least one uppercase letter and one symbol' }
              })}
              className="w-full border px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-900 text-white py-2 rounded-lg hover:bg-blue-600 transition">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
