import Link from 'next/link'
import { Heart, PenSquare } from 'lucide-react'

export function Navigation() {
  return (
    <>
      <header className="bg-surface shadow-sm fixed top-0 left-0 w-full z-50">
        <nav className="flex justify-between items-center w-full px-margin-mobile md:px-margin-desktop h-20">
          <div className="font-headline-sm text-headline-sm text-tertiary">Mother&apos;s Day Tribute</div>
          <div className="hidden md:flex gap-8 items-center">
            <Link href="/" className="font-label-lg text-label-lg text-on-surface-variant hover:text-tertiary-fixed-dim transition-colors duration-300">
              Create
            </Link>
            <div className="flex gap-4 ml-4">
              <button className="scale-95 active:scale-90 transition-transform text-primary hover:text-tertiary">
                <Heart />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center py-4 px-margin-mobile bg-surface-container-low shadow-[0_-4px_16px_rgba(163,57,74,0.08)] rounded-t-xl">
        <Link href="/" className="flex flex-col items-center justify-center text-outline hover:text-tertiary-container transition-colors px-6 py-2">
          <PenSquare className="mb-1" />
          <span className="font-label-lg text-label-lg">Creator</span>
        </Link>
      </nav>
    </>
  )
}
