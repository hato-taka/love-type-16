export type Dimension = 'principle' | 'cognition' | 'stance' | 'energy';

export type ChoiceValue = 'A' | 'B';

export interface QuestionOption {
  label: string;
  value: ChoiceValue;
}

export interface Question {
  id: number;
  text: string;
  dimension: Dimension;
  options: QuestionOption[];
}

export interface ResultDescription {
  働き方: string;
  恋愛観: string;
  結婚観: string;
  人生観: string;
  推し活タイプ: string;
}

export interface PersonalityResult {
  type: string;
  character: string;
  title: string;
  description: ResultDescription;
  image: string;
}
