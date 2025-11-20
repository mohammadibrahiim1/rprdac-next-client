// "use client";

// import * as React from "react";
// import Link from "next/link";
// import {
//   Bell,
//   CircleCheckIcon,
//   CircleHelpIcon,
//   CircleIcon,
// } from "lucide-react";

// import { useIsMobile } from "@/hooks/use-mobile";

// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   NavigationMenuTrigger,
//   navigationMenuTriggerStyle,
// } from "@/components/ui/navigation-menu";
// import { useDispatch, useSelector } from "react-redux";
// import { clearUser } from "@/redux/features/auth/authSlice";
// import { useLogoutMutation } from "@/redux/services/authApi";
// import { RootState } from "@/redux/store/store";
// import { useRouter } from "next/navigation";
// import Image from "next/image";

// const components: { title: string; href: string; description: string }[] = [
//   {
//     title: "Buy Books",
//     href: "/books",
//     description:
//       "A modal dialog that interrupts the user with important content and expects a response.",
//   },
//   {
//     title: "Track Order",
//     href: "/track/order",
//     description:
//       "For sighted users to preview content available behind a link.",
//   },
//   // {
//   //   title: "Progress",
//   //   href: "/docs/primitives/progress",
//   //   description:
//   //     "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
//   // },
//   // {
//   //   title: "Scroll-area",
//   //   href: "/docs/primitives/scroll-area",
//   //   description: "Visually or semantically separates content.",
//   // },
//   // {
//   //   title: "Tabs",
//   //   href: "/docs/primitives/tabs",
//   //   description:
//   //     "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
//   // },
//   // {
//   //   title: "Tooltip",
//   //   href: "/docs/primitives/tooltip",
//   //   description:
//   //     "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
//   // },
// ];

// export function Nav() {
//   const isMobile = useIsMobile();
//   const user = useSelector((state: RootState) => state?.auth?.user);
//   const dispatch = useDispatch();
//   const router = useRouter();

//   const [logout] = useLogoutMutation();

//   console.log(user);

//   const handleLogout = async () => {
//     await logout();
//     dispatch(clearUser());
//     router.push("/login");
//   };

//   return (
//     <header>
//       <div className="flex items-center justify-between px-4 md:px-8 py-3">
//         {/* LEFT — LOGO */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src="/logo.png" /* <-- change your logo path here */
//             alt="Company Logo"
//             width={45}
//             height={45}
//             className="object-contain"
//           />
//           <span className="text-xl font-semibold hidden md:block">PRDRAC</span>
//         </Link>
//       </div>
//       <NavigationMenu viewport={isMobile}>
//         <NavigationMenuList className="flex-wrap">
//           <NavigationMenuItem>
//             <NavigationMenuLink
//               asChild
//               className={navigationMenuTriggerStyle()}
//             >
//               <Link href="/checkstatus">Check Status</Link>
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuTrigger>Order Books</NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <ul className="grid gap-2 sm:w-[400px] md:w-[500px] grid-cols-2 lg:w-[300px]">
//                 {components?.map((component) => (
//                   <ListItem
//                     key={component?.title}
//                     title={component?.title}
//                     href={component?.href}
//                   ></ListItem>
//                 ))}
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//           <NavigationMenuItem className="hidden md:block">
//             <NavigationMenuTrigger>Academics</NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <ul className="w-[300px]">
//                 <li className="grid grid-cols-2 items-center gap-4">
//                   <NavigationMenuLink asChild>
//                     <Link href="/result">
//                       <div className="font-medium">Result Corner</div>
//                     </Link>
//                   </NavigationMenuLink>
//                   <NavigationMenuLink asChild>
//                     <Link href="/solution">
//                       <div className="font-medium">Solution Corner</div>
//                     </Link>
//                   </NavigationMenuLink>
//                 </li>
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink
//               asChild
//               className={navigationMenuTriggerStyle()}
//             >
//               <Link href="/about">About us</Link>
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem>
//             <NavigationMenuLink
//               asChild
//               className={navigationMenuTriggerStyle()}
//             >
//               <Link href="/notification">
//                 <Bell />
//               </Link>
//             </NavigationMenuLink>
//           </NavigationMenuItem>
//           <NavigationMenuItem className="hidden md:block">
//             <NavigationMenuTrigger>Cart</NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <ul className="grid w-[200px] gap-4">
//                 <li>
//                   <NavigationMenuLink asChild>
//                     <Link href="/cart">Cart items</Link>
//                   </NavigationMenuLink>
//                 </li>
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>

