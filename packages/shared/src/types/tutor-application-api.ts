/**
 * API response shape for GET /admin/tutor-applications (from TutorProfile + optional relations).
 * Matches DB schema: tutor_profiles + optional languages.
 */
export type TutorApplicationApiItem = {
  id: string
  user_id: string
  first_name: string
  last_name: string
  avatar: string
  video_url: string
  country: string
  subject: string
  introduce: string
  experience: string
  motivate: string
  headline: string
  verification_status: string
  created_at: string
  languages?: { language_code: string }[]
}
