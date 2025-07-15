import { useState } from 'react'
import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight,
  ArrowLeft
} from 'lucide-react'

interface PasswordStrength {
  score: number
  feedback: string[]
  hasMinLength: boolean
  hasUppercase: boolean
  hasLowercase: boolean
  hasNumber: boolean
  hasSpecialChar: boolean
}

export default function AuthForm() {
  const [mode, setMode] = useState<'signin' | 'signup' | 'reset'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [emailTouched, setEmailTouched] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)

  const { signIn, signUp, resetPassword } = useAuth()

  // Email validation
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  // Password strength calculation
  const calculatePasswordStrength = (password: string): PasswordStrength => {
    const hasMinLength = password.length >= 8
    const hasUppercase = /[A-Z]/.test(password)
    const hasLowercase = /[a-z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

    const criteriaMet = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length
    const score = Math.min(criteriaMet * 20, 100)

    const feedback = []
    if (!hasMinLength) feedback.push('At least 8 characters')
    if (!hasUppercase) feedback.push('One uppercase letter')
    if (!hasLowercase) feedback.push('One lowercase letter')
    if (!hasNumber) feedback.push('One number')
    if (!hasSpecialChar) feedback.push('One special character')

    return {
      score,
      feedback,
      hasMinLength,
      hasUppercase,
      hasLowercase,
      hasNumber,
      hasSpecialChar
    }
  }

  const passwordStrength = calculatePasswordStrength(password)
  const isPasswordValid = passwordStrength.score >= 80
  const doPasswordsMatch = password === confirmPassword && confirmPassword.length > 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    try {
      if (mode === 'signin') {
        const { error } = await signIn(email, password)
        if (error) {
          setError(error.message === 'Invalid login credentials'
            ? 'Invalid email or password. Please try again.'
            : error.message
          )
        }
      } else if (mode === 'signup') {
        if (!isValidEmail(email)) {
          setError('Please enter a valid email address')
          return
        }
        if (!isPasswordValid) {
          setError('Please create a stronger password')
          return
        }
        if (!doPasswordsMatch) {
          setError('Passwords do not match')
          return
        }

        const { error } = await signUp(email, password)
        if (error) {
          setError(error.message)
        } else {
          setMessage('Success! Check your email to verify your account.')
        }
      } else if (mode === 'reset') {
        if (!isValidEmail(email)) {
          setError('Please enter a valid email address')
          return
        }

        const { error } = await resetPassword(email)
        if (error) {
          setError(error.message)
        } else {
          setMessage('Password reset link sent to your email!')
        }
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getPasswordStrengthColor = (score: number) => {
    if (score < 40) return 'bg-red-500'
    if (score < 60) return 'bg-orange-500'
    if (score < 80) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = (score: number) => {
    if (score < 40) return 'Weak'
    if (score < 60) return 'Fair'
    if (score < 80) return 'Good'
    return 'Strong'
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 pb-4">
        <CardTitle className="text-xl font-bold text-center">
          {mode === 'signin' && 'Welcome Back'}
          {mode === 'signup' && 'Join the Fam'}
          {mode === 'reset' && 'Reset password'}
        </CardTitle>
        {/* <p className="text-sm text-muted-foreground text-center">
          {mode === 'signin' && 'Sign in to your account to continue'}
          {mode === 'signup' && 'Join the fam'}
          {mode === 'reset' && 'Enter your email to reset your password'}
        </p> */}
      </CardHeader>

      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={`pl-10 h-11 border ${emailTouched && !isValidEmail(email) && email.length > 0
                    ? 'border-red-500'
                    : emailTouched && isValidEmail(email)
                      ? 'border-primary'
                      : 'border-muted-foreground/50'
                  }`}
                required
              />
              {emailTouched && email.length > 0 && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  {isValidEmail(email) ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : (
                    <XCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              )}
            </div>
            {emailTouched && !isValidEmail(email) && email.length > 0 && (
              <p className="text-xs text-red-600">Please enter a valid email address</p>
            )}
          </div>

          {/* Password Field */}
          {mode !== 'reset' && (
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => setPasswordTouched(true)}
                  className={`pl-10 pr-10 h-11 transition-all duration-200 border ${mode === 'signup' && passwordTouched && password.length > 0
                      ? isPasswordValid
                        ? 'border-green-500'
                        : 'border-orange-500'
                      : 'border-muted-foreground'
                    }`}
                  required
                  minLength={mode === 'signup' ? 8 : undefined}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength Indicator for Signup */}
              {mode === 'signup' && passwordTouched && password.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full transition-all duration-300 ${getPasswordStrengthColor(passwordStrength.score)}`}
                        style={{ width: `${passwordStrength.score}%` }}
                      />
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength.score < 40 ? 'text-red-600' :
                        passwordStrength.score < 60 ? 'text-orange-600' :
                          passwordStrength.score < 80 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                      {getPasswordStrengthText(passwordStrength.score)}
                    </span>
                  </div>

                  {passwordStrength.feedback.length > 0 && (
                    <div className="grid grid-cols-1 gap-1">
                      {passwordStrength.feedback.map((item, index) => (
                        <div key={index} className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <XCircle className="h-3 w-3 text-red-400" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          )}

          {/* Confirm Password Field */}
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`pl-10 pr-10 h-11 transition-all duration-200 border ${confirmPassword.length > 0
                      ? doPasswordsMatch
                        ? 'border-green-500'
                        : 'border-red-500'
                      : 'border-muted-foreground'
                    }`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {confirmPassword.length > 0 && (
                <div className="flex items-center space-x-1 text-xs">
                  {doPasswordsMatch ? (
                    <>
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span className="text-green-600">Passwords match</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3 text-red-500" />
                      <span className="text-red-600">Passwords do not match</span>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Error/Success Messages */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert variant="destructive">
                  <XCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              </motion.div>
            )}

            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <Alert className="border-green-200 bg-green-50 text-green-800">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription>{message}</AlertDescription>
                </Alert>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading || (mode === 'signup' && (!isPasswordValid || !doPasswordsMatch))}
            className="w-full h-11 text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <>
                {mode === 'signin' && 'Sign In'}
                {mode === 'signup' && 'Create Account'}
                {mode === 'reset' && 'Send Reset Link'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </form>

        {/* Mode Switching */}
        <div className="space-y-4">
          <Separator />

          {mode === 'signin' && (
            <div className="text-center space-y-2">
              <button
                type="button"
                onClick={() => setMode('reset')}
                className="text-sm text-primary hover:underline transition-colors"
              >
                Forgot your password?
              </button>
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Sign up
                </button>
              </p>
            </div>
          )}

          {mode === 'signup' && (
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-primary hover:underline font-medium transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          )}

          {mode === 'reset' && (
            <div className="text-center">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className="text-sm text-primary hover:underline transition-colors inline-flex items-center"
              >
                <ArrowLeft className="h-3 w-3 mr-1" />
                Back to sign in
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}