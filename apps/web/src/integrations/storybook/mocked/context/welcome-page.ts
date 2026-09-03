import type { fetchSession } from "@/lib/auth/session";
import type { DeepPartial } from "@/utils/types/storybook";

type TWelcomePageContext = {
  session: DeepPartial<Awaited<ReturnType<typeof fetchSession>>>;
};

export function mocked__welcomePageContext({ image }: { image: boolean }) {
  return {
    session: {
      user: {
        email: "some@email.com",
        name: "Some Name",
        image: image ? "https://images.pexels.com/photos/30968488/pexels-photo-30968488.jpeg" : null,
      },
    },
  } satisfies TWelcomePageContext;
}
