// src/routes/selfie.tsx

import { createFileRoute } from "@tanstack/react-router";
import SelfiePage from "@/components/main/user-name/selfie-page";

export const Route = createFileRoute("/selfie")({
  component: SelfiePage,
});