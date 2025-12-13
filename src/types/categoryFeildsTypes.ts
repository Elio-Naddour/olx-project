export interface CategoryFeild {
  flatFields: FlatField[];
  childrenFields: ChildrenField[];
  parentFieldLookup: ParentFieldLookup;
}

export interface ChildrenField {
  id: number;
  valueType: ValueType;
  roles: string[];
  choices: { [key: string]: Choice[] };
  attribute: string;
  categoryID: number;
  groupIndex: number;
  maxFieldFacetSize: number;
  seoTitle: SEO;
  paaSection: number;
  name: string;
  filterType: FilterType;
  isMandatory: boolean;
  state: State;
  displayPriority: number;
  titlePriority: number;
  pathPriority: number;
  minValue: null;
  maxValue: null;
  minLength: null;
  maxLength: null;
}

export interface Choice {
  value: string;
  label: string;
  label_l1?: string;
  slug?: string;
  seoSlug: SEO;
  extraFields: ExtraFields;
  id: number;
  displayPriority: number | null;
  popularityRank: number;
  roles: any[];
  parentID?: number;
}

export interface ExtraFields {}

export interface SEO {
  en: string;
  ar: string;
}

export enum FilterType {
  MultipleChoice = "multiple_choice",
  Range = "range",
  SingleChoice = "single_choice",
}

export enum State {
  Active = "active",
}

export enum ValueType {
  Enum = "enum",
  EnumMultiple = "enum_multiple",
  Float = "float",
  Integer = "integer",
  String = "string",
}

export interface FlatField {
  id: number;
  valueType: ValueType;
  roles: string[];
  choices?: Choice[];
  attribute: string;
  categoryID: number;
  groupIndex: number;
  maxFieldFacetSize: number | null;
  seoTitle: SEO;
  paaSection: number | null;
  name: string;
  filterType: FilterType;
  isMandatory: boolean;
  state: State;
  displayPriority: number;
  titlePriority: number;
  pathPriority?: number;
  minValue: number | null;
  maxValue: number | null;
  minLength: null;
  maxLength: number | null;
  choiceGroups?: { [key: string]: ChoiceGroup };
}

export interface ChoiceGroup {
  label: string;
  label_l1: string;
  displayPriority: number;
  choices: Choices;
  id: string;
}

export interface Choices {
  all: Choice[];
}

export interface ParentFieldLookup {
  model: string;
}
