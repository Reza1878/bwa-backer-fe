import { cloneDeep, has, merge } from "lodash";

export function purgeInitialFormData(initialFormData: any, baseBlankForm: any) {
  const blankForm = cloneDeep(baseBlankForm);

  const formData = merge(cloneDeep(blankForm), initialFormData);

  Object.keys(initialFormData).forEach((key) => {
    if (!has(blankForm, key)) {
      delete formData[key];
    }
  });

  return formData;
}
