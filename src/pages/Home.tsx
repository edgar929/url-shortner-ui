import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '../components/common/Button/Button';
import { TextField } from '../components/common/Input/TextField';
import { useAuth } from '../hooks/useAuth';

const urlSchema = z.object({
  url: z.string()
    .url('Please enter a valid URL')
    .min(1, 'URL is required')
});

type UrlFormData = z.infer<typeof urlSchema>;

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema)
  });

  const onSubmit = (data: UrlFormData) => {
    if (!user) {
      navigate('/login');
      return;
    }
    // Redirect to create link page with the URL as a parameter
    navigate('/create', { state: { url: data.url } });
  };

  return (
    <div className="min-h-screen w-screen bg-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <Link to="/" className="text-white font-bold text-xl">
                URL Shortener
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Log in
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign up Free
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Shorten Your Links
          </h1>
          <p className="text-xl text-gray-400">
            Create short links in seconds. No credit card required.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-2xl p-8 mb-20">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <TextField
                label="Paste your long link here"
                type="url"
                placeholder="https://example.com/my-long-url"
                {...register('url')}
                error={errors.url?.message}
                className="w-full"
              />
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg font-medium rounded-lg"
              >
                Get your link for free →
              </Button>
            </div>
          </form>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Your free plan includes:
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              'Unlimited URL Shortening',
              'Basic Analytics',
              'Custom Short Links',
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-lg p-6 text-white"
              >
                <p className="text-lg font-medium">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}; 