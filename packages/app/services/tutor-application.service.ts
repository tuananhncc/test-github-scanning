import type {
  TutorApplication,
  TutorApplicationApproveBody,
  TutorApplicationRejectBody,
  TutorApplicationApiItem,
} from '@mezon-tutors/shared'
import { apiClient } from './api-client'

const BASE = '/admin/tutor-applications'

const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  })

const mapItem = (item: TutorApplicationApiItem): TutorApplication => ({
  id: item.id,
  name: `${item.first_name} ${item.last_name}`.trim(),
  subject: item.subject,
  subjectColor: '#4299E1',
  date: formatDate(item.created_at),
  status:
    item.verification_status === 'pending' ||
    item.verification_status === 'approved' ||
    item.verification_status === 'rejected'
      ? (item.verification_status as TutorApplication['status'])
      : 'pending',
  videoUrl: item.video_url,
  introVideoTitle: 'Intro Video',
  introPreview: item.introduce || item.motivate || item.experience,
  headline: item.headline,
  motivate: item.motivate,
  introduce: item.introduce,
  experience: item.experience,
  certificates: [],
})

export const tutorApplicationService = {
  async getList(): Promise<TutorApplication[]> {
    const data = await apiClient.get<TutorApplicationApiItem[]>(BASE)
    return data.map(mapItem)
  },

  async approve(id: string, body?: TutorApplicationApproveBody): Promise<void> {
    await apiClient.post(`${BASE}/${id}/approve`, body ?? {})
  },

  async reject(id: string, body?: TutorApplicationRejectBody): Promise<void> {
    await apiClient.post(`${BASE}/${id}/reject`, body ?? {})
  },
}
