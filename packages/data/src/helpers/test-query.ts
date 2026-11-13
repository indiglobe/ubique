import { read__OneManagerials } from "@/querries/managerial-relationships";

(async () => {
  console.log(
    await (async () => {
      // ====================
      // ====================
      // ====================

      return await read__OneManagerials({
        identifier: { managerId: "C19226A043" },
      });

      // ====================
      // ====================
      // ====================
    })(),
  );
})();
