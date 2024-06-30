import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { TokenSwapped } from "../generated/schema"
import { TokenSwapped as TokenSwappedEvent } from "../generated/AssetScooper/AssetScooper"
import { handleTokenSwapped } from "../src/asset-scooper"
import { createTokenSwappedEvent } from "./asset-scooper-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let user = Address.fromString("0x0000000000000000000000000000000000000001")
    let tokenIn = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amountIn = BigInt.fromI32(234)
    let amountOut = BigInt.fromI32(234)
    let newTokenSwappedEvent = createTokenSwappedEvent(
      user,
      tokenIn,
      amountIn,
      amountOut
    )
    handleTokenSwapped(newTokenSwappedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("TokenSwapped created and stored", () => {
    assert.entityCount("TokenSwapped", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "TokenSwapped",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "user",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "TokenSwapped",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenIn",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "TokenSwapped",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountIn",
      "234"
    )
    assert.fieldEquals(
      "TokenSwapped",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountOut",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
