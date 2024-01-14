import { Input } from "../ui/input";
import { Label } from "../ui/label";

const ManageProfile = ({ user }: { user: any }) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-brand-dark">
        Manage your personal information
      </h3>
      <div className="my-4">
        <h4 className="border-b border-neutral-200 pb-2 text-lg font-medium text-brand-dark">
          About
        </h4>
        <div className="mt-4">
          <Label className="pl-2">Name</Label>
          <div className="flex max-w-md items-center gap-4">
            <Input className="" defaultValue={user.name} readOnly />
            {/* <Edit /> */}
          </div>
        </div>
        <div className="mt-4">
          <Label className="pl-2">Email</Label>
          <div className="flex max-w-md items-center gap-4">
            <Input className="" defaultValue={user.email} readOnly />
            {/* <Edit /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageProfile;
