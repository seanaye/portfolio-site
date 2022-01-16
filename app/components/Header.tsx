import { FC } from "react"

const navigation = [
  { name: "About", href: "/" },
  { name: "Photography", href: "/albums" },
]

export const Header: FC = () => {
  return (
    <header className="group transition-all bg-transparent hover:bg-gray-900 duration-300 absolute top-0 inset-x-0">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="w-full py-6 flex items-center justify-between hidden lg:block">
          <div className="flex items-center justify-end">
            <div className="hidden ml-10 space-x-8 lg:block">
              {navigation.map((link) => (
                <a key={link.name} href={link.href} className="text-base font-medium text-black group-hover:text-indigo-50 transition-all duration-300">
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="py-4 flex flex-wrap justify-center space-x-6 lg:hidden">
          {navigation.map((link) => (
            <a key={link.name} href={link.href} className="text-base font-medium text-black group-hover:text-indigo-50 transition-all duration-300">
              {link.name}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
