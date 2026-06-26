import Link from 'next/link'

export default function Custom404() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif', background: '#f9f9fb' }}>
      <h1 style={{ fontSize: '5rem', fontWeight: 800, color: '#7c3aed', margin: 0 }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', color: '#111', margin: '0.5rem 0 1rem' }}>Page Not Found</h2>
      <p style={{ color: '#6b7280', marginBottom: '2rem' }}>The page you&#39;re looking for doesn&#39;t exist.</p>
      <Link href="/" style={{ background: '#7c3aed', color: '#fff', padding: '0.75rem 2rem', borderRadius: '0.5rem', textDecoration: 'none', fontWeight: 700 }}>
        Go Home
      </Link>
    </div>
  )
}
