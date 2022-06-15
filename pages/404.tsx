import Logo from '@/components/Logo'

export default function NotFound() {
  return (
    <div className="center-vertical-screen space-y-5">
      <Logo className="h-28 sm:h-48" />
      <div className="text-center space-y-1">
        <h1 className="text-4xl">404</h1>
        <p>{`The content you are looking for wasn't found.`}</p>
      </div>
    </div>
  )
}
