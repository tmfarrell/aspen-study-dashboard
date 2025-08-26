import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isInviteFlow, setIsInviteFlow] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup' | 'reset' | 'reset-confirm'>('signin');
  const [message, setMessage] = useState<{ type: 'info' | 'success' | 'error'; text: string } | null>(null);
  const [passwordStrength, setPasswordStrength] = useState<'weak' | 'medium' | 'strong' | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    if (password.length < 6) return 'weak';
    if (password.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) return 'strong';
    return 'medium';
  };

  // Enhanced error message handler
  const getErrorMessage = (error: any) => {
    if (error.message.includes('Invalid login credentials')) {
      return 'Invalid email or password. Please check your credentials and try again.';
    }
    if (error.message.includes('Email not confirmed')) {
      return 'Please check your email and click the confirmation link before signing in.';
    }
    if (error.message.includes('User already registered')) {
      return 'An account with this email already exists. Try signing in instead.';
    }
    if (error.message.includes('Password should be at least')) {
      return 'Password must be at least 6 characters long.';
    }
    if (error.message.includes('Invalid email')) {
      return 'Please enter a valid email address.';
    }
    return error.message || 'An unexpected error occurred. Please try again.';
  };

  // Clear message when switching modes
  const switchAuthMode = (mode: 'signin' | 'signup' | 'reset') => {
    setAuthMode(mode);
    setMessage(null);
    setPassword('');
    setConfirmPassword('');
    setPasswordStrength(null);
  };

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/', { replace: true });
      }
    };
    
    // Check URL parameters for different flows
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token') || urlParams.get('access_token');
    const type = urlParams.get('type');
    const error = urlParams.get('error');
    const errorDescription = urlParams.get('error_description');
    
    if (error) {
      setMessage({
        type: 'error',
        text: errorDescription || 'An error occurred during authentication.'
      });
    } else if (token && type === 'invite') {
      setIsInviteFlow(true);
      setMessage({
        type: 'info',
        text: 'Welcome! Please set your password to complete your account setup.'
      });
    } else if (type === 'recovery') {
      setMessage({
        type: 'info',
        text: 'Please enter your new password below.'
      });
      setIsInviteFlow(true);
    } else {
      checkUser();
    }
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setMessage({
          type: 'error',
          text: getErrorMessage(error)
        });
      } else if (data.user) {
        setMessage({
          type: 'success',
          text: 'Successfully signed in! Redirecting...'
        });
        setTimeout(() => navigate('/', { replace: true }), 1000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match. Please ensure both password fields are identical.'
      });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters long.'
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth`,
        },
      });

      if (error) {
        setMessage({
          type: 'error',
          text: getErrorMessage(error)
        });
      } else {
        setMessage({
          type: 'success',
          text: 'Account created successfully! Please check your email to confirm your account before signing in.'
        });
        setTimeout(() => switchAuthMode('signin'), 3000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!email) {
      setMessage({
        type: 'error',
        text: 'Please enter your email address.'
      });
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth?type=recovery`,
      });

      if (error) {
        setMessage({
          type: 'error',
          text: getErrorMessage(error)
        });
      } else {
        setMessage({
          type: 'success',
          text: 'Password reset instructions have been sent to your email. Please check your inbox and follow the instructions.'
        });
        setTimeout(() => switchAuthMode('signin'), 3000);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    
    if (password !== confirmPassword) {
      setMessage({
        type: 'error',
        text: 'Passwords do not match. Please ensure both password fields are identical.'
      });
      return;
    }

    if (password.length < 6) {
      setMessage({
        type: 'error',
        text: 'Password must be at least 6 characters long.'
      });
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) {
        setMessage({
          type: 'error',
          text: getErrorMessage(error)
        });
      } else if (data.user) {
        setMessage({
          type: 'success',
          text: 'Password set successfully! You are now signed in. Redirecting...'
        });
        setTimeout(() => navigate('/', { replace: true }), 1500);
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle password input changes with strength checking
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (value) {
      setPasswordStrength(checkPasswordStrength(value));
    } else {
      setPasswordStrength(null);
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      {/* OM1 Logo and Aspen title top left */}
      <div className="flex items-center justify-center mb-8">
        <img
          src="/om1-logo.png"
          alt="OM1 Logo"
          style={{ maxWidth: 120, height: 'auto' }}
        />
        <span className="text-3xl font-bold text-[#003f7f] ml-4 mt-4">Aspen</span>
      </div>
      <div className="max-w-md mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isInviteFlow ? 'Set Your Password' : 
               authMode === 'signup' ? 'Create Account' :
               authMode === 'reset' ? 'Reset Password' :
               'Sign In'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {message && (
              <Alert variant={message.type === 'error' ? 'destructive' : 'default'} className="mb-4">
                <AlertDescription className={message.type === 'success' ? 'text-green-600' : message.type === 'info' ? 'text-blue-600' : ''}>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}
            {isInviteFlow ? (
              <form onSubmit={handlePasswordSetup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="setup-password">New Password</Label>
                  <Input
                    id="setup-password"
                    type="password"
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    minLength={6}
                  />
                  {passwordStrength && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Password strength:</span>
                      <Badge 
                        variant={passwordStrength === 'strong' ? 'default' : passwordStrength === 'medium' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {passwordStrength}
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#003f7f] hover:bg-[#002a5a]"
                  disabled={loading}
                >
                  {loading ? 'Setting password...' : 'Set Password'}
                </Button>
              </form>
            ) : authMode === 'signup' ? (
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    required
                    minLength={6}
                  />
                  {passwordStrength && (
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">Password strength:</span>
                      <Badge 
                        variant={passwordStrength === 'strong' ? 'default' : passwordStrength === 'medium' ? 'secondary' : 'destructive'}
                        className="text-xs"
                      >
                        {passwordStrength}
                      </Badge>
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground">
                    Use 8+ characters with uppercase, lowercase, and numbers for a strong password.
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">Confirm Password</Label>
                  <Input
                    id="signup-confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#003f7f] hover:bg-[#002a5a]"
                  disabled={loading}
                >
                  {loading ? 'Creating account...' : 'Create Account'}
                </Button>
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => switchAuthMode('signin')}
                    className="text-[#003f7f] hover:underline"
                  >
                    Already have an account? Sign in
                  </button>
                </div>
              </form>
            ) : authMode === 'reset' ? (
              <form onSubmit={handlePasswordReset} className="space-y-4">
                <div className="text-sm text-muted-foreground mb-4">
                  Enter your email address and we'll send you instructions to reset your password.
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reset-email">Email</Label>
                  <Input
                    id="reset-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#003f7f] hover:bg-[#002a5a]"
                  disabled={loading}
                >
                  {loading ? 'Sending reset instructions...' : 'Send Reset Instructions'}
                </Button>
                <div className="text-center text-sm">
                  <button
                    type="button"
                    onClick={() => switchAuthMode('signin')}
                    className="text-[#003f7f] hover:underline"
                  >
                    Back to Sign In
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-[#003f7f] hover:bg-[#002a5a]"
                  disabled={loading}
                >
                  {loading ? 'Signing in...' : 'Sign In'}
                </Button>
                <div className="flex justify-between text-sm">
                  <button
                    type="button"
                    onClick={() => switchAuthMode('signup')}
                    className="text-[#003f7f] hover:underline"
                  >
                    Create an account
                  </button>
                  <button
                    type="button"
                    onClick={() => switchAuthMode('reset')}
                    className="text-[#003f7f] hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
