import React, { useState } from "react";
import {
  CategoryFeild,
  ChildrenField,
  Choice,
  FilterType,
  FlatField,
  ValueType,
} from "@/types/categoryFeildsTypes";
import DropdownSelect from "@/components/atoms/DropdownSelect/DropdownSelect";
import Input from "@/components/atoms/Input/Input";
import styles from "./DynamicCategoryForm.module.css";
import ImageUploadGrid from "@/components/molecules/ImageUlpoadGrid/ImageUploadGrid";
import CategoryCard from "@/components/atoms/CategoryCard/CategoryCard";
import { CategoryState } from "@/store/slices/categorySlice";
import { useI18n } from "@/i18n";

interface Props {
  category: CategoryFeild;
  locale?: "en" | "ar";
  cardNames: CategoryState;
}

const DynamicCategoryForm: React.FC<Props> = ({ category, cardNames }) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { t } = useI18n();

  const setValue = (key: string, value: any) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // ---------------- VALIDATION ----------------
  const validate = () => {
    const nextErrors: Record<string, string> = {};

    category.flatFields.forEach((field) => {
      const v = values[field.attribute];
      if (field.isMandatory) {
        if (
          v === undefined ||
          v === null ||
          v === "" ||
          (Array.isArray(v) && v.length === 0)
        ) {
          nextErrors[field.attribute] = "This field is required";
        }
      }
    });

    category.childrenFields.forEach((field) => {
      const v = values[field.attribute];
      if (field.isMandatory) {
        if (!v || (Array.isArray(v) && v.length === 0)) {
          nextErrors[field.attribute] = "This field is required";
        }
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  // ---------------- CHOICES ----------------
  const renderChoices = (
    fieldKey: string,
    choices: Choice[],
    filterType: FilterType
  ) => {
    if (filterType === FilterType.SingleChoice) {
      return (
        <DropdownSelect
          choices={choices}
          onChange={(val: any) => setValue(fieldKey, val)}
          value={values[fieldKey] ?? ""}
        />
      );
    }

    // api is wrong compared to production web

    if (filterType === FilterType.MultipleChoice) {
      const current: string[] = Array.isArray(values[fieldKey])
        ? values[fieldKey]
        : [];

      return (
        <div className={styles.checkboxs}>
          {choices?.map((c) => (
            <label key={c.id} className={styles.checkboxLabel}>
              <input
                className={styles.checkboxInput}
                type="checkbox"
                checked={current.includes(c.value)}
                onChange={(e) => {
                  setValue(
                    fieldKey,
                    e.target.checked
                      ? [...current, c.value]
                      : current.filter((v) => v !== c.value)
                  );
                }}
              />
              <div>{c.label}</div>
            </label>
          ))}
        </div>
      );
    }

    return null;
  };

  // ---------------- FIELDS ----------------
  const renderFlatField = (field: FlatField) => {
    const key = field.attribute;

    switch (field.valueType) {
      case ValueType.String:
        return (
          <Input
            type="text"
            value={values[key] ?? ""}
            onChange={(e) => setValue(key, e.target.value)}
          />
        );

      case ValueType.Integer:
      case ValueType.Float:
        return (
          <Input
            type="number"
            min={field.minValue ?? undefined}
            max={field.maxValue ?? undefined}
            value={values[key] ?? ""}
            onChange={(e) => setValue(key, e.target.value)}
          />
        );

      case ValueType.Enum:
      case ValueType.EnumMultiple:
        return field.choices
          ? renderChoices(key, field.choices, field.filterType)
          : null;

      default:
        return null;
    }
  };

  const renderChildrenField = (field: ChildrenField, parentKey: string) => {
    const key = field.attribute;
    const allChoices = field.choices[values[parentKey ?? ""]];

    return renderChoices(key, allChoices, field.filterType);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    console.log("FORM VALUES", values);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formRow}>
        <label className={styles.formRowLabel}>{t("Category")}</label>
        <CategoryCard
          category={cardNames.selectedCategoryName ?? ""}
          subCategory={cardNames.selectedSubCategoryName ?? ""}
          complementaryCategory={
            cardNames.selectedComplementaryCategoryName ?? ""
          }
          endComponent={<div>{t("Change")}</div>}
        />
      </div>
      <div className={styles.formRow}>
        <label className={styles.formRowLabel}>{t("UploadImages")}</label>
        <ImageUploadGrid />
      </div>
      {category.flatFields?.map((field) => (
        <div key={field.id}>
          <div className={styles.formRow}>
            <label className={styles.formRowLabel}>
              {field.name}
              {field.isMandatory && " *"}
            </label>
            {renderFlatField(field)}
          </div>
          <div className={styles.formRow}>
            {field.attribute === category.parentFieldLookup.model && (
              <>
                <label className={styles.formRowLabel}>
                  {category.childrenFields[0].name}
                  {category.childrenFields[0].isMandatory && " *"}
                </label>
                {renderChildrenField(
                  category.childrenFields[0],
                  category.parentFieldLookup.model
                )}
              </>
            )}
          </div>

          {errors[field.attribute] && (
            <small style={{ color: "red" }}>{errors[field.attribute]}</small>
          )}
        </div>
      ))}

      <button type="submit" className={styles.submit}>
        Submit
      </button>
    </form>
  );
};

export default DynamicCategoryForm;
