
"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  UserRound,
  Mail,
  Pencil,
  Camera,
  ShieldCheck,
  LogOut,
  Trash2,
  ChevronRight,
  Fingerprint,
  X,
} from "lucide-react";
import { handleLogout } from "@/lib/actions/Auth";

interface UserProfileProps {
  userName: string | null;
  userEmail: string;
  userBio?: string | null;
}

async function handleUpdate(updatedName: string) {
  const res = await fetch("/api/updateProfile", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: updatedName,
    }),
  });

  const result = await res.json();

  if (!res.ok || !result.success) {
    throw new Error(result.message || "Profile update failed");
  }

  return result;
}

export default function Profile({
  userName,
  userEmail,
  userBio,
}: UserProfileProps) {
  const [displayName, setDisplayName] = useState(userName ?? "");
  const [isEditingName, setIsEditingName] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  const initials = displayName
    ? displayName.charAt(0).toUpperCase()
    : "U";

  // Open edit mode
  const handleEdit = () => {
    setError("");
    setIsEditingName(true);
  };

  // Cancel editing
  const handleCancel = () => {
    setError("");
    setIsEditingName(false);
  };

  // Submit updated name
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();


    const formData = new FormData(e.currentTarget);

    const updatedName = String(
      formData.get("updatedName") ?? ""
    ).trim();

    if (!updatedName) {
      setError("Name cannot be empty.");
      return;
    }

    if (updatedName === displayName) {
      setIsEditingName(false);
      setError("");
      return;
    }

    try {
      setIsSaving(true);
      setError("");

      await handleUpdate(updatedName);

      // Update the displayed name after successful API response
      setDisplayName(updatedName);
      setIsEditingName(false);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-muted/30 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Page heading */}
        <div className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            Account settings
          </p>

          <h1 className="text-3xl font-semibold tracking-tight">
            Your profile
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your personal information and account preferences.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

          {/* Left profile card */}
          <Card className="h-fit border-border/70 shadow-sm">
            <CardContent className="flex flex-col items-center px-6 py-8 text-center">

              <div className="group relative mb-5">
                <div className="flex h-28 w-28 items-center justify-center rounded-3xl bg-foreground text-4xl font-semibold text-background">
                  {initials}
                </div>

                <Button
                  type="button"
                  size="icon"
                  variant="secondary"
                  aria-label="Change profile picture"
                  className="absolute -bottom-2 -right-2 h-9 w-9 rounded-full border shadow-sm"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>

              <h2 className="text-xl font-semibold">
                {displayName || "Unnamed User"}
              </h2>

              <p className="mt-1 break-all text-sm text-muted-foreground">
                {userEmail}
              </p>

              <div className="mt-6 flex items-center gap-2 rounded-full border bg-muted/50 px-3 py-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-xs font-medium">
                  Account active
                </span>
              </div>

              <div className="mt-8 w-full border-t pt-6 text-left">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Account overview
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserRound className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Personal information
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Fingerprint className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">
                      Account security
                    </span>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Right content */}
          <div className="space-y-6">

            {/* Personal information */}
            <Card className="border-border/70 shadow-sm">

              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div className="space-y-1">
                  <CardTitle className="text-lg">
                    Personal information
                  </CardTitle>

                  <p className="text-sm text-muted-foreground">
                    Your public-facing account details.
                  </p>
                </div>

                <UserRound className="h-5 w-5 text-muted-foreground" />
              </CardHeader>

              <CardContent className="space-y-6">

                {/* Display name */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-3 border-b pb-5"
                >
                  <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0 flex-1 space-y-2">
                      <Label className="text-xs text-muted-foreground">
                        Display name
                      </Label>

                      {isEditingName ? (
                        <Input
                          type="text"
                          name="updatedName"
                          defaultValue={displayName}
                          autoFocus
                          maxLength={50}
                          disabled={isSaving}
                        />
                      ) : (
                        <p className="truncate text-base font-medium">
                          {displayName || "Not provided"}
                        </p>
                      )}
                    </div>

                    {isEditingName ? (
                      <div className="flex shrink-0 gap-2">

                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={handleCancel}
                          disabled={isSaving}
                          aria-label="Cancel editing"
                        >
                          <X className="h-4 w-4" />
                        </Button>

                        <Button
                          type="submit"
                          size="sm"
                          disabled={isSaving}
                        >
                          {isSaving ? "Saving..." : "Save"}
                        </Button>

                      </div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={handleEdit}
                        className="shrink-0 gap-2"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Edit
                      </Button>
                    )}

                  </div>

                  {error && (
                    <p className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                </form>

                {/* Email */}
                <div className="flex items-center justify-between gap-4 border-b pb-5">
                  <div className="min-w-0 space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      Email address
                    </Label>

                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />

                      <p className="truncate text-sm font-medium">
                        {userEmail}
                      </p>
                    </div>
                  </div>

                  <span className="shrink-0 text-xs text-muted-foreground">
                    Primary
                  </span>
                </div>

                {/* Bio */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0 space-y-2">
                    <Label className="text-xs text-muted-foreground">
                      About you
                    </Label>

                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {userBio || "You haven't added a bio yet."}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="shrink-0 gap-2"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </Button>
                </div>

              </CardContent>
            </Card>

            {/* Security */}
            <Card className="border-border/70 shadow-sm">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5" />

                  <CardTitle className="text-lg">
                    Security
                  </CardTitle>
                </div>

                <p className="text-sm text-muted-foreground">
                  Manage access to your account.
                </p>
              </CardHeader>

              <CardContent>
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-lg border p-4 text-left transition-colors hover:bg-muted/50"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      Password and authentication
                    </p>

                    <p className="text-xs text-muted-foreground">
                      Manage your account credentials.
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              </CardContent>
            </Card>

            {/* Danger zone */}
            <Card className="border-destructive/30 shadow-sm">
              <CardContent className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">

                <div className="space-y-1">
                  <h3 className="font-semibold text-destructive">
                    Danger zone
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    Sign out or permanently remove your account.
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  <Button
                    onClick={handleLogout}
                    type="button"
                    variant="outline"
                    size="sm"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>

                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete account
                  </Button>
                </div>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </main>
  );
}
