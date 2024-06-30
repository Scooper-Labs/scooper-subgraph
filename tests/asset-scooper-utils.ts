import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { TokenSwapped } from "../generated/AssetScooper/AssetScooper"

export function createTokenSwappedEvent(
  user: Address,
  tokenIn: Address,
  amountIn: BigInt,
  amountOut: BigInt
): TokenSwapped {
  let tokenSwappedEvent = changetype<TokenSwapped>(newMockEvent())

  tokenSwappedEvent.parameters = new Array()

  tokenSwappedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )
  tokenSwappedEvent.parameters.push(
    new ethereum.EventParam("tokenIn", ethereum.Value.fromAddress(tokenIn))
  )
  tokenSwappedEvent.parameters.push(
    new ethereum.EventParam(
      "amountIn",
      ethereum.Value.fromUnsignedBigInt(amountIn)
    )
  )
  tokenSwappedEvent.parameters.push(
    new ethereum.EventParam(
      "amountOut",
      ethereum.Value.fromUnsignedBigInt(amountOut)
    )
  )

  return tokenSwappedEvent
}
