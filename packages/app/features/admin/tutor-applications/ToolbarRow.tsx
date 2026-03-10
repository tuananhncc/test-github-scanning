import { useTranslations } from 'next-intl'
import { Input, useTheme } from 'tamagui'
import { XStack, YStack } from '@mezon-tutors/app/ui'
import { SearchIcon } from '@mezon-tutors/app/ui/icons'
import { BellIcon } from '@mezon-tutors/app/ui/icons/BellIcon'
import { SettingsIcon } from '@mezon-tutors/app/ui/icons/SettingIcon'

export type TutorApplicationsToolbarRowProps = {
  search: string
  onSearchChange: (value: string) => void
  onNotificationsPress?: () => void
  onSettingsPress?: () => void
}

export function TutorApplicationsToolbarRow({
  search,
  onSearchChange,
  onNotificationsPress,
  onSettingsPress,
}: TutorApplicationsToolbarRowProps) {
  const t = useTranslations('Admin.TutorApplications')
  const theme = useTheme()
  const colorMuted = theme.colorMuted?.val

  return (
    <XStack alignItems="center" gap={16} margin={10}>
      <XStack
        flex={1}
        alignItems="center"
        paddingHorizontal={16}
        borderRadius={999}
        backgroundColor="$headerBackground"
        borderWidth={1}
        borderColor="$borderSubtle"
        gap={8}
        height={44}
      >
        <SearchIcon size={18} color={colorMuted} />
        <Input
          flex={1}
          placeholder={t('searchPlaceholder')}
          backgroundColor="transparent"
          borderWidth={0}
          borderColor="transparent"
          outlineWidth={0}
          focusStyle={{
            borderColor: 'transparent',
            shadowColor: 'transparent',
            outlineWidth: 0,
          }}
          color="$color"
          value={search}
          onChangeText={onSearchChange}
        />
      </XStack>

      <XStack gap={10}>
        <YStack
          width={36}
          height={36}
          borderRadius={999}
          backgroundColor="$backgroundMuted"
          borderWidth={1}
          borderColor="$borderSubtle"
          alignItems="center"
          justifyContent="center"
          onPress={onNotificationsPress}
        >
          <BellIcon size={18} color={colorMuted} />
        </YStack>
        <YStack
          width={36}
          height={36}
          borderRadius={999}
          backgroundColor="$backgroundMuted"
          borderWidth={1}
          borderColor="$borderSubtle"
          alignItems="center"
          justifyContent="center"
          onPress={onSettingsPress}
        >
          <SettingsIcon size={18} color={colorMuted} />
        </YStack>
      </XStack>
    </XStack>
  )
}
