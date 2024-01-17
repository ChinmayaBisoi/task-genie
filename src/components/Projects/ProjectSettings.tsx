import { MinusCircle } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState } from "react";
import { RouterOutputs, api } from "~/utils/api";
import Popup from "../common/Popup";
import Shimmer from "../common/Shimmer";
import UserCard from "../team/UserCard";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../ui/use-toast";
import ProjectNotFound from "./ProjectNotFound";

type ProjectDetailsProps = RouterOutputs["project"]["getProjectDetails"];

const DeleteProject = ({ projectId }: { projectId: string }) => {
  const [showDeleteProjectPopup, setShowDeleteProjectPopup] = useState(false);
  const router = useRouter();
  const deleteProjectMutation = api.project.deleteProject.useMutation();

  async function handleDeleteProject() {
    try {
      await deleteProjectMutation.mutateAsync({ id: projectId }).then(() => {
        toast({ title: "Project deleted." });
        router.push("/dashboard");
      });
    } catch (err: any) {
      toast({ title: err.message, variant: "error" });
    }
  }

  return (
    <div className="relative mt-4 flex flex-col gap-4">
      <Label className="ml-2">Delete Project</Label>
      <Button
        variant={"destructive"}
        onClick={() => {
          setShowDeleteProjectPopup(true);
        }}
        className="w-full rounded-full"
      >
        Delete Project
      </Button>
      <Popup
        show={showDeleteProjectPopup}
        className="mr-2 rounded-lg"
        onClose={() => {
          setShowDeleteProjectPopup(false);
        }}
      >
        <div className="flex flex-col gap-4">
          <h3>
            Are you sure you wish to delete the project and all its related
            tasks?
          </h3>
          <div className="flex gap-4 self-end">
            <Button
              onClick={() => {
                setShowDeleteProjectPopup(false);
              }}
              variant={"secondary"}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDeleteProject}
              variant="destructive"
              loading={deleteProjectMutation.isLoading}
              className=""
            >
              Delete
            </Button>
          </div>
        </div>
      </Popup>
    </div>
  );
};

const ProjectSettingsLoading = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <Shimmer className="h-10 w-40" />
        <Shimmer className="h-10 w-40" />
      </div>
      <Shimmer className="h-10 w-full" />
      <Shimmer className="h-10 w-full" />
      <Shimmer className="h-10 w-full" />
      <Shimmer className="h-10 w-full rounded-2xl px-8 md:w-3/4" />
      <Shimmer className="h-10 w-full rounded-2xl px-8 md:w-3/4" />
      <Shimmer className="h-10 w-full rounded-2xl px-8 md:w-3/4" />
    </div>
  );
};

