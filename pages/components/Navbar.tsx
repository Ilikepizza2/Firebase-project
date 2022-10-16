import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  const [open, setOpen] = React.useState(false)
  function changeMenu() {
    setOpen(!open)
  }
  return (
    <div>
      <header>
        <div className="bg-gray-900 py-5 px-10 text-white md:flex md:items-center md:justify-between md:px-40">
          <div className="flex items-center justify-between">
            <div>Logo</div>
            <div className="align-middle md:hidden">
              <i
                className="material-icons cursor-pointer align-middle"
                onClick={() => changeMenu()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="w-6 fill-white"
                >
                  <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                </svg>
              </i>
            </div>
          </div>
          <div
            className={`${
              open ? 'block' : 'hidden'
            } mt-3 flex flex-col text-left transition-all md:mt-0 md:flex md:flex-row md:gap-9 md:text-right`}
          >
            <Link href="/users" className="mt-3 hover:text-slate-700 md:mx-3">
              Users
            </Link>
            <Link href="/transactions" className="mt-3 hover:text-slate-700 md:mx-3">
              Transactions
            </Link>
            <Link href="/credits" className="mt-3 hover:text-slate-700  md:mx-3">
              Credits
            </Link>
          </div>
        </div>
      </header>
    </div>
  )
}

export default Navbar
