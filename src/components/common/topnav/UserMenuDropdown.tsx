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

const commonStyles =
  "focus:bg-brand-light focus:text-white cursor-pointer rounded-full pl-4";

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
          className="m-0 mr-4 flex h-11 w-11 items-center justify-center rounded-full hover:bg-brand-light/60"
        >
          <div className="absolute h-6 w-6 animate-ping rounded-full bg-brand-light" />
          <Avatar img={userImg} name={userName} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuGroup>
          {NAV_ITEMS.map((item) => {
            return (
              <Link key={item.link} href={item.link}>
                <DropdownMenuItem className={commonStyles}>
                  {item.label}
                </DropdownMenuItem>
              </Link>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className={`${commonStyles} data-[state=open]:bg-brand-light data-[state=open]:text-white`}
            >
              Invite users
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem className={commonStyles}>
                  Email
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <Link href="/team">
                  <DropdownMenuItem className={commonStyles}>
                    More...
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer rounded-full pl-4 focus:bg-brand-dark focus:text-white"
          onClick={handleLogout}
        >
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
