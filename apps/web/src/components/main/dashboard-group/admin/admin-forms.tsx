import { useState } from "react";
import { useCreateNewUser } from "@/integrations/tanstack/react-query/user-query/admin.rq";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
  AlertDialogHeader,
} from "@repo/ui/alert-dialog";
import { VisuallyHidden } from "@repo/ui/visually-hidden";
import { Label } from "@repo/ui/label";
import { Input } from "@repo/ui/input";
import { Button } from "@repo/ui/button";
import {
  generateEmployeeCode,
  generateUsernameFromEmail,
} from "@repo/utils/id";
import { useForm } from "@tanstack/react-form";
import { Plus } from "lucide-react";
import { z } from "zod";
import { useRouteContext } from "@tanstack/react-router";
import { cn } from "@repo/styles/cn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/select";
import type { USER_ROLE } from "@repo/utils/db-enums";

const ALLOWED_ROLES_TO_CREATE_BY_THIS_USER: (typeof USER_ROLE)[number][] = [
  "ZSM",
  "RSM",
  "MANAGER",
  "ASM",
  "MR",
  "DISTRIBUTOR",
  "STOCKIST",
];

export const createNewUserFormSchema = z.object({
  name: z.string().trim().min(2, "Name must contain at least 2 characters."),
  email: z.email("Enter a valid email address.").trim(),
  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s()-]{7,20}$/, "Enter a valid phone number."),
  role: z.enum(ALLOWED_ROLES_TO_CREATE_BY_THIS_USER),
});

export const createNewUserFormDefaultValues: z.infer<
  typeof createNewUserFormSchema
> = {
  name: "",
  email: "",
  phone: "",
  role: "MR",
};

export function CreateNewUserForm() {
  const { mutateAsync, isPending } = useCreateNewUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    userDetailsFromCookie: { userId },
  } = useRouteContext({ from: "/(authenticated-routes)/dashboard/" });

  const form = useForm({
    defaultValues: createNewUserFormDefaultValues,

    validators: {
      onSubmit: createNewUserFormSchema,
    },

    onSubmit: async ({ value }) => {
      const { email, name, phone, role } = value;

      await mutateAsync({
        data: {
          dataToInsert: {
            email,
            name,
            phone,
            role,
            employeeCode: generateEmployeeCode({ role }),
            username: generateUsernameFromEmail({ email }),
            referrerId: userId,
          },
        },
      });

      form.reset();
      setIsModalOpen(false);
    },
  });

  return (
    <AlertDialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="primary" className="w-full">
          <span>Create a new user</span>
          <Plus />
        </Button>
      </AlertDialogTrigger>

      <VisuallyHidden>
        <AlertDialogHeader>New user form</AlertDialogHeader>
      </VisuallyHidden>

      <AlertDialogContent>
        <form
          className="space-y-4"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Create a new user</h2>
            <p className="text-muted-foreground text-sm">
              Enter the user's details below.
            </p>
          </div>

          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                value.trim().length < 2
                  ? "Name must contain at least 2 characters"
                  : undefined,
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  placeholder="Enter full name"
                  autoComplete="name"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors.map((error, index) => (
                  <p
                    key={`${field.name}-${index}`}
                    className="text-destructive text-sm"
                  >
                    {typeof error === "string" ? error : error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field
            name="email"
            validators={{
              onChange: ({ value }) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
                  ? undefined
                  : "Enter a valid email address",
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Email</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  placeholder="user@example.com"
                  autoComplete="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors.map((error, index) => (
                  <p
                    key={`${field.name}-${index}`}
                    className="text-destructive text-sm"
                  >
                    {typeof error === "string" ? error : error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="phone">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Phone</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="tel"
                  placeholder="Enter phone number"
                  autoComplete="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
                {field.state.meta.errors.map((error, index) => (
                  <p
                    key={`${field.name}-${index}`}
                    className="text-destructive text-sm"
                  >
                    {typeof error === "string" ? error : error?.message}
                  </p>
                ))}
              </div>
            )}
          </form.Field>

          <form.Field name="role">
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name}>Role</Label>

                <Select
                  value={field.state.value}
                  onValueChange={(value) =>
                    field.handleChange(
                      value as (typeof ALLOWED_ROLES_TO_CREATE_BY_THIS_USER)[number],
                    )
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    className="w-full"
                    onBlur={field.handleBlur}
                  >
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>

                  <SelectContent>
                    {ALLOWED_ROLES_TO_CREATE_BY_THIS_USER.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role.replaceAll("_", " ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </form.Field>

          <AlertDialogFooter className={cn(`justify-between`)}>
            <Button
              type="button"
              variant="destructive"
              asChild
              disabled={isPending}
            >
              <AlertDialogCancel>Cancel</AlertDialogCancel>
            </Button>

            <form.Subscribe
              selector={(state) => ({
                canSubmit: state.canSubmit,
                isSubmitting: state.isSubmitting,
              })}
            >
              {({ canSubmit, isSubmitting }) => (
                <Button
                  type="submit"
                  variant="primary"
                  disabled={!canSubmit || isSubmitting || isPending}
                >
                  {isPending || isSubmitting ? "Creating..." : "Create user"}
                </Button>
              )}
            </form.Subscribe>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
