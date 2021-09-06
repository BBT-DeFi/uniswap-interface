import { FACTORY_ADDRESS as V2_FACTORY_ADDRESS } from '@uniswap/v2-sdk'
import { FACTORY_ADDRESS as V3_FACTORY_ADDRESS } from '@uniswap/v3-sdk'
import { constructSameAddressMap } from '../utils/constructSameAddressMap'
import { SupportedChainId } from './chains'

type AddressMap = { [chainId: number]: string }

export const UNI_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984'),
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x00Cf49eae942595f946FeA98934f25b94c18f6db',
}
export const MULTICALL_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1F98415757620B543A52E61c46B32eB19261F984', [SupportedChainId.OPTIMISTIC_KOVAN]),
  [SupportedChainId.OPTIMISM]: '0x90f872b3d8f33f305e0250db6A2761B354f7710A',
  [SupportedChainId.ARBITRUM_ONE]: '0xadF885960B47eA2CD9B55E6DAc6B42b7Cb2806dB',
  [SupportedChainId.ARBITRUM_RINKEBY]: '0xa501c031958F579dB7676fF1CE78AD305794d579',
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x9fa2B84d02DEBe049B8319FC00D90DA2B447A163',
}
export const V2_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(V2_FACTORY_ADDRESS),
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x93d524df0eB99765be60fC07c2db1573E1a7B5c8',
}

export const V2_ROUTER_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D'),
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x069e68482A20d712d02561DAfF0C824892F5e518',
}

/**
 * The older V0 governance account
 */
export const GOVERNANCE_ALPHA_V0_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0x5e4be8Bc9637f0EAA1A755019e06A68ce081D58F'),
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x9BdD2EA31174A4710C310C0DdD3FD55aE077000b',
}
/**
 * The latest governor alpha that is currently admin of timelock
 */
export const GOVERNANCE_ALPHA_V1_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0xC4e172459f1E7939D522503B81AFAaC1014CE6F6',
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x57054419a0d667C74c3404F52119344ec018021A',
}

export const TIMELOCK_ADDRESS: AddressMap = {
  ...constructSameAddressMap('0x1a9C8182C09F50C8318d769245beA52c32BE35BC'),
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0xf711a75A9DA057d25518Ecf1Ee02a82cF5777a11',
}

export const MERKLE_DISTRIBUTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0x090D4613473dEE047c3f2706764f49E0821D256e',
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x57054419a0d667C74c3404F52119344ec018021A',
}
export const ARGENT_WALLET_DETECTOR_ADDRESS: AddressMap = {
  [SupportedChainId.MAINNET]: '0xeca4B0bDBf7c55E9b7925919d03CbF8Dc82537E8',
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x57054419a0d667C74c3404F52119344ec018021A',
}
export const V3_CORE_FACTORY_ADDRESSES: AddressMap = {
  ...constructSameAddressMap(V3_FACTORY_ADDRESS, [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
  ]),
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x0560336F7C95c497c7f27b1205aE86d3599eD6Fa',
}

export const QUOTER_ADDRESSES: AddressMap = constructSameAddressMap('0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])

export const NONFUNGIBLE_POSITION_MANAGER_ADDRESSES: AddressMap = {
  ...constructSameAddressMap('0xe295f0314113Ea84E19b33641C38274295dB0A87', [
    SupportedChainId.OPTIMISM,
    SupportedChainId.OPTIMISTIC_KOVAN,
    SupportedChainId.ARBITRUM_ONE,
    SupportedChainId.ARBITRUM_RINKEBY,
  ]),
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0xe295f0314113Ea84E19b33641C38274295dB0A87',
}
export const ENS_REGISTRAR_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.ROPSTEN]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.GOERLI]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.RINKEBY]: '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e',
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0xBDb6C3f6735089a81791aCf786BFdEAbb9Aefb4c',
}
export const SOCKS_CONTROLLER_ADDRESSES: AddressMap = {
  [SupportedChainId.MAINNET]: '0x65770b5283117639760beA3F867b69b3697a91dd',
  [SupportedChainId.BITKUB_CHAIN_TESTNET]: '0x57054419a0d667C74c3404F52119344ec018021A',
}
export const SWAP_ROUTER_ADDRESSES: AddressMap = constructSameAddressMap('0xE592427A0AEce92De3Edee1F18E0157C05861564', [
  SupportedChainId.OPTIMISM,
  SupportedChainId.OPTIMISTIC_KOVAN,
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])
export const V3_MIGRATOR_ADDRESSES: AddressMap = constructSameAddressMap('0xA5644E29708357803b5A882D272c41cC0dF92B34', [
  SupportedChainId.ARBITRUM_ONE,
  SupportedChainId.ARBITRUM_RINKEBY,
])
