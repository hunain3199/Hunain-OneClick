import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    let validationErrors = {};

    if (!email) {
      validationErrors.email = 'Email is required';
    }

    if (!password) {
      validationErrors.password = 'Password is required';
    }

    if (!username) {
      validationErrors.username = 'Username is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Handle form submission
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-4 dark:bg-gray-950">
      <div className="mx-auto w-full max-w-md py-8">
        <Card className="space-y-4 p-6 bg-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight  dark:text-gray-50">Sign up for your account</h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Already have an account? <Link className="font-medium underline  hover:text-green-700 " to={'/login'}>Sign in</Link>
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">Name</Label>
              <div className="mt-1">
                <Input autoComplete="name" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm" id="name" name="name" required type="text" onChange={(e) => setUsername(e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">Email address</Label>
              <div className="mt-1">
                <Input autoComplete="email" className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-indigo-500 dark:focus:ring-indigo-500" id="email" name="email" required type="email" onChange={(e) => setEmail(e.target.value)} />
              </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <Label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="password">Password</Label>
              <div className="mt-1">
                <Input className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:outline-none  dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:placeholder-gray-500" name="password" required type="password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>
            <Button className="flex w-full justify-center rounded-md border border-gray-300 hover:bg-gray-200 text-green-700 -600 py-2 px-4 text-sm font-medium  shadow-sm hover:-700 focus:outline-none focus:ring-2  focus:ring-offset-2 dark:-500 dark:hover:-600 dark:focus:ring-indigo-600" type="submit">Sign up</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;
