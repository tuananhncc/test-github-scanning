export type TutorApplicationStatus = 'pending' | 'approved' | 'rejected'

export type TutorCertificate = {
  id: string
  name: string
  size: string
  url?: string
}

export type TutorApplication = {
  id: string
  name: string
  subject: string
  subjectColor: string
  date: string
  status: TutorApplicationStatus
  videoUrl: string
  introVideoTitle: string
  introPreview: string
  headline: string
  motivate: string
  introduce: string
  experience: string
  certificates: TutorCertificate[]
}

/** Body for approve API (optional feedback) */
export type TutorApplicationApproveBody = {
  feedback?: string
}

/** Body for reject API */
export type TutorApplicationRejectBody = {
  feedback?: string
}
