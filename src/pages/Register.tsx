import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { TextField } from '../components/common/Input/TextField';
import { Button } from '../components/common/Button/Button';
import { useAuth } from '../hooks/useAuth';
import { RegisterFormData, registerSchema } from '../utils/validations';

export const Register = () => {
  const navigate = useNavigate();
  const { register: registerMutation } = useAuth();
  
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerMutation.mutateAsync(data);
      toast.success('Registration successful!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed');
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gray-900 flex flex-col justify-center">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-white">URL Shortener</h1>
        </Link>
        <div className="bg-white py-8 px-6 shadow-xl rounded-lg sm:px-10">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
            Create your account
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Full Name"
              type="text"
              {...register('username')}
              error={errors.username?.message}
            />
            <TextField
              label="Email address"
              type="email"
              {...register('email')}
              error={errors.email?.message}
            />
            <TextField
              label="Password"
              type="password"
              {...register('password')}
              error={errors.password?.message}
            />
            
            <div>
              <Button
                type="submit"
                className="w-full flex justify-center py-3 px-4 text-lg font-medium"
                isLoading={registerMutation.isPending}
              >
                Sign up
              </Button>
            </div>
          </form>
          
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Already have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center py-3 px-4 border border-blue-600 rounded-md shadow-sm text-lg font-medium text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign in instead
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 