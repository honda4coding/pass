export const isProduction = process.env.NODE_ENV === 'production'

export const API_URL = process.env.NEXT_PUBLIC_API_URL || (isProduction
    ? 'https://pass-backend-one.vercel.app/api/v1'
    : 'http://localhost:8080/api/v1')

export const FRONT_URL = process.env.NEXT_PUBLIC_FRONT_URL || (isProduction
    ? 'https://pass-frontend.vercel.app'
    : 'http://localhost:3000')
