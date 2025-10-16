import { Quiz } from '@/features/quiz/components/Quiz';
import { getQuestions } from '@/lib/quiz';

const questions = getQuestions();

export default function HomePage() {
  return <Quiz questions={questions} />;
}
