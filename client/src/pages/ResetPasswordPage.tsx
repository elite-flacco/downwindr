import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Eye,
  EyeOff,
  Lock,
  CheckCircle,
  XCircle,
  Loader2,
  ArrowRight
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

export default function ResetPasswordPage() {
  const [, navigate] = useLocation()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [isValidSession, setIsValidSession] = useState(false)
  const [sessionChecked, setSessionChecked] = useState(false)

  // Check if we have a valid password reset session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setIsValidSession(true)
        } else {
          setError('Invalid or expired reset link. Please request a new password reset.')
        }
      } catch (err) {
        setError('Error validating reset session. Please try again.')
      } finally {
        setSessionChecked(true)
      }
    }

    checkSession()
  }, [])

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setMessage('')

    if (!isPasswordValid) {
      setError('Please create a stronger password')
      setLoading(false)
      return
    }

    if (!doPasswordsMatch) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: password
      })

      if (error) {
        setError(error.message)
      } else {
        setMessage('Password updated successfully! Redirecting to login...')
        setTimeout(() => {
          navigate('/auth')
        }, 2000)
      }
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Loading state while checking session
  if (!sessionChecked) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span>Verifying reset link...</span>
        </div>
      </div>
    )
  }

  // Invalid session state
  if (!isValidSession) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
        </div>
        
        <div className="relative z-10 max-w-md w-full mx-auto p-6">
          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold text-red-600">Invalid Reset Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <XCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
              <Button 
                onClick={() => navigate('/auth')}
                className="w-full"
              >
                Back to Login
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-blue-50/30">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset Password</h1>
            <p className="text-sm text-gray-500">
              Enter your new password below
            </p>
          </div>

          <Card className="shadow-xl border-0 bg-white/95 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-4">
              <CardTitle className="text-xl font-bold text-center">
                Create New Password
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your new password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={() => setPasswordTouched(true)}
                      className={`pl-10 pr-10 h-11 transition-all duration-200 border ${
                        passwordTouched && password.length > 0
                          ? isPasswordValid
                            ? 'border-green-500'
                            : 'border-orange-500'
                          : 'border-muted-foreground'
                      }`}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwordTouched && password.length > 0 && (
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
                        <span className={`text-xs font-medium ${
                          passwordStrength.score < 40 ? 'text-red-600' :
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

                {/* Confirm Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm New Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-10 h-11 transition-all duration-200 border ${
                        confirmPassword.length > 0
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
                  disabled={loading || !isPasswordValid || !doPasswordsMatch}
                  className="w-full h-11 text-base font-medium transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <>
                      Update Password
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>
              </form>

              <div className="text-center pt-4">
                <button
                  type="button"
                  onClick={() => navigate('/auth')}
                  className="text-sm text-primary hover:underline transition-colors"
                >
                  Back to Login
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}