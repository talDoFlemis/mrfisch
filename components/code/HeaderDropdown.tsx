/* eslint-disable react/jsx-no-undef */
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FiChevronDown } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { BiLogOut } from "react-icons/bi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { AiFillHeart } from "react-icons/ai";
import { BsBookmarkHeart, BsCodeSlash } from "react-icons/bs";

const HeaderDropdown = ({ user }: { user: Session["user"] }) => {
  const router = useRouter();
  return (
    <Menu as="div" className="inline-block relative text-left">
      <div>
        <Menu.Button className="inline-flex justify-center items-center w-full group">
          <div className="relative w-10 h-10 transition-transform group-hover:scale-110 mask mask-circle">
            {user.image ? (
              <Image
                src={user.image}
                layout="fill"
                objectFit="cover"
                alt="user image"
              />
            ) : (
              <CgProfile className="w-full h-full transition-transform group-hover:scale-105" />
            )}
          </div>
          <FiChevronDown
            className="ml-2 -mr-1 w-5 h-5 text-neutral-content group-hover:text-accent"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 right-auto mt-2 w-32 text-xs rounded-md shadow-lg origin-top-right sm:right-0 sm:left-auto sm:w-56 sm:text-sm focus:outline-none bg-neutral">
          <div className="py-1 px-1">
            <Menu.Item>
              {({ active }) => (
                <Link href={`/user/${user.id}/edit`}>
                  <a
                    className={`${
                      active
                        ? "bg-accent text-accent-content"
                        : "text-neutral-content"
                    } group flex w-full items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-content`}
                  >
                    <CgProfile className="mr-2 w-5 h-5" aria-hidden="true" />
                    Profile
                  </a>
                </Link>
              )}
            </Menu.Item>
            {user.role === "PORTULOVER" && (
              <Menu.Item>
                {({ active }) => (
                  <Link href="/portulovers">
                    <a
                      className={`${
                        active
                          ? "bg-accent text-accent-content"
                          : "text-neutral-content"
                      } group flex w-full items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-content`}
                    >
                      <AiFillHeart
                        className="mr-2 w-5 h-5"
                        aria-hidden="true"
                      />
                      Portulovers
                    </a>
                  </Link>
                )}
              </Menu.Item>
            )}
            <Menu.Item>
              {({ active }) => (
                <Link href="/mycodes">
                  <a
                    className={`${
                      active
                        ? "bg-accent text-accent-content"
                        : "text-neutral-content"
                    } group flex w-full items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-content`}
                  >
                    <BsCodeSlash className="mr-2 w-5 h-5" aria-hidden="true" />
                    My Codes
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link href="/favoritecodes">
                  <a
                    className={`${
                      active
                        ? "bg-accent text-accent-content"
                        : "text-neutral-content"
                    } group flex w-full items-center rounded-md px-2 py-2 hover:bg-accent hover:text-accent-content`}
                  >
                    <BsBookmarkHeart
                      className="mr-2 w-5 h-5"
                      aria-hidden="true"
                    />
                    Favorite Codes
                  </a>
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-accent text-accent-content"
                      : "text-neutral-content"
                  } group flex w-full items-center rounded-md px-2 py-2`}
                  onClick={() => {
                    signOut();
                    router.push("/");
                  }}
                >
                  <BiLogOut className="mr-2 w-5 h-5" aria-hidden="true" />
                  Logout
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default HeaderDropdown;
