import type { Session } from "next-auth";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useState } from "react";
import { api } from "~/utils/api";
import { toast } from "../ui/use-toast";

const ManageProfile = ({ user: initUser }: { user: Session["user"] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(initUser);
  const userDetailsMutation = api.user.updateUser.useMutation();

  async function handleUpdateUser() {
    if (!user.name) {
      toast({ title: "Name is a required", variant: "error" });
      return;
    }

    try {
      await userDetailsMutation.mutateAsync({ name: user.name }).then(() => {
        toast({ title: "User details updated" });
      });
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
    setIsEditing(false);
  }

  if (!user.name || !user.email) return null;
  return (
    <div>
      <h3 className="text-2xl font-semibold text-brand-dark">
        Manage your personal information
      </h3>
      <div className="my-4">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
          <h4 className="text-lg font-medium text-brand-dark">About</h4>
          {!isEditing ? (
            <Button
              onClick={() => {
                setIsEditing(true);
              }}
              className="w-20 rounded-full"
            >
              Edit
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setUser(initUser);
                  setIsEditing(false);
                }}
                variant={"secondary"}
                className="w-20 rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpdateUser}
                loaderColor="white"
                loading={userDetailsMutation.isLoading}
                disabled={userDetailsMutation.isLoading}
                className="w-20 rounded-full"
              >
                Save
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Label className="pl-3">Name</Label>
          <div className="flex max-w-md items-center gap-4">
            <Input
              className={`${isEditing ? "" : "border-0"}`}
              readOnly={!isEditing}
              value={user.name}
              onChange={(e) => {
                setUser((prev) => ({ ...prev, name: e.target.value }));
              }}
            />
          </div>
        </div>
        <div className="mt-4">
          <Label className="pl-3">Email</Label>
          <div className="flex max-w-md items-center gap-4">
            <Input className={`border-0`} readOnly value={user.email} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
