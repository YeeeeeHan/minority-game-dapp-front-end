import { useQueryClient, useMutation } from '@tanstack/react-query'
import { ethers } from 'ethers'
import { messageConstants } from '../../constants/constants'
import { toast } from 'react-toastify'

const useEmergencyRepay = async (mmGameContract) => {
  try {
    const transaction = await mmGameContract.emergencyRepay()
    const transactionReceipt = await transaction.wait()
    if (transactionReceipt.status !== 1) {
      throw new Error('Transaction failed')
    }
  } catch (error) {
    throw error
  }
}

export default function UseContractEmergencyRepay() {
  return useMutation(useEmergencyRepay, {
    onSuccess: () => {
      toast.success(`Emergency repay success`)
    },
    onError: (error) => {
      toast.error(`Smart contract error, ${error.reason || error}`)
    },
  })
}
