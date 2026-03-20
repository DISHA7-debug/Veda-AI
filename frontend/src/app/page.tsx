import { redirect } from 'next/navigation';

// Redirect root to assignments list
export default function RootPage() {
  redirect('/assignments');
}
