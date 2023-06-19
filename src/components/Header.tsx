import Image from "next/image";


export default function Header() {
  return (
    <div>
        {/* left */}
        <div className="flex items-center justify-between max-w-6xl">
            <div className="h-24 w-24 relative hidden lg:inline-grid cursor-pointer border-1">
                <Image width="300" height="40" src="https://cdn2.downdetector.com/static/uploads/logo/Instagram_Logo_Large.png" alt="Instagram logo" className="object-contain"/>
            </div>

            <div className="h-10 w-10 relative lg:hidden">
                <Image width="300" height="40" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Instagram-Icon.png/800px-Instagram-Icon.png" alt="Instagram logo" className="object-contain"/>
            </div>
            <h1>direita</h1>

        </div>

        {/* middle */}

        {/* right */}

    </div>
  )
}