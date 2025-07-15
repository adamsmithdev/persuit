# Authentication & Protected Routes

This job tracker application implements comprehensive authentication and route protection using NextAuth.js and custom middleware.

## Authentication Features

### 1. **Middleware-Level Protection** (`middleware.ts`)
- Protects all job-related routes automatically
- Redirects unauthenticated users to `/login` 
- Redirects authenticated users away from `/login` to the dashboard
- Preserves the original URL as a callback parameter for seamless redirects after login

### 2. **Protected Routes**
The following routes require authentication:
- `/` (Dashboard)
- `/job/*` (All job-related pages)
  - `/job/new` (Create new job application)
  - `/job/[id]` (View job details)
  - `/job/[id]/edit` (Edit job application)

### 3. **Public Routes**
- `/login` (Sign-in page) - **Automatically redirects authenticated users**
- `/api/auth/*` (NextAuth.js endpoints)

### 4. **Login Page Protection**
The login page includes multi-layer protection against authenticated users:
- **Middleware-level**: Server-side redirect to dashboard (`/`)
- **Client-side**: Session checking with `useSession()` hook
- **Automatic redirect**: Preserves callback URL for seamless navigation
- **Loading states**: Proper feedback during authentication checks

### 5. **Component-Level Protection**
- `AuthWrapper` component for server-side authentication checks
- `ClientAuthWrapper` component for client-side authentication checks
- Provides fallback UI for unauthenticated states

### 6. **API Route Protection**
All API endpoints include authentication checks:
- `POST /api/job` (Create job)
- `PUT /api/job/[id]` (Update job)
- `DELETE /api/job/[id]` (Delete job)

## Authentication Flow

1. **User visits protected route** → Middleware checks authentication
2. **If not authenticated** → Redirect to `/login` with callback URL
3. **User signs in with GitHub** → NextAuth.js handles OAuth flow
4. **After successful login** → Redirect to original requested page
5. **Subsequent requests** → JWT token validates user session

## Security Features

- **Database sessions** for enhanced security
- **User-specific data isolation** (users can only access their own job applications)
- **Automatic token validation** on every request
- **CSRF protection** built into NextAuth.js
- **Secure cookie handling** for session management

## Environment Variables Required

```bash
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
GITHUB_ID=your-github-oauth-app-id
GITHUB_SECRET=your-github-oauth-app-secret
```

## Usage Examples

### Server Component with AuthWrapper
```tsx
import AuthWrapper from '@/components/AuthWrapper';

export default function ProtectedPage() {
  return (
    <AuthWrapper>
      <h1>Protected Content</h1>
    </AuthWrapper>
  );
}
```

### Client Component with ClientAuthWrapper
```tsx
'use client';
import { ClientAuthWrapper } from '@/components/ClientAuthWrapper';

export default function ProtectedClientPage() {
  return (
    <ClientAuthWrapper>
      <h1>Protected Client Content</h1>
    </ClientAuthWrapper>
  );
}
```
