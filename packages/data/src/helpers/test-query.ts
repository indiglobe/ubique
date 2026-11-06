import { read__AllEducationalQualification } from "@/querries/educational-qualification";

(async () => {
  console.log(
    await (async () => {
      // ====================
      // ====================
      // ====================

      return await read__AllEducationalQualification({
        identifier: { profileId: "218AE9922D" },
      });

      // ====================
      // ====================
      // ====================
    })(),
  );
})();
