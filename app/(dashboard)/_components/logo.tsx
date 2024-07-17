import Image from "next/image"
import Link from "next/link"

export const Logo = () => {
    return (
        <div style={{ position: 'relative', width: '200px', height: '200px' }}>
                <Link href={"/"} >
                  <Image
                    src='/Logo.svg'
                    alt="logo"
                    sizes="300px"
                    fill
                    style={{
                        objectFit: 'contain',
                        position: 'absolute'
                    }}
                    priority
                />
            </Link>
          </div>
    )
}