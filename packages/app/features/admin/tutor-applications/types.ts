export type MetricStatus = 'good' | 'warning' | 'bad'

export type MetricId = 'total-pending' | 'approved-today' | 'avg-review-time'

export type MetricCard = {
  id: MetricId
  value: string
  changePercent: number
  betterWhen: 'higher' | 'lower'
  titleKey: string
  helperKey: string
}

// Re-export shared tutor application types for feature use
export type {
  TutorApplicationStatus,
  TutorCertificate,
  TutorApplication,
  TutorApplicationApproveBody,
  TutorApplicationRejectBody,
} from '@mezon-tutors/shared'
