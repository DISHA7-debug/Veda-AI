// Core assignment types for the VedaAI frontend

export interface QuestionType {
  id: string;
  type: string;
  numQuestions: number;
  marks: number;
}

export interface Assignment {
  id: string;
  title: string;
  subject?: string;
  className?: string;
  dueDate: string;
  assignedOn: string;
  status: 'pending' | 'in-progress' | 'completed';
  createdAt: string;
  totalQuestions?: number;
  totalMarks?: number;
}

export interface AssignmentDetail extends Assignment {
  school?: string;
  timeAllowed?: string;
  instructions?: string;
  questionTypes: QuestionType[];
  additionalInfo?: string;
  questions?: GeneratedQuestion[];
  answers?: GeneratedAnswer[];
}

export interface GeneratedQuestion {
  no: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard' | 'Challenging';
  text: string;
  marks: number;
}

export interface GeneratedAnswer {
  no: number;
  question: string;
  answer: string;
}

export interface CreateAssignmentPayload {
  title: string;
  dueDate: string;
  questionTypes: QuestionType[];
  totalMarks: number;
  totalQuestions: number;
  instructions?: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
