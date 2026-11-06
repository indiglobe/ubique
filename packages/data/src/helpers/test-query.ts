import { read__OneEmployeeProfile } from "@/querries/employee-profile";

(async () => {
  console.log(
    await (async () => {
      // ====================
      // ====================
      // ====================

      return await read__OneEmployeeProfile({
        identifier: { id: "03E4D90C52" },
      });

      // ====================
      // ====================
      // ====================
    })(),
  );
})();
