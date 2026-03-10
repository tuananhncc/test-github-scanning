import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useTheme, useMedia } from 'tamagui'
import {
  AdminTable,
  AppButton,
  type AdminTableColumn,
  type AdminTableRow,
  Text,
  XStack,
  YStack,
} from '@mezon-tutors/app/ui'
import { EyeIcon } from '@mezon-tutors/app/ui/icons/EyeIcon'
import { CloseCircleIcon } from '@mezon-tutors/app/ui/icons/CloseCircle'
import type { TutorApplication } from './types'
import { CircleCheckIcon } from '@mezon-tutors/app/ui/icons'

export type TutorApplicationsListProps = {
  applications: TutorApplication[]
  selectedId: string | null
  onSelect: (id: string) => void
  onApprove: (id: string) => void
  onReject: (id: string) => void
  onFilterClick?: () => void
  onExportCsvClick?: () => void
}

export function TutorApplicationsList({
  applications,
  selectedId,
  onSelect,
  onApprove,
  onReject,
  onFilterClick,
  onExportCsvClick,
}: TutorApplicationsListProps) {
  const t = useTranslations('Admin.TutorApplications')
  const theme = useTheme()
  const media = useMedia()
  const primaryColor = theme.appPrimary?.val
  const successColor = theme.green6?.val
  const dangerColor = theme.red6?.val
  const itemBackground = theme.itemBackground?.val
  const mutedColor = theme.colorMuted?.val

  // On small screens show only name + actions to avoid overflow
  const isNarrow = media.sm || media.xs

  const fullColumns: AdminTableColumn[] = [
    {
      id: 'tutorName',
      label: t('list.columns.tutorName'),
      flex: 2,
      align: 'left',
    },
    {
      id: 'subject',
      label: t('list.columns.subject'),
      flex: 1,
      align: 'left',
    },
    {
      id: 'date',
      label: t('list.columns.date'),
      flex: 1,
      align: 'left',
    },
    {
      id: 'actions',
      label: t('list.columns.actions'),
      width: 88,
      align: 'right',
    },
  ]

  const narrowColumns: AdminTableColumn[] = [
    {
      id: 'tutorName',
      label: t('list.columns.tutorName'),
      flex: 1,
      align: 'left',
    },
    {
      id: 'actions',
      label: t('list.columns.actions'),
      width: 88,
      align: 'right',
    },
  ]

  const columns = isNarrow ? narrowColumns : fullColumns

  const PAGE_SIZE = 10
  const total = applications.length
  const totalPages = total > 0 ? Math.ceil(total / PAGE_SIZE) : 1
  const [currentPage, setCurrentPage] = useState(1)

  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * PAGE_SIZE
  const endIndex = Math.min(startIndex + PAGE_SIZE, total)
  const visibleCount = endIndex - startIndex

  const pagedApplications = applications.slice(startIndex, endIndex)

  const rows: AdminTableRow[] = pagedApplications.map((app) => {
    const isSelected = app.id === selectedId

    const nameCell = (
      <YStack key="name" gap={2}>
        <Text fontWeight={isSelected ? '600' : '500'} variant="muted">
          {app.name}
        </Text>
        {isNarrow && (
          <Text size="sm" variant="muted">
            {app.subject} · {app.date}
          </Text>
        )}
      </YStack>
    )

    const subjectCell = (
      <YStack key="subject" alignItems="flex-start">
        <YStack
          paddingVertical={4}
          paddingHorizontal={10}
          borderRadius={999}
          backgroundColor={itemBackground}
        >
          <Text size="sm" color="$appPrimary" fontWeight={'700'}>
            {app.subject}
          </Text>
        </YStack>
      </YStack>
    )

    const dateCell = (
      <Text key="date" size="sm" variant="muted">
        {app.date}
      </Text>
    )

    const actionsCell = (
      <XStack key="actions" justifyContent="flex-end" gap={10}>
        <YStack
          width={32}
          height={32}
          borderRadius={999}
          alignItems="center"
          justifyContent="center"
          backgroundColor={isSelected ? primaryColor : itemBackground}
        >
          <EyeIcon size={16} color={isSelected ? '#FFFFFF' : mutedColor} />
        </YStack>
        <YStack
          width={32}
          height={32}
          borderRadius={999}
          alignItems="center"
          justifyContent="center"
          backgroundColor={itemBackground}
          cursor="pointer"
          onPress={(e: unknown) => {
            ;(e as { stopPropagation?: () => void })?.stopPropagation?.()
            onApprove(app.id)
          }}
        >
          <CircleCheckIcon size={24} color={successColor} />
        </YStack>
        <YStack
          width={32}
          height={32}
          borderRadius={999}
          alignItems="center"
          justifyContent="center"
          backgroundColor={itemBackground}
          cursor="pointer"
          onPress={(e: unknown) => {
            ;(e as { stopPropagation?: () => void })?.stopPropagation?.()
            onReject(app.id)
          }}
        >
          <CloseCircleIcon size={18} color={dangerColor} />
        </YStack>
      </XStack>
    )

    const cells = isNarrow
      ? [nameCell, actionsCell]
      : [nameCell, subjectCell, dateCell, actionsCell]

    return {
      id: app.id,
      isSelected,
      onPress: () => onSelect(app.id),
      cells,
    }
  })

  return (
    <YStack flexBasis={380} flexGrow={1} minWidth={0} gap={16}>
      <XStack justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={12}>
        <YStack gap={4}>
          <Text size="lg" fontWeight="700" fontSize={20} variant="default" marginLeft={10}>
            {t('list.title')}
          </Text>
        </YStack>

        <XStack gap={9} flexShrink={0}>
          <AppButton variant="tertiary" height={40} fontWeight={'600'} onPress={onFilterClick}>
            {t('list.filters')}
          </AppButton>
          <AppButton variant="tertiary" height={40} fontWeight={'600'} onPress={onExportCsvClick}>
            {t('list.exportCsv')}
          </AppButton>
        </XStack>
      </XStack>

      <YStack overflow="auto" minWidth={0} maxWidth="100%">
        <AdminTable
          columns={columns}
          rows={rows}
          footer={
            <XStack
              width="100%"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={12}
            >
              <Text size="sm" variant="muted">
                {t('list.subtitle', { count: visibleCount, total })}
              </Text>

              <XStack gap={8} alignItems="center" flexShrink={0}>
                <AppButton
                  variant="secondary"
                  height={32}
                  disabled={safePage === 1}
                  onPress={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  {t('list.pagination.prev')}
                </AppButton>

                {Array.from({ length: Math.min(3, totalPages) }, (_, index) => {
                  const pageNumber = index + 1
                  const isActive = pageNumber === safePage

                  return (
                    <AppButton
                      key={pageNumber}
                      variant={isActive ? 'primary' : 'tertiary'}
                      borderRadius={10}
                      height={32}
                      width={40}
                      onPress={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </AppButton>
                  )
                })}

                <AppButton
                  variant="secondary"
                  height={32}
                  disabled={safePage === totalPages}
                  onPress={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                >
                  {t('list.pagination.next')}
                </AppButton>
              </XStack>
            </XStack>
          }
        />
      </YStack>
    </YStack>
  )
}
