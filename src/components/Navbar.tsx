import Link from "next/link"
import { Icons } from "@/components/Icons"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import UserAccountNav from "@/components/UserAccountNav"
import ThemeToggle from "@/components/ThemeToggle"
import LoginButton from "@/components/auth/LoginButton"
import { auth } from "@/auth"
// import MobileNav from "@/components/MobileNav"

const Navbar = async () => {
  const session = await auth()
  const user = session?.user

  return (
    <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="flex z-40 font-semibold">
            <span>{process.env.BRAND}</span>
          </Link>

          {/* add mobile navbar */}

          <div className="hidden items-center space-x-4 sm:flex">
            {!user ? (
              <>
                <Link
                  href="/title-case"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Title Case
                </Link>
                <Link
                  href="/citation"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Citation
                </Link>
                <Link
                  href="/research"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Research
                </Link>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Pricing
                </Link>

                {/* Native authentication */}
                <LoginButton asChild mode="modal">
                  <Button className={buttonVariants({ size: "sm" })}>
                    Login <Icons.Enter className="ml-1.5 h-5 w-5" />
                  </Button>
                </LoginButton>
              </>
            ) : (
              <>
                <Link
                  href="/title-case"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Title Case
                </Link>
                <Link
                  href="/citation"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Citation
                </Link>
                <Link
                  href="/research"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Research
                </Link>
                <Link
                  href="/dashboard"
                  className={buttonVariants({
                    variant: "link",
                    size: "sm",
                  })}
                >
                  Dashboard
                </Link>

                <UserAccountNav
                  name={!user.name ? `${user.email}` : `${user.name}`}
                  email={user.email ?? ""}
                  imageUrl={user.image ?? ""}
                />
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
