import { read__OneOnroleUserProfile } from "@/querries/onrole-user-profile";

(async () => {
  console.log(
    await (async () => {
      // ====================
      // ====================
      // ====================

      return await read__OneOnroleUserProfile({
        identifier: { id: "03E4D90C52" },
      });

      // ====================
      // ====================
      // ====================
    })(),
  );
})();
