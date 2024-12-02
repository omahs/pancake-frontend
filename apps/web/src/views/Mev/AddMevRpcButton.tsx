import { useTranslation } from '@pancakeswap/localization'
import { Button, CheckmarkCircleFillIcon, SwapLoading } from '@pancakeswap/uikit'
import ConnectWalletButton from 'components/ConnectWalletButton'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTheme from 'hooks/useTheme'
import { useState } from 'react'
import { useAddMevRpc, useIsMEVEnabled } from './hooks'

export const AddMevRpcButton: React.FC = () => {
  const { t } = useTranslation()
  const { account } = useActiveWeb3React()

  const { isMEVEnabled, refetch, isLoading: isMEVStatusLoading, isError } = useIsMEVEnabled()
  const [isLoading, setIsLoading] = useState(false)
  const { theme } = useTheme()
  const { addMevRpc } = useAddMevRpc(
    () => {
      refetch()
    },
    () => setIsLoading(true),
    () => setIsLoading(false),
  )

  if (!account) {
    return <ConnectWalletButton withIcon />
  }
  console.log('isMEVEnabled', isMEVEnabled, isError, isMEVStatusLoading)
  if (isMEVStatusLoading || isError) {
    return null
  }

  return (
    <Button
      width="100%"
      endIcon={
        isLoading ? (
          <SwapLoading />
        ) : isMEVEnabled ? (
          <CheckmarkCircleFillIcon color={theme.isDark ? 'white' : theme.colors.background} />
        ) : undefined
      }
      variant={isMEVEnabled ? 'success' : undefined}
      isLoading={isLoading}
      onClick={isMEVEnabled && !isLoading ? undefined : addMevRpc}
    >
      {isLoading ? t('Adding to wallet') : isMEVEnabled ? t('Added to wallet') : t('Add to wallet')}
    </Button>
  )
}
