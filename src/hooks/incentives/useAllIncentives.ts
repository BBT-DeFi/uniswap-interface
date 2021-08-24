import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { Pool } from '@uniswap/v3-sdk'
import { useMemo } from 'react'
import { useLogs } from '../../state/logs/hooks'
import { useSingleContractMultipleData } from '../../state/multicall/hooks'
import { useAllTokens } from '../Tokens'
import { useV3Staker } from '../useContract'
import { PoolState, usePoolsByAddresses } from '../usePools'
import { incentiveKeyToIncentiveId } from './incentiveKeyToIncentiveId'

export interface Incentive {
  id: string
  pool: Pool
  poolAddress: string
  startTime: number
  endTime: number
  initialRewardAmount: CurrencyAmount<Token>
  rewardAmountRemaining: CurrencyAmount<Token>
  rewardRatePerSecond: CurrencyAmount<Token>
  refundee: string
}

export function useAllIncentives(): {
  loading: boolean
  incentives?: Incentive[]
} {
  const staker = useV3Staker()
  const filter = useMemo(() => staker?.filters?.IncentiveCreated(), [staker])
  const { logs } = useLogs(filter)

  const parsedLogs = useMemo(() => {
    if (!staker) return undefined
    const fragment = staker.interface.events['IncentiveCreated(address,address,uint256,uint256,address,uint256)']
    return logs?.map((logs) => staker.interface.decodeEventLog(fragment, logs.data, logs.topics))
  }, [logs, staker])

  const incentiveIds = useMemo(() => {
    return parsedLogs?.map((log) => [incentiveKeyToIncentiveId(log)]) ?? []
  }, [parsedLogs])

  const incentiveStates = useSingleContractMultipleData(staker, 'incentives', incentiveIds)

  // returns all the token addresses for which there are incentives
  // const tokenAddresses = useMemo(() => {
  //   return Object.keys(
  //     parsedLogs?.reduce<{ [tokenAddress: string]: true }>((memo, value) => {
  //       memo[value.rewardToken] = true
  //       return memo
  //     }, {}) ?? {}
  //   )
  // }, [parsedLogs])

  const poolAddresses = useMemo(() => {
    return Object.keys(
      parsedLogs?.reduce<{ [poolAddress: string]: true }>((memo, value) => {
        if (value.pool) memo[value.pool] = true
        return memo
      }, {}) ?? {}
    )
  }, [parsedLogs])

  const pools = usePoolsByAddresses(poolAddresses)

  const poolMap = useMemo(() => {
    return poolAddresses.reduce<{ [poolAddress: string]: [PoolState, Pool | null] }>((memo, address, ix) => {
      memo[address] = pools[ix]
      return memo
    }, {})
  }, [poolAddresses, pools])

  // todo: get the tokens not in the active token lists
  const allTokens = useAllTokens()

  return useMemo(() => {
    if (!parsedLogs || incentiveStates.some((s) => s.loading)) return { loading: true }

    return {
      loading: false,
      incentives: parsedLogs
        .map((result, ix): Incentive | null => {
          const token = allTokens[result.rewardToken]
          const state = incentiveStates[ix]?.result
          // todo: currently we filter out any incentives for tokens not on the active token lists
          if (!token || !state) return null
          const [, pool] = poolMap[result.pool]
          // todo: currently we filter out any incentives for pools not containing tokens on the active lists
          if (!pool) return null

          const initialRewardAmount = CurrencyAmount.fromRawAmount(token, result.reward.toString())
          const rewardAmountRemaining = CurrencyAmount.fromRawAmount(token, state.totalRewardUnclaimed.toString())

          const [startTime, endTime] = [result.startTime.toNumber(), result.endTime.toNumber()]

          const rewardRatePerSecond = initialRewardAmount.divide(endTime - startTime)

          const refundee = result.refundee

          const id = incentiveKeyToIncentiveId({
            rewardToken: result.rewardToken,
            pool: result.pool,
            startTime,
            endTime,
            refundee,
          })

          return {
            id,
            pool,
            poolAddress: result.pool,
            startTime,
            endTime,
            initialRewardAmount,
            rewardAmountRemaining,
            rewardRatePerSecond,
            refundee,
          }
        })
        .filter((x): x is Incentive => x !== null),
    }
  }, [allTokens, incentiveStates, parsedLogs, poolMap])
}

/**
 * Used for getting sorted list of all incentives broken down by pool
 */
export function useAllIncentivesByPool(): {
  loading: boolean
  incentives?: {
    [poolAddress: string]: Incentive[]
  }
} {
  const { loading, incentives } = useAllIncentives()

  return useMemo(() => {
    if (loading) {
      return {
        loading: true,
        incentives: undefined,
      }
    }
    if (!incentives) {
      return {
        loading: false,
        incentives: undefined,
      }
    }
    return {
      loading: false,
      incentives: incentives.reduce(
        (
          accum: {
            [poolAddress: string]: Incentive[]
          },
          incentive
        ) => {
          accum[incentive.poolAddress] = [...(accum[incentive.poolAddress] ?? []), incentive]
          return accum
        },
        {}
      ),
    }
  }, [incentives, loading])
}

export function useIncentivesForPool(poolAddress?: string): {
  loading: boolean
  incentives?: Incentive[]
} {
  const { loading, incentives } = useAllIncentivesByPool()

  if (!poolAddress) {
    return {
      loading: false,
      incentives: undefined,
    }
  }

  if (loading) {
    return {
      loading: true,
      incentives: undefined,
    }
  }

  if (!incentives) {
    return {
      loading: false,
      incentives: undefined,
    }
  }

  return {
    loading: false,
    incentives: incentives[poolAddress] ?? [],
  }
}
