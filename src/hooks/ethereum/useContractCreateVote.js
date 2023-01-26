import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { messageConstants } from '../../constants/constants'

const useCreateContractVote = async ({ voteHash, mmGameContract }) => {
  const ticketPriceGwei = process.env.NEXT_PUBLIC_TICKET_PRICE_GWEI
  const ticketPriceEth = ethers.utils.formatUnits(
    parseInt(ticketPriceGwei, 10),
    'gwei'
  )
  const transaction = await mmGameContract.vote(voteHash, {
    value: ethers.utils.parseEther(ticketPriceEth),
  })
  const transactionReceipt = await transaction.wait()
  if (transactionReceipt.status !== 1) {
    throw new Error('Transaction failed')
  }
}

export default function UseContractCreateVote(setMessage) {
  return useMutation(useCreateContractVote, {
    onSuccess: () => {
      setMessage(messageConstants.VOTE_REGISTERED)
    },
    onError: (error) => {
      if (error) {
        setMessage(`Smart contract error: ${error.reason}`)
      }
    },
  })
}
