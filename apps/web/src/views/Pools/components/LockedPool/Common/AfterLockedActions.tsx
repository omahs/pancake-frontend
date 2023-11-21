import { Box, Flex, Message, MessageText, useMatchBreakpoints } from '@pancakeswap/uikit'
import Trans from 'components/Trans'
import { ReactNode, memo } from 'react'
import { VaultPosition } from 'utils/cakePool'
import { AfterLockedActionsPropsType } from '../types'
import WithdrawAllButton from '../Buttons/WithdrawAllButton'

const msg: Record<VaultPosition, ReactNode> = {
  [VaultPosition.None]: null,
  [VaultPosition.Flexible]: null,
  [VaultPosition.Locked]: null,
  [VaultPosition.LockedEnd]: (
    <Trans>
      Extending or adding CAKE is not available for migrated positions. To get more veCAKE, withdraw from the unlocked
      CAKE pool position, and add CAKE to veCAKE.
    </Trans>
  ),
  [VaultPosition.AfterBurning]: (
    <Trans>
      Extending or adding CAKE is not available for migrated positions. To get more veCAKE, withdraw from the unlocked
      CAKE pool position, and add CAKE to veCAKE.
    </Trans>
  ),
}

const AfterLockedActions: React.FC<React.PropsWithChildren<AfterLockedActionsPropsType>> = ({
  position,
  isInline,
  hideConvertToFlexibleButton,
}) => {
  const { isDesktop } = useMatchBreakpoints()
  const isDesktopView = isInline && isDesktop
  const Container = isDesktopView ? Flex : Box

  return (
    <Message
      variant="warning"
      mb="16px"
      action={
        <Container mt={!isDesktopView ? '8px' : undefined} ml="10px">
          {/* <ExtendButton
            modalTitle={t('Renew')}
            lockEndTime="0"
            lockStartTime="0"
            stakingToken={stakingToken}
            stakingTokenPrice={stakingTokenPrice}
            currentLockedAmount={currentLockedAmount}
            minWidth="186px"
            variant="primary"
            mr={isDesktopView && '14px'}
            mb={!isDesktopView && '8px'}
            isRenew
            customLockWeekInSeconds={customLockWeekInSeconds}
          >
            {t('Renew')}
          </ExtendButton> */}
          {!hideConvertToFlexibleButton && <WithdrawAllButton minWidth={isDesktopView ? '200px' : undefined} />}
        </Container>
      }
      actionInline={isDesktopView}
    >
      <MessageText>{msg[position]}</MessageText>
    </Message>
  )
}

export default memo(AfterLockedActions)