//           {/* Conditional User / Login Menu */}
//           {user ? (
//             <NavigationMenuItem className="hidden md:block">
//               <NavigationMenuTrigger>
//                 {user.name || "MD Ebrahim Munna"}
//               </NavigationMenuTrigger>
//               <NavigationMenuContent>
//                 <ul className="grid w-[200px] gap-4">
//                   <li>
//                     <NavigationMenuLink asChild>
//                       <Link
//                         href="/dashboard"
//                         className="flex-row items-center gap-2"
//                       >
//                         <CircleHelpIcon />
//                         Dashboard
//                       </Link>
//                     </NavigationMenuLink>
//                     <NavigationMenuLink asChild>
//                       <Link
//                         href="/profile"
//                         className="flex-row items-center gap-2"
//                       >
//                         <CircleIcon />
//                         My profile
//                       </Link>
//                     </NavigationMenuLink>
//                     <NavigationMenuLink asChild>
//                       <button
//                         onClick={handleLogout}
//                         className="flex-row items-center gap-2 w-full text-left cursor-pointer"
//                       >
//                         <CircleCheckIcon />
//                         Log out
//                       </button>
//                     </NavigationMenuLink>
//                   </li>
//                 </ul>
//               </NavigationMenuContent>
//             </NavigationMenuItem>
//           ) : (
//             <NavigationMenuItem className="hidden md:block">
//               <NavigationMenuLink
//                 asChild
//                 className={navigationMenuTriggerStyle()}
//               >
//                 <Link href="/login">Login</Link>
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//           )}
//           {/* <NavigationMenuItem className="hidden md:block">
//           <NavigationMenuTrigger>MD Ebrahim Munna</NavigationMenuTrigger>
//           <NavigationMenuContent>
//             <ul className="grid w-[200px] gap-4">
//               <li>
//                 <NavigationMenuLink asChild>
//                   <Link href="#" className="flex-row items-center gap-2">
//                     <CircleHelpIcon />
//                     Dashboard
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#" className="flex-row items-center gap-2">
//                     <CircleIcon />
//                     My profile
//                   </Link>
//                 </NavigationMenuLink>
//                 <NavigationMenuLink asChild>
//                   <Link href="#" className="flex-row items-center gap-2">
//                     <CircleCheckIcon />
//                     Log out
//                   </Link>
//                 </NavigationMenuLink>
//               </li>
//             </ul>
//           </NavigationMenuContent>
//         </NavigationMenuItem> */}
//         </NavigationMenuList>
//       </NavigationMenu>
//     </header>
//   );
// }

// function ListItem({
//   title,
//   children,
//   href,
//   ...props
// }: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
//   return (
//     <li {...props}>
//       <NavigationMenuLink asChild>
//         <Link href={href}>
//           <div className="text-sm leading-none font-medium">{title}</div>
//           <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
//             {children}
//           </p>
//         </Link>
//       </NavigationMenuLink>
//     </li>
//   );
// }

"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Bell,
  CircleCheckIcon,
  CircleHelpIcon,
  CircleIcon,
} from "lucide-react";

import { useIsMobile } from "@/hooks/use-mobile";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "@/redux/features/auth/authSlice";
import { RootState } from "@/redux/store/store";
import { useLogoutMutation } from "@/redux/services/authApi";
import { useRouter } from "next/navigation";

const components = [
  {
    title: "Buy Books",
    href: "/books",
    description: "Buy school & college books online.",
  },
  {
    title: "Track Order",
    href: "/trackorder",
    description: "Track your order in real time.",
  },
];

export function Nav() {
  const isMobile = useIsMobile();
  const user = useSelector((state: RootState) => state?.auth?.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    dispatch(clearUser());
    router.push("/login");
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50 flex justify-center">
      <div className="flex items-center justify-between gap-10">
        {/* LEFT — LOGO */}
        <Link href="/" className="flex items-center">
          <Image
            src="/log-rpr.png" /* <-- change your logo path here */
            alt="rpr logo"
            width={80}
            height={80}
            className="object-contain bg-no-repeat bg-center"
          />
          {/* <span className="text-xl font-semibold hidden md:block">PRDRAC</span> */}
        </Link>

        {/* RIGHT — NAVIGATION */}
        <NavigationMenu viewport={isMobile}>
          <NavigationMenuList className="flex-wrap">
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/checkstatus">Check Status</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Order Books</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 sm:w-[380px] md:w-[450px] grid-cols-2 lg:w-[300px]">
                  {components?.map((item) => (
                    <ListItem
                      key={item.title}
                      title={item.title}
                      href={item.href}
                    ></ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Academics</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="w-[260px] grid-cols-2 grid items-center">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/result" className="font-medium">
                        Result Corner
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/solution" className="font-medium">
                        Solution Corner
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/about">About us</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/notification">
                  <Bell />
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem className="hidden md:block">
              <NavigationMenuTrigger>Cart</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px]">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link href="/cart">Cart items</Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* USER MENU */}
            {user ? (
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuTrigger>
                  {user?.name || "User"}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="w-[200px]">
                    <li className="">
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard">
                          <div className="flex items-center gap-2">
                            <CircleHelpIcon /> <span>Dashboard</span>
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <Link href="/profile">
                          <div className="flex items-center gap-2">
                            <CircleIcon /> <span>My Profile</span>
                          </div>
                        </Link>
                      </NavigationMenuLink>

                      <NavigationMenuLink asChild>
                        <div onClick={handleLogout}>
                          <div className="flex items-center gap-2 cursor-pointer">
                            <CircleCheckIcon /> <span>Log out</span>
                          </div>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : (
              <NavigationMenuItem className="hidden md:block">
                <NavigationMenuLink
                  asChild
                  className={navigationMenuTriggerStyle()}
                >
                  <Link href="/login">Login</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block  rounded-md p-2 transition hover:bg-accent"
        >
          <div className="text-sm font-medium">{title}</div>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
