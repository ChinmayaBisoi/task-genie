import { useState } from "react";
import { api } from "~/utils/api";
import Popup from "../common/Popup";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";

function isValidEmail(email: string) {
  return (
    !!email && email.length > 0 && email.includes("@") && email.includes(".")
  );
}

const AddMember = ({ refetchData }: { refetchData: () => void }) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");

  const addMemberMutation = api.member.sendFriendRequest.useMutation();

  function closePopup() {
    setEmail("");
    setShow(false);
  }

  async function handleAddMember() {
    if (!isValidEmail(email)) {
      toast({ title: "Please provide a valid email", variant: "error" });
      return;
    }

    try {
      const res = await addMemberMutation.mutateAsync({ email }).then(() => {
        refetchData();
      });
      console.log(res);
      toast({ title: "Request sent successfullt" });
      closePopup();
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
  }

  return (
    <>
      <Button
        onClick={() => {
          setShow(true);
        }}
        className="rounded-full"
      >
        Add member
      </Button>
      <Popup show={show} onClose={closePopup} className="mx-4 md:mx-0">
        <div className="flex flex-col gap-4">
          <h2 className="text-lg">Add Member</h2>
          <div className="">
            <Label htmlFor="email" className="pl-2">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Recepient's email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <Button
            loading={addMemberMutation.isLoading}
            onClick={handleAddMember}
            disabled={email.length < 1 || addMemberMutation.isLoading}
            className="self-end"
          >
            Add Member
          </Button>
        </div>
      </Popup>
    </>
  );
};

export default AddMember;
