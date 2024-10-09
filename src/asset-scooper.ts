import { TokenSwapped as TokenSwappedEvent } from "../generated/AssetScooper/AssetScooper"
import { TokenSwapped } from "../generated/schema"

export function handleTokenSwapped(event: TokenSwappedEvent): void {
  let entity = new TokenSwapped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )

  entity.user = event.params.user
  entity.tokenIn = event.params.tokenA
  entity.amountIn = event.params.amountIn
  entity.amountOut = event.params.amountOut

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
