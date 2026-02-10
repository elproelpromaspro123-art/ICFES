export interface Question {
  id: number;
  text: string;
  options: { letter: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  image?: string;
  sharedImage?: string;
  extraImage?: string;
  groupLabel?: string;
  groupText?: string;
}
