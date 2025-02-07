import * as anchor from '@project-serum/anchor'

const RPC = process.env.NEXT_PUBLIC_RPC_FRONT_END!
const connection = new anchor.web3.Connection(RPC, 'confirmed')

export const getWalletTokens = async (
	publicKey: string
) => {
	try {

		let resultAll: any = []
		let i = 1
		let loopFlag = true

		while (loopFlag) {

			const response = await fetch(RPC, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					jsonrpc: '2.0',
					id: 'my-id',
					method: 'getAssetsByOwner',
					params: {
						ownerAddress: publicKey,
						page: i, // Starts at 1
						limit: 1000,
						displayOptions: {
							showUnverifiedCollections: false,
							showFungible: true,
							showNativeBalance: true,
							showInscription: false,
							showZeroBalance: false
						}
					}
				})
			})

			const { result } = await response.json()

			if (result) {
				if (result.items) {
					if (result.items.length < 1000) {
						loopFlag = false
					}
					resultAll = resultAll.concat(result.items)
				} else {
					loopFlag = false
				}
			} else {
				loopFlag = false
			}


			i = i + 1
		}

		let realTokens = resultAll.filter((token: any) => token.interface == 'FungibleToken')

		return (realTokens)
	} catch (e) {
		return ({ 'error': e })
	}
}
