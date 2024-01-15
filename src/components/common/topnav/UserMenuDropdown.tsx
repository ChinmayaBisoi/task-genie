import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import Avatar from "~/components/Avatar";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { NAV_ITEMS } from "../sidebar/Sidebar";

const hoverStyles = "focus:bg-brand-light focus:text-white cursor-pointer";

async function handleLogout() {
  try {
    await signOut();
  } catch (err) {
    console.log(err);
  }
}

export function UserMenuDropdown() {
  const { data } = useSession();
  const user = data?.user;
  const userImg = user?.image;
  const userName = user?.name;
  const userExists = user && userImg && userName;

  if (!userExists) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="relative m-0 mr-4 flex h-11 w-11 items-center justify-center rounded-full hover:bg-brand-light/60"
        >
          <div className="absolute h-6 w-6 animate-ping rounded-full bg-brand-light" />
          <Avatar img={userImg} name={userName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {NAV_ITEMS.map((item) => {
            return (
              <Link href={item.link}>
                <DropdownMenuItem className={hoverStyles}>
                  {item.label}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className={`${hoverStyles} data-[state=open]:bg-brand-light data-[state=open]:text-white`}
            >
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className={hoverStyles}>
                  Email
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <Link href="/team">
                  <DropdownMenuItem className={hoverStyles}>
                    More...
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