const ProjectSettingsForm = ({
  project: projectData,
  refetchProjectDetails,
}: {
  project: ProjectDetailsProps;
  refetchProjectDetails: () => Promise<void>;
}) => {
  const [project, setProject] = useState(projectData);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [addMemberInput, setAddMemberInput] = useState("");

  const { data: teamMembers } = api.member.getMembers.useQuery(
    undefined, // no input
    { enabled: true },
  );

  const formattedTeamMembers = teamMembers
    ? teamMembers.map((k) => {
        const otherUser = k.isSentByUser ? k.to : k.from;
        return otherUser;
      })
    : [];

  const projectMemberIds = project.members.map((k) => k.id);

  const dropdownItems = formattedTeamMembers
    ? formattedTeamMembers.filter((k) => {
        return (
          !projectMemberIds.includes(k.id) &&
          (k.name?.includes(addMemberInput) ||
            k.email?.includes(addMemberInput))
        );
      })
    : [];

  const updateProjectDetailsMutation = api.project.updateProject.useMutation();

  async function handleSaveProjectChanges() {
    const somethingChanged =
      JSON.stringify(projectData) !== JSON.stringify(project);
    if (somethingChanged) {
      try {
        setIsSaving(true);
        await updateProjectDetailsMutation
          .mutateAsync({
            id: project.id,
            title: project.title,
            description: project.description || "",
            memberIds: project.members.map((k) => k.id),
          })
          .then(async () => {
            await refetchProjectDetails();
          });
        toast({ title: "Project Details updated" });
      } catch (err: any) {
        toast({ title: err.message, variant: "error" });
      }
    }

    setIsSaving(false);
    setIsEditing(false);
  }

  if (!teamMembers) return;
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-medium">Project Settings</h3>

        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button
                variant={"secondary"}
                onClick={() => {
                  setProject(projectData);
                  setIsEditing(false);
                }}
                className="w-full rounded-full"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSaveProjectChanges}
                className="w-full rounded-full"
              >
                Save
              </Button>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setIsEditing(true);
                }}
                disabled={isSaving}
                className="w-full rounded-full"
              >
                Edit
              </Button>
            </>
          )}
        </div>
      </div>
      <div className="">
        <Label htmlFor="title" className="pl-2">
          Title
        </Label>
        <div className="flex">
          <Input
            id="title"
            readOnly={!isEditing}
            disabled={!isEditing}
            value={project.title}
            onChange={(e) => {
              setProject((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className="">
        <Label htmlFor="description" className="pl-2">
          Description
        </Label>
        <div className="flex">
          <Input
            id="description"
            readOnly={!isEditing}
            disabled={!isEditing}
            value={project.description || ""}
            onChange={(e) => {
              setProject((prev) => {
                return { ...prev, description: e.target.value };
              });
            }}
          />
        </div>
      </div>
      <div className="relative">
        <Label className="pl-2">Add Project Members </Label>
        <Input
          placeholder="Add a member to the project..."
          id="members"
          readOnly={!isEditing}
          disabled={!isEditing}
          value={addMemberInput}
          onChange={(e) => {
            setAddMemberInput(e.target.value);
          }}
        />
        <div
          className={`${
            addMemberInput.length > 0 ? "absolute" : "hidden"
          } z-10 flex max-h-40 w-full overflow-y-scroll bg-slate-200`}
        >
          {dropdownItems?.length > 0 ? (
            <div className="flex w-full flex-col items-stretch gap-2 py-4">
              {dropdownItems.map((member) => {
                return (
                  <button
                    key={member.id}
                    onClick={() => {
                      setProject((prev) => ({
                        ...prev,
                        members: [...prev.members, member],
                      }));

                      setAddMemberInput("");
                    }}
                    className="px-4 py-1 text-left hover:bg-slate-300"
                  >
                    <UserCard user={member} />
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="my-4 w-full text-center text-sm">
              No members found
            </div>
          )}
        </div>
      </div>
      <div className="">
        <Label className="pl-2">Current Project Members</Label>
        {project.members.length === 0 ? (
          <div className="mt-4 text-sm text-gray-400">
            <div className="text-gray-700">
              No Members present in the current project.
            </div>
            <div>
              Add a member from your team above, then save to add members in the
              current project.
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-col gap-4">
            {project.members.map((member) => {
              const isProjectOwner = project.createdById === member.id;
              return (
                <div
                  onClick={() => {
                    console.log(dropdownItems, member);
                  }}
                  key={member.id}
                  className="flex items-center justify-between gap-4"
                >
                  <UserCard key={member.id} user={member} />
                  {isProjectOwner ? (
                    <Badge className="bg-brand-light">Owner</Badge>
                  ) : (
                    <button
                      onClick={() => {
                        const member2 = teamMembers?.find((k) => {
                          const otherUser = k.isSentByUser ? k.to : k.from;
                          return otherUser.id === member.id;
                        });
                        if (member2) {
                          setProject((prev) => ({
                            ...prev,
                            members: prev.members.filter(
                              (k) => k.id !== member.id,
                            ),
                          }));
                        }
                      }}
                      disabled={!isEditing}
                      className={`rounded-full ${
                        isEditing
                          ? "cursor-pointer text-destructive hover:bg-destructive/30"
                          : "cursor-not-allowed text-gray-400"
                      }`}
                    >
                      <MinusCircle />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <DeleteProject projectId={projectData.id} />
    </>
  );
};

const ProjectSettings = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const { projectId } = useParams<{ projectId: string }>();

  const {
    error,
    isLoading,
    isRefetching,
    refetch,
    data: projectData,
  } = api.project.getProjectDetails.useQuery(
    { projectId },
    { enabled: isLoggedIn },
  );

  async function refetchProjectDetails() {
    await refetch();
  }

  const loading = isLoading || isRefetching;

  if (error)
    return <ProjectNotFound refetch={refetchProjectDetails} error={error} />;

  return (
    <div className="flex grow flex-col gap-4 ">
      {loading && <ProjectSettingsLoading />}
      {!loading && projectData && (
        <ProjectSettingsForm
          refetchProjectDetails={refetchProjectDetails}
          project={projectData}
        />
      )}
    </div>
  );
};

export default ProjectSettings;
