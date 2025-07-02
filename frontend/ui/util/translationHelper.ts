import { Gender } from "@/enums/gender";

export const getTranslatedSex = (
  t: Function,
  sex: Gender | undefined
): string => {
  if (!sex) return "-";

  const sexTranslationMap: Record<Gender, string> = {
    MALE: t("Pet.sex.male"),
    FEMALE: t("Pet.sex.female"),
  };

  return sexTranslationMap[sex];
};
