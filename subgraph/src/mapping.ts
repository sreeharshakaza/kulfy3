import { BigInt } from "@graphprotocol/graph-ts"
import {
  KulfyV3,
  Approval,
  ApprovalForAll,
  KulfyCreated,
  KulfyTipped,
  OwnershipTransferred,
  Transfer
} from "../generated/KulfyV3/KulfyV3"
import { Kulfy } from "../generated/schema"

export function handleApproval(event: Approval): void {}

export function handleApprovalForAll(event: ApprovalForAll): void {}

export function handleKulfyCreated(event: KulfyCreated): void {
  let kulfy = new Kulfy(event.params.id.toHex())
  kulfy.idk = event.params.kid
  kulfy.uri = event.params.hash
  kulfy.tipAmount = event.params.tipAmount
  kulfy.author = event.params.author
  kulfy.save()
}

export function handleKulfyTipped(event: KulfyTipped): void {
  let id = event.params.id.toHex()
  let kulfy = Kulfy.load(id)
  if (kulfy == null) {
    kulfy = new Kulfy(id)
  }
  kulfy.tipAmount = event.params.tipAmount
  kulfy.save()
}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}
