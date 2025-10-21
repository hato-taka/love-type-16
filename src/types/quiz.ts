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
  workStyle: string;
  loveView: string;
  marriageView: string;
  lifeView: string;
  oshiStyle: string;
}

export interface PersonalityResult {
  type: string;
  character: string;
  title: string;
  summary?: string;
  description: ResultDescription;
  image: string;
  shareImageUrl?: string;
}
